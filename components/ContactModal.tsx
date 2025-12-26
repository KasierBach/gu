import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { Theme } from '../types';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    pilotName: string;
    itemName: string;
    theme?: Theme;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, pilotName, itemName, theme = 'EFSF' }) => {
    const [message, setMessage] = useState('');
    const isZeon = theme === 'ZEON';

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Transmission sent to ${pilotName}!\nMessage: ${message}`);
        setMessage('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className={`relative w-full max-w-md p-6 rounded-lg border shadow-2xl ${isZeon ? 'bg-zinc-900 border-red-900' : 'bg-slate-900 border-slate-700'
                }`}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white"
                >
                    <X className="h-6 w-6" />
                </button>

                <h3 className={`text-2xl font-display font-bold mb-2 ${isZeon ? 'text-red-500' : 'text-white'}`}>
                    Secure Channel
                </h3>
                <p className="text-slate-400 mb-6">
                    Initiating communication with <span className="font-bold text-white">{pilotName}</span> regarding <span className="font-bold text-white">{itemName}</span>.
                </p>

                <form onSubmit={handleSubmit}>
                    <textarea
                        required
                        className={`w-full h-32 p-3 rounded bg-black/30 border focus:border-opacity-100 outline-none text-white resize-none mb-4 ${isZeon ? 'border-red-900/50 focus:border-yellow-500' : 'border-slate-700 focus:border-gundam-blue'
                            }`}
                        placeholder="State your offer or trade proposal..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <button
                        type="submit"
                        className={`w-full py-3 px-4 rounded font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${isZeon
                                ? 'bg-red-900 hover:bg-red-800 text-yellow-500 border border-yellow-600/30'
                                : 'bg-gundam-blue hover:bg-blue-600 text-white'
                            }`}
                    >
                        <Send className="h-4 w-4" />
                        Send Transmission
                    </button>
                </form>
            </div>
        </div>
    );
};
