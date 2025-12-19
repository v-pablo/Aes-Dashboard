import React from 'react';

export default function DateRangePill({ start, end, onChangeStart, onChangeEnd }) {
  return (
    <div className="flex items-center bg-white/10 rounded-full p-1 border border-white/10 focus-within:bg-white/20 transition-all duration-300">
      <div className="relative group px-3 py-1.5 flex items-center gap-2 border-r border-white/10">
        <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider">From</span>
        <input 
          type="date" 
          value={start}
          onChange={(e) => onChangeStart(e.target.value)}
          className="bg-transparent text-xs font-bold text-white outline-none w-24 cursor-pointer placeholder-white"
          style={{ colorScheme: 'dark' }} 
        />
      </div>
      <div className="relative group px-3 py-1.5 flex items-center gap-2">
        <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider">To</span>
        <input 
          type="date" 
          value={end}
          onChange={(e) => onChangeEnd(e.target.value)}
          className="bg-transparent text-xs font-bold text-white outline-none w-24 cursor-pointer"
          style={{ colorScheme: 'dark' }}
        />
      </div>
    </div>
  );
}