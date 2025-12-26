import React from 'react';
import { Send, Radio, ShieldCheck, Mail } from 'lucide-react';

export const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Transmission sent! We will respond via secure channel shortly.");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4 bg-slate-950">
      {/* Background World Map / Grid */}
      <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover opacity-5 pointer-events-none inverted" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)]" />

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-5 gap-0 shadow-2xl relative z-10 animate-fade-in-up">
        {/* Sidebar Info */}
        <div className="md:col-span-2 bg-slate-900 border-l border-t border-b border-slate-700 p-8 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gundam-blue to-transparent" />

          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gundam-blue/20 rounded-full flex items-center justify-center animate-pulse">
                <Radio className="text-gundam-blue w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-white leading-none">SUBSPACE</h2>
                <span className="text-xs font-mono text-slate-400 tracking-widest uppercase">Relay Station Alpha</span>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Establish a secure connection for inquiries regarding mobile suit requisition, custom parts sourcing, or technical support.
              <br /><br />
              <span className="text-gundam-blue font-bold">AVG RESPONSE TIME:</span> 0.45 CYCLES
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-300 bg-slate-800/50 p-3 border border-slate-700">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                <span>End-to-End Encryption: ACTIVE</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300 bg-slate-800/50 p-3 border border-slate-700">
                <Mail className="w-4 h-4 text-yellow-400" />
                <span>Priority: STANDBY</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800">
            <div className="text-[10px] font-mono text-slate-500 uppercase">
              Freq: 144.89 MHz // Secure Line
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="md:col-span-3 bg-slate-100 p-8 md:p-12 relative">
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[80px] border-t-slate-900 border-l-[80px] border-l-transparent pointer-events-none" />

          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wider mb-1">Begin Transmission</h3>
            <div className="w-12 h-1 bg-gundam-blue" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Codename</label>
                <input
                  required
                  type="text"
                  className="w-full bg-white border border-slate-300 p-3 text-slate-900 focus:border-gundam-blue focus:ring-1 focus:ring-gundam-blue outline-none transition-all"
                  placeholder="Enter alias"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Comms Frequency</label>
                <input
                  required
                  type="email"
                  className="w-full bg-white border border-slate-300 p-3 text-slate-900 focus:border-gundam-blue focus:ring-1 focus:ring-gundam-blue outline-none transition-all"
                  placeholder="pilot@domain.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Message Payload</label>
              <textarea
                required
                rows={5}
                className="w-full bg-white border border-slate-300 p-3 text-slate-900 focus:border-gundam-blue focus:ring-1 focus:ring-gundam-blue outline-none transition-all resize-none font-mono text-sm"
                placeholder="// Start secure message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gundam-blue hover:bg-blue-700 text-white font-bold py-4 uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 group"
            >
              <Send className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              Transmit Data
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};