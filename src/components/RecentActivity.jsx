import React from 'react';
import { History, Search, Trophy, Users, Trash2, Filter } from 'lucide-react';

export default function RecentActivity({ leads, onDelete }) {
  return (
    <div className="mt-4 pt-6 border-t border-gray-100 dark:border-slate-800">
      <div className="flex items-center gap-2 mb-6">
        <History size={16} className="text-gray-400" />
        <h3 className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-widest">Recent Activity</h3>
      </div>
      
      {leads.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-gray-200 dark:border-slate-700">
          <div className="inline-flex p-3 rounded-full bg-gray-100 dark:bg-slate-700 mb-3">
            <Search size={20} className="text-gray-400" />
          </div>
          <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">No activity found for this period.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map(lead => (
            <div key={lead.id} className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800 transition-colors animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg ${
                    lead.status === 'Converted' ? 'bg-gradient-to-br from-green-400 to-emerald-600' :
                    lead.status === 'Qualified' ? 'bg-gradient-to-br from-amber-400 to-orange-500' :
                    'bg-gradient-to-br from-slate-400 to-slate-600'
                }`}>
                  {lead.status === 'Converted' ? <Trophy size={16} /> : lead.status === 'Qualified' ? <Filter size={16} /> : <Users size={16} />}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {lead.agent} <span className="text-gray-400 font-normal">via</span> {lead.tier || lead.channel}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-slate-500 font-medium mt-0.5">
                    Logged as {lead.status} • {lead.time_logged || 'Just now'}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => onDelete(lead.id)}
                className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition"
                title="Delete Entry"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}