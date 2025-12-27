import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, ChevronRight, Command } from 'lucide-react';
import { ViewState, Theme } from '../types';

interface TerminalOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (view: ViewState) => void;
    onToggleTheme: () => void;
    currentTheme: Theme;
}

export const TerminalOverlay: React.FC<TerminalOverlayProps> = ({
    isOpen,
    onClose,
    onNavigate,
    onToggleTheme,
    currentTheme
}) => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>(['GUNDAM_OS v3.0 // INITIALIZED', 'READY_FOR_INPUT...']);
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim().toLowerCase();
        if (!cmd) return;

        setHistory(prev => [...prev, `> ${input}`]);
        setInput('');

        const args = cmd.split(' ');
        const action = args[0];

        switch (action) {
            case 'help':
                setHistory(prev => [...prev,
                    'AVAILABLE_COMMANDS:',
                    '  goto [home|shop|exchange|deals|contact|pilot|wishlist|checkout]',
                    '  theme [efsf|zeon|toggle]',
                    '  clear',
                    '  exit'
                ]);
                break;
            case 'goto':
                const view = args[1]?.toUpperCase() as ViewState;
                const validViews: ViewState[] = ['HOME', 'SHOP', 'EXCHANGE', 'DEALS', 'CONTACT', 'PILOT', 'WISHLIST', 'CHECKOUT'];
                if (validViews.includes(view)) {
                    setHistory(prev => [...prev, `EXECUTING: NAV_TO_${view}...`]);
                    setTimeout(() => {
                        onNavigate(view);
                        onClose();
                    }, 500);
                } else {
                    setHistory(prev => [...prev, `ERROR: INVALID_SECTOR_${args[1]}`]);
                }
                break;
            case 'theme':
                if (args[1] === 'toggle' || !args[1]) {
                    onToggleTheme();
                    setHistory(prev => [...prev, 'THEME_TOGGLED']);
                } else if (args[1] === 'zeon' || args[1] === 'efsf') {
                    if (args[1].toUpperCase() !== currentTheme) {
                        onToggleTheme();
                    }
                    setHistory(prev => [...prev, `THEME_SET_TO_${args[1].toUpperCase()}`]);
                }
                break;
            case 'clear':
                setHistory(['TERMINAL_CLEARED']);
                break;
            case 'exit':
                onClose();
                break;
            default:
                setHistory(prev => [...prev, `ERROR: COMMAND_NOT_FOUND: ${action}`]);
        }
    };

    if (!isOpen) return null;

    const isZeon = currentTheme === 'ZEON';

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div
                className={`w-full max-w-2xl border-2 ${isZeon ? 'border-red-900 bg-red-950/40' : 'border-slate-700 bg-slate-900/40'} backdrop-blur-xl shadow-2xl relative overflow-hidden`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className={`flex items-center justify-between px-4 py-2 border-b ${isZeon ? 'border-red-900 bg-red-900/20' : 'border-slate-700 bg-slate-800/20'}`}>
                    <div className="flex items-center gap-2">
                        <Terminal className={`w-4 h-4 ${isZeon ? 'text-yellow-500' : 'text-gundam-blue'}`} />
                        <span className="text-[10px] font-mono font-bold text-white tracking-[0.2em]">COMMAND_TERMINAL // SECURE_LINK</span>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Console Body */}
                <div
                    ref={scrollRef}
                    className="h-64 overflow-y-auto p-4 font-mono text-xs space-y-1 scrollbar-thin scrollbar-thumb-slate-700"
                >
                    {history.map((msg, i) => (
                        <div key={i} className={msg.startsWith('>') ? 'text-white font-bold' : msg.startsWith('ERROR') ? 'text-red-500' : 'text-slate-400'}>
                            <span className="mr-2 opacity-50">#</span> {msg}
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <form onSubmit={handleCommand} className={`p-4 border-t ${isZeon ? 'border-red-900' : 'border-slate-700'} flex items-center gap-2 bg-black/40`}>
                    <ChevronRight className={`w-4 h-4 ${isZeon ? 'text-yellow-500' : 'text-gundam-blue'} animate-pulse`} />
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="TYPE_COMMAND (try 'help')..."
                        className="bg-transparent border-none outline-none text-white w-full placeholder:text-slate-600 block"
                        autoFocus
                    />
                    <div className="flex items-center gap-1 opacity-40">
                        <Command className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] text-slate-400 font-bold uppercase">ESC TO EXIT</span>
                    </div>
                </form>

                {/* Decorative scanning line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white opacity-10 animate-scan pointer-events-none" />
            </div>

            {/* Click outside to close */}
            <div className="absolute inset-0 -z-10" onClick={onClose} />
        </div>
    );
};
