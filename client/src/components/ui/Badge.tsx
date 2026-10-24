import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'maroon' | 'gold' | 'green' | 'gray' | 'blue';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gray',
  className = '',
}) => {
  const variants = {
    maroon: 'bg-[#FDF2F4] text-[#8B1538] border-[#8B1538]/30 font-bold',
    gold: 'bg-[#FFF9C7] text-[#6E4E0A] border-[#F5C400]/60 font-bold',
    green: 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold',
    gray: 'bg-stone-100 text-[#71656A] border-[#E9DFD7]',
    blue: 'bg-sky-50 text-sky-800 border-sky-200',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
