import React, { useState, useMemo, useEffect } from 'react';
import { Clipboard, Moon, Sun, Loader2 } from 'lucide-react';
import { supabase } from './supabaseClient'; // Make sure you copy this file too!
import { TIERS, AGENTS } from './data/constants';

// Components
import AgentSelector from './components/AgentSelector';
import DateRangePill from './components/DateRangePill';
import AesStats from './components/AesStats'; 
import ChannelGrid from './components/ChannelGrid';
import RecentActivity from './components/RecentActivity';
import ActionModal from './components/ActionModal';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [leads, setLeads] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(AGENTS[0]);
  
  const getTodayString = () => new Date().toISOString().split('T')[0];
  const [dateRange, setDateRange] = useState({ start: getTodayString(), end: getTodayString() });
  const [activeTier, setActiveTier] = useState(null); 
  const [toast, setToast] = useState(null);

  // --- THEME ---
  useEffect(() => {
    // Check local storage for theme
    if (localStorage.getItem('theme') === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    fetchLeads();
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    const newMode = !darkMode;
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  // --- DATABASE ---
  const fetchLeads = async () => {
    // FETCH ONLY AES LEADS
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('team', 'AES') // <--- CRITICAL: Only fetch AES data
      .order('created_at', { ascending: true });
    
    if (!error) setLeads(data);
  };

  // --- FILTERING ---
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesAgent = lead.agent === selectedAgent;
      const matchesDate = lead.timestamp >= dateRange.start && lead.timestamp <= dateRange.end;
      return matchesAgent && matchesDate;
    });
  }, [leads, selectedAgent, dateRange]);

  const stats = {
    assigned: filteredLeads.filter(l => l.status === 'Assigned').length,
    qualified: filteredLeads.filter(l => l.status === 'Qualified').length,
    converted: filteredLeads.filter(l => l.status === 'Converted').length,
  };

  // --- HANDLER ---
  const handleLogLead = async (status, amount = 0) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const tempId = Date.now();
    
    const newEntry = {
      agent: selectedAgent,
      status: status,
      amount: amount,
      timestamp: getTodayString(),
      time_logged: timeNow,
      team: 'AES', // <--- HARDCODED TO AES
      tier: activeTier.name, // Save the Tier name
      channel: 'AES', // Fallback for the rental column if needed
    };

    setLeads(prev => [...prev, { ...newEntry, id: tempId }]);
    triggerToast(`${status} logged!`);

    const { data, error } = await supabase.from('leads').insert([newEntry]).select();
    
    if (error) {
      console.error(error);
      triggerToast('Failed to save!');
      setLeads(prev => prev.filter(l => l.id !== tempId));
    } else {
      setLeads(prev => prev.map(l => l.id === tempId ? data[0] : l));
    }
  };

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1500);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'dark bg-slate-900 text-white' : 'bg-gray-50 text-slate-900'}`}>
      
      {/* HEADER (SLATE BLUE THEME FOR AES) */}
      <div className="bg-slate-800 p-6 shadow-sm border-b border-white/10 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">AES Dashboard</h1>
              <p className="text-xs text-white/80 font-medium uppercase tracking-widest">Enterprise Sales</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto items-start sm:items-center">
            <DateRangePill 
              start={dateRange.start} 
              end={dateRange.end}
              onChangeStart={(val) => setDateRange({...dateRange, start: val})}
              onChangeEnd={(val) => setDateRange({...dateRange, end: val})}
            />
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                <AgentSelector agents={AGENTS} selected={selectedAgent} onSelect={setSelectedAgent} />
                <button onClick={toggleTheme} className="p-2 rounded-xl bg-white/10 text-white">
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* DASHBOARD CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <AesStats stats={stats} />
        
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Select Tier</h3>
        
        <ChannelGrid 
          channels={TIERS} 
          activeChannel={activeTier}
          onSelect={setActiveTier}
          getChannelTotal={(name) => filteredLeads.filter(l => l.tier === name).length}
        />

        <RecentActivity 
          leads={filteredLeads.slice().reverse().slice(0, 10)} 
          onDelete={() => {/* Add delete logic */}}
        />
      </div>

      {/* MODAL */}
      <ActionModal 
        activeChannel={activeTier}
        stats={{ assigned: 0, converted: 0 }} 
        onClose={() => setActiveTier(null)}
        onLog={handleLogLead}
        isAes={true} // <--- Forces the "Qualified" button to appear
      />

      {toast && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-xl z-50">
          {toast}
        </div>
      )}
    </div>
  );
}