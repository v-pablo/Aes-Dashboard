import React from 'react';
import { Filter, CheckCircle, Trophy } from 'lucide-react';

export default function AesStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      
      {/* Stage 1: Assigned */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border-l-4 border-slate-300 dark:border-slate-600 relative overflow-hidden">
         <p className="text-xs text-gray-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-2">Total Assigned</p>
         <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{stats.assigned}</p>
      </div>

      {/* Stage 2: Qualified (The Middle Step) */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border-l-4 border-amber-400 relative overflow-hidden">
         <div className="flex justify-between items-start">
            <p className="text-xs text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider mb-2">Qualified Leads</p>
            <Filter size={16} className="text-amber-400" />
         </div>
         <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{stats.qualified}</p>
         <p className="text-xs text-gray-400 mt-1">
           {stats.assigned > 0 ? Math.round((stats.qualified / stats.assigned) * 100) : 0}% Qualification Rate
         </p>
      </div>

      {/* Stage 3: Converted */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border-l-4 border-green-500 relative overflow-hidden">
         <div className="flex justify-between items-start">
            <p className="text-xs text-green-600 dark:text-green-400 font-bold uppercase tracking-wider mb-2">Closed / Won</p>
            <Trophy size={16} className="text-green-500" />
         </div>
         <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{stats.converted}</p>
         <p className="text-xs text-gray-400 mt-1">
           {stats.qualified > 0 ? Math.round((stats.converted / stats.qualified) * 100) : 0}% Close Rate
         </p>
      </div>
    </div>
  );
}