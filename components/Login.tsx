import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ViewState } from '../types';
import { Shield, Lock, Scan, AlertTriangle } from 'lucide-react';

interface LoginProps {
    onNavigate: (view: ViewState) => void;
    theme: 'EFSF' | 'ZEON';
}

export const Login: React.FC<LoginProps> = ({ onNavigate, theme }) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isScanning, setIsScanning] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsScanning(true);
        setError('');

        try {
            const success = await login(email, password);
            if (success) {
                onNavigate('PILOT');
            } else {
                setError('Access Denied: Invalid Credentials');
            }
        } catch (err) {
            setError('System Error: Authentication Module Offline');
        } finally {
            setIsScanning(false);
        }
    };

    const isZeon = theme === 'ZEON';
    const accentColor = isZeon ? 'text-yellow-500' : 'text-cyan-400';
    const borderColor = isZeon ? 'border-red-600' : 'border-blue-600';
    const btnBg = isZeon ? 'bg-red-700 hover:bg-red-600' : 'bg-blue-700 hover:bg-blue-600';

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />

            <div className={`w-full max-w-md bg-slate-900/80 backdrop-blur-xl border-2 ${borderColor} p-8 relative shadow-[0_0_50px_rgba(0,0,0,0.5)]`}>
                {/* Corner Markers */}
                <div className={`absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 ${isZeon ? 'border-yellow-500' : 'border-cyan-400'}`} />
                <div className={`absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 ${isZeon ? 'border-yellow-500' : 'border-cyan-400'}`} />
                <div className={`absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 ${isZeon ? 'border-yellow-500' : 'border-cyan-400'}`} />
                <div className={`absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 ${isZeon ? 'border-yellow-500' : 'border-cyan-400'}`} />

                <div className="text-center mb-8">
                    <Shield className={`w-12 h-12 mx-auto mb-4 ${accentColor}`} />
                    <h2 className="text-2xl font-display font-black text-white tracking-widest uppercase">
                        System Access
                    </h2>
                    <div className={`text-[10px] uppercase tracking-[0.3em] ${isZeon ? 'text-red-400' : 'text-blue-300'}`}>
                        Identity Verification Required
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="space-y-2">
                        <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Pilot ID / Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 p-3 text-white font-mono focus:border-white/50 focus:outline-none transition-colors"
                                placeholder="ENTER_ID..."
                            />
                            <div className="absolute right-3 top-3 text-slate-600">
                                <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Passcode</label>
                        <div className="relative">
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 p-3 text-white font-mono focus:border-white/50 focus:outline-none transition-colors"
                                placeholder="••••••••"
                            />
                            <Lock className="absolute right-3 top-3 w-4 h-4 text-slate-600" />
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-red-500 text-xs font-bold bg-red-950/30 p-3 border border-red-900">
                            <AlertTriangle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isScanning}
                        className={`w-full py-4 font-bold uppercase tracking-widest text-white transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 ${btnBg} ${isScanning ? 'opacity-75 cursor-wait' : ''}`}
                    >
                        {isScanning ? (
                            <>
                                <Scan className="w-5 h-5 animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            'Authenticate'
                        )}
                    </button>

                    <div className="text-center pt-4 border-t border-slate-800">
                        <button
                            type="button"
                            onClick={() => onNavigate('REGISTER')}
                            className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
                        >
                            &gt; NO_ID_FOUND? <span className={accentColor}>ENLIST_NOW</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
