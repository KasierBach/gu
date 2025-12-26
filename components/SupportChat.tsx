import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { Theme } from '../types';

interface SupportChatProps {
    theme?: Theme;
}

interface Message {
    id: string;
    sender: 'user' | 'bot';
    text: string;
}

export const SupportChat: React.FC<SupportChatProps> = ({ theme = 'EFSF' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', sender: 'bot', text: 'Haro! Haro! Need assistance? I can help you find Gunpla!' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: inputValue
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');

        // Simulate bot response
        setTimeout(() => {
            const botResponses = [
                "Scanning database... Item found in sector 7!",
                "Haro! Check the 'New Arrivals' section!",
                "Shipping takes 2-3 cycles via White Base transport.",
                "That Mobile Suit is rated highly by Captain Bright."
            ];
            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'bot',
                text: randomResponse
            };
            setMessages(prev => [...prev, botMsg]);
        }, 1000);
    };

    const isZeon = theme === 'ZEON';
    const accentColor = isZeon ? 'bg-yellow-600' : 'bg-gundam-blue';

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className={`mb-4 w-80 h-96 rounded-lg shadow-2xl flex flex-col overflow-hidden border ${isZeon ? 'bg-zinc-900 border-red-900' : 'bg-slate-900 border-slate-700'}`}>
                    {/* Header */}
                    <div className={`p-4 flex justify-between items-center ${isZeon ? 'bg-red-900 text-white' : 'bg-gundam-blue text-white'}`}>
                        <div className="flex items-center gap-2">
                            <Bot className="w-5 h-5" />
                            <span className="font-bold">Haro Support</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:text-slate-200">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-black/20">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.sender === 'user'
                                        ? (isZeon ? 'bg-yellow-600 text-black' : 'bg-gundam-blue text-white')
                                        : 'bg-slate-800 text-slate-200'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className={`p-3 border-t ${isZeon ? 'border-red-900' : 'border-slate-700'}`}>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                placeholder="Ask Haro..."
                                className="flex-grow bg-slate-800 text-white text-sm rounded px-3 py-2 outline-none focus:ring-1 focus:ring-opacity-50"
                            />
                            <button
                                type="submit"
                                className={`p-2 rounded transition-colors ${isZeon ? 'text-yellow-500 hover:bg-red-900/50' : 'text-gundam-blue hover:bg-slate-800'}`}
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-transform hover:scale-110 ${accentColor}`}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
            </button>
        </div>
    );
};
