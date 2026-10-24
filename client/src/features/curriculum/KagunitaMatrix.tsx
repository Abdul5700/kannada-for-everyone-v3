import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { AudioButton } from '../../components/ui/AudioButton';
import { getKagunitaChart } from '../../utils/api';
import { Table, Search, Volume2, Sparkles, Filter, Grid, CheckCircle2 } from 'lucide-react';

interface KagunitaCell {
  vowel: string;
  matra: string;
  akshara: string;
  transliteration: string;
  audioText: string;
}

interface KagunitaRow {
  consonant: string;
  transliteration: string;
  group: string;
  series: KagunitaCell[];
}

export const KagunitaMatrix: React.FC = () => {
  const [rows, setRows] = useState<KagunitaRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConsonant, setSelectedConsonant] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCell, setActiveCell] = useState<KagunitaCell | null>(null);

  useEffect(() => {
    setLoading(true);
    getKagunitaChart()
      .then((data) => {
        if (data?.rows) {
          setRows(data.rows);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const consonantsList = rows.map((r) => r.consonant);

  const filteredRows = rows.filter((r) => {
    if (selectedConsonant !== 'all' && r.consonant !== selectedConsonant) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesConsonant = r.consonant.includes(q) || r.transliteration.toLowerCase().includes(q);
      const matchesCell = r.series.some(
        (c) => c.akshara.includes(q) || c.transliteration.toLowerCase().includes(q)
      );
      return matchesConsonant || matchesCell;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-maroon-800 to-maroon-900 text-white p-6 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="gold">Section 2</Badge>
              <span className="text-xs text-gold-300 font-semibold tracking-wide uppercase">
                Complete Syllabary (ಕಾಗುಣಿತ ಕೋಷ್ಟಕ)
              </span>
            </div>
            <h3 className="text-2xl font-bold font-kannada">
              ಕಾಗುಣಿತ — ಕದಿಂದ ಳವರೆಗೆ ಸಂಪೂರ್ಣ ಚಾರ್ಟ್
            </h3>
            <p className="text-xs text-gray-200 mt-1 max-w-2xl">
              All 34 Kannada consonants scientifically multiplied with all 15 vowel marks (ಮಾತ್ರೆಗಳು) = 510 verified syllables. Click any letter to listen to clear native pronunciation.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-center px-4 py-2 bg-white/10 rounded-xl">
              <p className="text-xs text-gold-300">Total Rows</p>
              <p className="text-xl font-bold">{rows.length} Consonants</p>
            </div>
            <div className="text-center px-4 py-2 bg-white/10 rounded-xl">
              <p className="text-xs text-gold-300">Total Syllables</p>
              <p className="text-xl font-bold">{rows.length * 15} Forms</p>
            </div>
          </div>
        </div>
      </div>

      {/* Control Toolbar */}
      <Card className="p-4 border-gold-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={16} className="text-maroon-700 shrink-0" />
            <select
              value={selectedConsonant}
              onChange={(e) => setSelectedConsonant(e.target.value)}
              className="text-xs font-semibold p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-maroon-600 font-kannada"
            >
              <option value="all">ಎಲ್ಲಾ ವ್ಯಂಜನಗಳು (All 34 Rows)</option>
              {consonantsList.map((c) => (
                <option key={c} value={c}>
                  {c}-ಸರಣಿ ({c} series)
                </option>
              ))}
            </select>
          </div>

          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search syllable e.g. ಕು, kaa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-maroon-600 bg-white"
            />
          </div>
        </div>

        {/* Quick Letter Filter Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
          <button
            onClick={() => setSelectedConsonant('all')}
            className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-all ${
              selectedConsonant === 'all'
                ? 'bg-maroon-700 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {consonantsList.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedConsonant(c)}
              className={`w-7 h-7 flex items-center justify-center text-xs font-kannada font-bold rounded-lg transition-all ${
                selectedConsonant === c
                  ? 'bg-maroon-700 text-white shadow-xs'
                  : 'bg-white border border-gray-200 text-gray-800 hover:bg-gold-50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </Card>

      {/* Kagunita Table View */}
      {loading ? (
        <Card className="p-12 text-center text-gray-500">
          <p className="text-sm font-semibold">Loading complete 510-syllable Kagunita matrix...</p>
        </Card>
      ) : (
        <Card className="overflow-hidden border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-maroon-50 text-maroon-900 border-b border-maroon-100 text-xs font-bold font-kannada">
                  <th className="p-3 text-left sticky left-0 bg-maroon-100 z-10 w-28">ವ್ಯಂಜನ</th>
                  <th className="p-2">ಅ (a)</th>
                  <th className="p-2">ಆ (aa)</th>
                  <th className="p-2">ಇ (i)</th>
                  <th className="p-2">ಈ (ee)</th>
                  <th className="p-2">ಉ (u)</th>
                  <th className="p-2">ಊ (oo)</th>
                  <th className="p-2">ಋ (ru)</th>
                  <th className="p-2">ಎ (e)</th>
                  <th className="p-2">ಏ (ee)</th>
                  <th className="p-2">ಐ (ai)</th>
                  <th className="p-2">ಒ (o)</th>
                  <th className="p-2">ಓ (oo)</th>
                  <th className="p-2">ಔ (au)</th>
                  <th className="p-2">ಅಂ (am)</th>
                  <th className="p-2">ಅಃ (aha)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredRows.map((row, rIdx) => (
                  <tr
                    key={row.consonant}
                    className={`hover:bg-gold-50/40 transition-colors ${
                      rIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'
                    }`}
                  >
                    <td className="p-2.5 text-left font-bold sticky left-0 bg-white/95 border-r border-gray-200 shadow-xs z-10">
                      <div className="flex items-center justify-between gap-1">
                        <div>
                          <span className="font-kannada text-lg text-maroon-800 mr-1.5">
                            {row.consonant}
                          </span>
                          <span className="text-2xs text-gray-500 font-sans">
                            ({row.transliteration})
                          </span>
                        </div>
                        <AudioButton text={row.consonant} size={14} />
                      </div>
                    </td>

                    {row.series.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        onClick={() => setActiveCell(cell)}
                        className="p-1.5 min-w-[56px] hover:bg-gold-100/60 cursor-pointer transition-colors group relative"
                      >
                        <div className="flex flex-col items-center">
                          <span className="font-kannada text-base font-bold text-gray-900 group-hover:text-maroon-700">
                            {cell.akshara}
                          </span>
                          <span className="text-3xs text-gray-600 font-sans">
                            {cell.transliteration}
                          </span>
                          <div className="opacity-0 group-hover:opacity-100 absolute -top-1 right-0 transition-opacity">
                            <AudioButton text={cell.akshara} size={12} />
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Active Cell Inspector */}
      {activeCell && (
        <Card className="p-4 border-2 border-gold-300 bg-gold-50/30 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-maroon-700 text-gold-300 font-kannada text-3xl font-bold flex items-center justify-center shadow-sm">
              {activeCell.akshara}
            </div>
            <div>
              <p className="text-xs text-gray-500">Selected Syllable (ಗುಣಿತಾಕ್ಷರ)</p>
              <h4 className="text-lg font-bold text-gray-900 font-kannada">
                {activeCell.akshara} — {activeCell.transliteration}
              </h4>
              <p className="text-xs text-gray-600">
                Vowel combination: <strong>{activeCell.vowel}</strong> ({activeCell.matra ? `ಮಾತ್ರೆ: ${activeCell.matra}` : 'ಮೂಲ ಅಕ್ಷರ'})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <AudioButton text={activeCell.akshara} label="Pronounce" size={18} />
            <Button variant="secondary" size="sm" onClick={() => setActiveCell(null)}>
              Close
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
