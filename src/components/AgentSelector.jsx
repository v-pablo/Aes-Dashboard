import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Plus, X } from 'lucide-react';

export default function AgentSelector({ agents, selected, onSelect, onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsAdding(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const getInitials = (name) => name.substring(0, 2).toUpperCase();

  return (
    <div className="relative" ref={wrapperRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-full px-4 py-2 shadow-sm hover:bg-white/20 transition-all duration-200 group"
      >
        <div className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center text-xs font-bold">
          {getInitials(selected)}
        </div>
        <span className="text-sm font-semibold text-white">{selected}</span>
        <ChevronDown size={16} className={`text-white/60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
          <div className="p-2 space-y-1">
            {agents.map(agent => (
              <button
                key={agent}
                onClick={() => {
                  onSelect(agent);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors ${
                  selected === agent 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  selected === agent ? 'bg-blue-100 dark:bg-blue-800 text-blue-700' : 'bg-gray-100 dark:bg-slate-700'
                }`}>
                  {getInitials(agent)}
                </div>
                {agent}
              </button>
            ))}
          </div>
          
          <div className="p-2 border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
            {!isAdding ? (
              <button 
                onClick={() => setIsAdding(true)}
                className="w-full flex items-center justify-center gap-2 text-xs font-medium text-gray-500 hover:text-blue-600 py-1 transition-colors"
              >
                <Plus size={14} /> Add New Agent
              </button>
            ) : (
              <div className="flex gap-2 items-center px-1">
                <input 
                  autoFocus
                  type="text"
                  placeholder="Name..."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg px-2 py-1 text-xs outline-none focus:border-blue-500 dark:text-white"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newName.trim()) {
                      onAdd(newName);
                      setNewName('');
                      setIsAdding(false);
                    }
                  }}
                />
                <button 
                  onClick={() => setIsAdding(false)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}