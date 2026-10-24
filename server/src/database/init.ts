/**
 * JSON File Store — lightweight persistent database
 * Pure Node.js, no native dependencies, survives restarts.
 * Each collection is a separate JSON file in the data/ directory.
 */
import fs from 'fs';
import path from 'path';
import { config } from '../config';

type Collection =
  | 'learners'
  | 'learner_stats'
  | 'lesson_completions'
  | 'saved_vocabulary'
  | 'quiz_sessions'
  | 'quiz_attempts'
  | 'translation_history'
  | 'activity_records'
  | 'homework_assignments'
  | 'homework_submissions';

const dataDir = path.resolve(path.dirname(config.databaseUrl));

function ensureDir() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
}

function filePath(col: Collection): string {
  return path.join(dataDir, `${col}.json`);
}

function readCol<T>(col: Collection): T[] {
  ensureDir();
  const fp = filePath(col);
  if (!fs.existsSync(fp)) return [];
  try { return JSON.parse(fs.readFileSync(fp, 'utf8')) as T[]; }
  catch { return []; }
}

function writeCol<T>(col: Collection, data: T[]): void {
  ensureDir();
  fs.writeFileSync(filePath(col), JSON.stringify(data, null, 2), 'utf8');
}

export const db = {
  findAll<T>(col: Collection): T[] { return readCol<T>(col); },

  findOne<T>(col: Collection, pred: (i: T) => boolean): T | undefined {
    return readCol<T>(col).find(pred);
  },

  findMany<T>(col: Collection, pred: (i: T) => boolean): T[] {
    return readCol<T>(col).filter(pred);
  },

  insert<T>(col: Collection, doc: T): T {
    const data = readCol<T>(col);
    data.push(doc);
    writeCol(col, data);
    return doc;
  },

  upsert<T extends { id: string }>(col: Collection, doc: T): T {
    const data = readCol<T>(col);
    const idx = data.findIndex(d => (d as { id: string }).id === doc.id);
    if (idx >= 0) data[idx] = doc; else data.push(doc);
    writeCol(col, data);
    return doc;
  },

  updateMany<T>(col: Collection, pred: (i: T) => boolean, upd: (i: T) => T): number {
    const data = readCol<T>(col);
    let n = 0;
    const updated = data.map(i => { if (pred(i)) { n++; return upd(i); } return i; });
    writeCol(col, updated);
    return n;
  },

  deleteMany<T>(col: Collection, pred: (i: T) => boolean): number {
    const data = readCol<T>(col);
    const rem = data.filter(i => !pred(i));
    writeCol(col, rem);
    return data.length - rem.length;
  },

  count<T>(col: Collection, pred?: (i: T) => boolean): number {
    const data = readCol<T>(col);
    return pred ? data.filter(pred).length : data.length;
  },
};

export function initDb(): void {
  ensureDir();
  console.log(`[DB] JSON file store initialized at ${dataDir}`);
}
