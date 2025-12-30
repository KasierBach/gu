import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ViewState } from '../types';
import { UserPlus, Cpu, Globe, Crosshair } from 'lucide-react';

interface RegisterProps {
    onNavigate: (view: ViewState) => void;
    theme: 'EFSF' | 'ZEON';
}

export const Register: React.FC<RegisterProps> = ({ onNavigate, theme }) => {
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        faction: 'EFSF' as 'EFSF' | 'ZEON'
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Error: Passcode Verification Failed');
            return;
        }

        setLoading(true);

        try {
            await register(formData.name, formData.email, formData.password, formData.faction);
            // Success is automatic via AuthContext state change, usually redirected by parent or effect
            // But for explicit flow:
            onNavigate('PILOT');
        } catch (err: any) {
            setError(err.message || 'Registration Failed');
        } finally {
            setLoading(false);
        }
    };

    const isZeon = theme === 'ZEON';
    const accentColor = isZeon ? 'text-yellow-500' : 'text-cyan-400';
    const borderColor = isZeon ? 'border-red-600' : 'border-blue-600';
    const btnBg = isZeon ? 'bg-red-700 hover:bg-red-600' : 'bg-blue-700 hover:bg-blue-600';

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 relative">
            <div className={`w-full max-w-2xl bg-slate-900/90 backdrop-blur border-2 ${borderColor} p-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative overflow-hidden`}>

                {/* Decoration Bar */}
                <div className={`absolute top-0 left-0 w-full h-1 ${isZeon ? 'bg-gradient-to-r from-red-600 via-yellow-500 to-red-600' : 'bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600'}`} />

                {/* Left Side: Info */}
                <div className="hidden md:flex flex-col justify-between border-r border-slate-700 pr-8">
                    <div>
                        <h2 className="text-3xl font-display font-black text-white mb-2">NEW RECRUIT</h2>
                        <p className="text-slate-400 font-mono text-sm leading-relaxed">
                            Join the ranks. Register your neural signature in the global combat database.
                            Select your allegiance carefully.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                            <Globe className="w-4 h-4" /> GLOBAL_SERVER_ONLINE
                        </div>
                        <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                            <Cpu className="w-4 h-4" /> SYNC_RATIO_OPTIMIZED
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="flex flex-col">
                    <h3 className={`font-bold uppercase tracking-widest mb-6 flex items-center gap-2 ${accentColor}`}>
                        <UserPlus className="w-4 h-4" /> Enlistment Form
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4 flex-grow">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-slate-500">Codename</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-slate-950 border border-slate-700 p-2 text-white font-mono text-sm focus:border-white/50 focus:outline-none"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-slate-500">Comm Link (Email)</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-slate-950 border border-slate-700 p-2 text-white font-mono text-sm focus:border-white/50 focus:outline-none"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-slate-500">Passcode</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full bg-slate-950 border border-slate-700 p-2 text-white font-mono text-sm focus:border-white/50 focus:outline-none"
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-slate-500">Confirm</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full bg-slate-950 border border-slate-700 p-2 text-white font-mono text-sm focus:border-white/50 focus:outline-none"
                                    value={formData.confirmPassword}
                                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2 pt-2">
                            <label className="text-[10px] font-bold uppercase text-slate-500">Allegiance</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, faction: 'EFSF' })}
                                    className={`p-2 text-xs font-bold border transition-colors ${formData.faction === 'EFSF' ? 'bg-blue-900 border-blue-400 text-white' : 'border-slate-700 text-slate-500 hover:bg-slate-800'}`}
                                >
                                    E.F.S.F.
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, faction: 'ZEON' })}
                                    className={`p-2 text-xs font-bold border transition-colors ${formData.faction === 'ZEON' ? 'bg-red-900 border-yellow-500 text-white' : 'border-slate-700 text-slate-500 hover:bg-slate-800'}`}
                                >
                                    ZEON
                                </button>
                            </div>
                        </div>

                        {error && <div className="text-red-500 text-xs font-bold animate-pulse">{error}</div>}

                        <div className="pt-4 mt-auto">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3 font-bold uppercase tracking-widest text-white text-sm relative overflow-hidden group ${btnBg}`}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {loading ? 'Processing...' : <>Submit Registration <Crosshair className="w-4 h-4" /></>}
                                </span>
                            </button>
                        </div>
                    </form>

                    <div className="text-center pt-2">
                        <button
                            type="button"
                            onClick={() => onNavigate('LOGIN')}
                            className="text-[10px] font-mono text-slate-500 hover:text-white"
                        >
                            ALREADY_REGISTERED? LOGIN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
