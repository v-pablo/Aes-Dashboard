import React, { useState } from 'react';
import { Users, Trophy, X, Check, ArrowLeft, Filter } from 'lucide-react';

export default function ActionModal({ activeChannel, stats, onClose, onLog, isAes }) {
  const [step, setStep] = useState('initial'); 
  const [amount, setAmount] = useState('');

  if (!activeChannel) return null;

  const handleConvertedClick = () => {
    setStep('input');
  };

  const handleConfirmConversion = () => {
    const cleanAmount = parseFloat(amount.replace(/,/g, '')) || 0;
    onLog('Converted', cleanAmount);
    setStep('initial');
    setAmount('');
  };

  const handleClose = () => {
    setStep('initial');
    setAmount('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={handleClose}></div>
      
      <div className="bg-white dark:bg-slate-800 rounded-[32px] p-6 max-w-md w-full shadow-2xl z-10 animate-in fade-in zoom-in duration-200 border border-gray-100 dark:border-slate-700">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            {step === 'input' && (
              <button onClick={() => setStep('initial')} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full mr-1">
                <ArrowLeft size={18} className="text-gray-500" />
              </button>
            )}
            <div className={`p-2 rounded-xl bg-gradient-to-br ${activeChannel.color} shadow-lg`}>
              <activeChannel.icon size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{activeChannel.name}</h2>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full text-gray-500 dark:text-slate-400">
            <X size={20} />
          </button>
        </div>

        {/* STEP 1: INITIAL SELECTION */}
        {step === 'initial' && (
          <>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-2xl text-center border border-slate-200 dark:border-slate-600">
                <p className="text-3xl font-bold text-slate-600 dark:text-slate-300 mb-1">{stats.assigned}</p>
                <p className="text-xs text-slate-400 dark:text-slate-400 font-bold uppercase tracking-wider">Assigned</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl text-center border border-green-100 dark:border-green-800">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">{stats.converted}</p>
                <p className="text-xs text-green-400 dark:text-green-300 font-bold uppercase tracking-wider">Converted</p>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => onLog('Assigned', 0)}
                className="w-full px-4 py-4 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-sm active:scale-95 transition-all"
              >
                <Users size={20} /> Log as Assigned
              </button>

              {/* AES ONLY: QUALIFIED BUTTON */}
              {isAes && (
                <button 
                  onClick={() => onLog('Qualified', 0)}
                  className="w-full px-4 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
                >
                  <Filter size={20} /> Log as Qualified
                </button>
              )}
              
              <button 
                onClick={handleConvertedClick}
                className="w-full px-4 py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-green-500/20 active:scale-95 transition-all"
              >
                <Trophy size={20} /> Log as Converted
              </button>
            </div>
          </>
        )}

        {/* STEP 2: REVENUE INPUT */}
        {step === 'input' && (
          <div className="animate-in slide-in-from-right-4 duration-200">
            <label className="block text-sm font-bold text-gray-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
              Deal Value
            </label>
            <div className="relative mb-6">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">₦</span>
              <input 
                autoFocus
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl py-4 pl-10 pr-4 text-2xl font-bold text-gray-900 dark:text-white outline-none focus:border-green-500 transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && handleConfirmConversion()}
              />
            </div>
            <button 
              onClick={handleConfirmConversion}
              className="w-full px-4 py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-green-500/20 active:scale-95 transition-all"
            >
              <Check size={20} /> Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
}