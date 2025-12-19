import React from 'react';

export default function ChannelGrid({ channels, activeChannel, onSelect, getChannelTotal }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pb-8">
      {channels.map(channel => (
        <button
          key={channel.id}
          onClick={() => onSelect(channel)}
          className={`
            relative group overflow-hidden rounded-3xl p-6 text-white text-center 
            transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:shadow-2xl
            bg-gradient-to-br ${channel.color} ${channel.shadow}
            ${activeChannel?.id === channel.id ? 'ring-4 ring-offset-2 dark:ring-offset-slate-900 ring-white scale-105' : 'shadow-lg'}
          `}
        >
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl w-12 h-12 mx-auto mb-3 flex items-center justify-center shadow-inner">
            <channel.icon size={24} className="text-white drop-shadow-md" />
          </div>
          <div className="text-sm font-bold tracking-wide">{channel.name}</div>
          <div className="text-xs opacity-80 mt-1 font-medium bg-black/10 rounded-full px-2 py-0.5 inline-block">
            {getChannelTotal(channel.name)} leads
          </div>
        </button>
      ))}
    </div>
  );
}