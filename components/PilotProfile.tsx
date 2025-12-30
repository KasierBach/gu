import React from 'react';
import { User, Shield, Target, Award, Zap, Activity, Clock, Crosshair } from 'lucide-react';
import { Theme } from '../types';

interface PilotProfileProps {
    theme?: Theme;
}

import { useAuth } from '../context/AuthContext';

export const PilotProfile: React.FC<PilotProfileProps> = ({ theme = 'EFSF' }) => {
    const { user } = useAuth();
    const isZeon = theme === 'ZEON';
    // ... (keep existing color vars)
    const accentColor = isZeon ? 'text-yellow-500' : 'text-gundam-blue';
    const borderColor = isZeon ? 'border-red-900' : 'border-slate-700';
    const bgCard = isZeon ? 'bg-red-950/20' : 'bg-slate-800/30';

    const pilotStats = [
        { label: 'Combat Readiness', value: '98%', icon: Shield },
        { label: 'Sorties Completed', value: '142', icon: Activity },
        { label: 'Confirmed Kills', value: '87', icon: Target },
        { label: 'Sync Ratio', value: '115%', icon: Zap },
    ];

    const achievements = [
        { id: 1, name: 'Ace Pilot', date: '2025.12.10', icon: Award },
        { id: 2, name: 'Odessa Campaign Hero', date: '2025.11.22', icon: Shield },
        { id: 3, name: 'Newtype Potential', date: '2025.12.15', icon: Zap },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 font-mono">
            {/* Header Section */}
            <div className={`relative p-8 border-2 ${borderColor} mb-12 overflow-hidden group`}>
                <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none" />
                <div className={`absolute top-0 left-0 w-full h-[1px] ${isZeon ? 'bg-yellow-500' : 'bg-gundam-blue'} opacity-50`} />

                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="relative">
                        <div className={`w-32 h-32 rounded-full border-4 ${isZeon ? 'border-red-600' : 'border-gundam-blue'} p-1 overflow-hidden`}>
                            <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center">
                                <User className={`w-16 h-16 ${accentColor}`} />
                            </div>
                        </div>
                        <div className={`absolute -bottom-2 -right-2 px-2 py-1 text-[10px] font-bold uppercase rounded ${isZeon ? 'bg-red-900 text-yellow-500' : 'bg-blue-900 text-cyan-400'}`}>
                            {user?.rank || 'RECRUIT'}
                        </div>
                    </div>

                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                            <h2 className="text-4xl font-display font-black text-white tracking-tighter">
                                PILOT_ID: {user?.name?.toUpperCase().replace(/\s+/g, '_') || 'UNKNOWN_PILOT'}
                            </h2>
                            <div className={`px-2 py-0.5 text-[10px] font-bold border ${isZeon ? 'border-yellow-500 text-yellow-500' : 'border-gundam-blue text-gundam-blue'}`}>
                                ACTIVE
                            </div>
                        </div>
                        <p className="text-slate-500 text-sm mb-4">
                            ID: {user?.id} // FACTION: {user?.faction} // JOINED: {user?.joinedDate}
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <Clock className="w-3 h-3" /> FLIGHT_TIME: 1,240H
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <Crosshair className="w-3 h-3" /> ACCURACY: 92.4%
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-2 right-4 text-[10px] text-slate-600">SECURE_CHANNEL_VERIFIED</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Stats Grid */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pilotStats.map((stat, i) => (
                        <div key={i} className={`${bgCard} border ${borderColor} p-6 relative overflow-hidden group hover:border-white transition-colors`}>
                            <div className="flex justify-between items-start mb-4">
                                <stat.icon className={`w-6 h-6 ${accentColor}`} />
                                <div className="text-[10px] text-slate-500 italic">SYSTEM.CORE.STAT_{i + 1}</div>
                            </div>
                            <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                            <div className="text-xs uppercase tracking-widest text-slate-500">{stat.label}</div>

                            {/* Mini Progress Bar */}
                            <div className="w-full bg-slate-900 h-1 mt-4">
                                <div className={`h-full ${isZeon ? 'bg-red-700' : 'bg-blue-600'}`} style={{ width: stat.value.includes('%') ? stat.value : '70%' }} />
                            </div>
                        </div>
                    ))}

                    {/* Combat Log Mockup */}
                    <div className={`${bgCard} border ${borderColor} p-6 col-span-1 sm:col-span-2`}>
                        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 mb-6 flex items-center gap-2">
                            <Activity className="w-3 h-3" /> COMBAT_LOG_DECRYPTED
                        </h3>
                        <div className="space-y-3 font-mono text-[10px]">
                            {[
                                { t: '02:14:45', msg: 'NEUTRALIZED_GEARA_ZULU_X3', loc: 'SECTOR_A1' },
                                { t: '01:55:12', msg: 'DOCKING_COMPLETE_NAHEL_ARGAMA', loc: 'CARRIER' },
                                { t: '01:10:05', msg: 'RE-ENTRY_PROTOCOL_INITIATED', loc: 'EARTH_ATMOS' },
                            ].map((log, i) => (
                                <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2">
                                    <span className={accentColor}>[{log.t}]</span>
                                    <span className="text-slate-300">{log.msg}</span>
                                    <span className="text-slate-600">{log.loc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Achievements / Medals */}
                <div className={`${bgCard} border ${borderColor} p-6`}>
                    <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-white mb-8 flex items-center gap-2">
                        <Award className={`w-4 h-4 ${accentColor}`} /> HONORS_LIST
                    </h3>
                    <div className="space-y-6">
                        {achievements.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 group">
                                <div className={`w-12 h-12 flex items-center justify-center border ${isZeon ? 'border-yellow-600/30 group-hover:bg-red-900/30' : 'border-gundam-blue/30 group-hover:bg-blue-900/30'} transition-all`}>
                                    <item.icon className={`w-6 h-6 ${accentColor}`} />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-white uppercase">{item.name}</div>
                                    <div className="text-[10px] text-slate-500">{item.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-4 border border-dashed border-slate-700">
                        <div className="text-[10px] text-slate-500 text-center uppercase tracking-widest">
                            COLLECT_7_MORE_MEDALS_TO<br />REACH_COMMANDER_RANK
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
