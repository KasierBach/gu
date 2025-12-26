import React, { useState } from 'react';
import { X, Send, User, MessageCircle, Clock } from 'lucide-react';
import { ExchangePost, Theme, ExchangeComment } from '../types';

interface ExchangeDetailModalProps {
    post: ExchangePost | null;
    isOpen: boolean;
    onClose: () => void;
    onAddComment: (postId: string, text: string) => void;
    onContact: () => void;
    theme?: Theme;
}

export const ExchangeDetailModal: React.FC<ExchangeDetailModalProps> = ({
    post,
    isOpen,
    onClose,
    onAddComment,
    onContact,
    theme = 'EFSF'
}) => {
    const [commentText, setCommentText] = useState('');
    const isZeon = theme === 'ZEON';

    if (!isOpen || !post) return null;

    const handleSubmitComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (commentText.trim()) {
            onAddComment(post.id, commentText);
            setCommentText('');
        }
    };

    const borderClass = isZeon ? 'border-red-900' : 'border-slate-700';
    const bgClass = isZeon ? 'bg-zinc-900' : 'bg-slate-900';
    const textAccent = isZeon ? 'text-yellow-500' : 'text-gundam-blue';
    const buttonClass = isZeon
        ? 'bg-red-900 hover:bg-red-800 text-yellow-500'
        : 'bg-gundam-blue hover:bg-blue-600 text-white';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
            <div className={`relative w-full max-w-4xl p-6 rounded-lg border shadow-2xl my-auto ${bgClass} ${borderClass}`}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white z-10"
                >
                    <X className="h-6 w-6" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column: Image & Status */}
                    <div className="space-y-4">
                        <div className={`aspect-square rounded-lg overflow-hidden border ${isZeon ? 'border-red-900/30' : 'border-slate-700'} bg-black/50 flex items-center justify-center`}>
                            {post.image ? (
                                <img src={post.image} alt={post.have} className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-slate-600 flex flex-col items-center">
                                    <div className="w-20 h-20 rounded-full border-4 border-slate-700 border-dashed mb-4" />
                                    <span>No visual record available</span>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-center">
                            <span className={`px-3 py-1 rounded text-sm font-bold uppercase ${post.status === 'Open' ? 'bg-green-500/20 text-green-400' :
                                    post.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' :
                                        'bg-red-500/20 text-red-500'
                                }`}>
                                Status: {post.status}
                            </span>
                            <span className="text-slate-500 text-sm flex items-center">
                                <Clock className="w-4 h-4 mr-1" /> {post.date}
                            </span>
                        </div>
                    </div>

                    {/* Right Column: Details & Comments */}
                    <div className="flex flex-col h-[600px]">
                        <div className="mb-6 flex-shrink-0">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                                    <User className="text-slate-400" />
                                </div>
                                <div>
                                    <h3 className={`text-xl font-bold ${isZeon ? 'text-white' : 'text-white'}`}>{post.author}</h3>
                                    <p className="text-slate-500 text-sm">Pilot</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <span className="text-slate-500 text-xs uppercase block mb-1">Have</span>
                                    <p className={`text-2xl font-display font-bold ${textAccent}`}>{post.have}</p>
                                </div>
                                <div>
                                    <span className="text-slate-500 text-xs uppercase block mb-1">Want</span>
                                    <p className="text-xl font-bold text-gundam-red">{post.want}</p>
                                </div>
                                <div>
                                    <span className="text-slate-500 text-xs uppercase block mb-1">Description</span>
                                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                                        {post.description || "No additional data provided."}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={onContact}
                                className={`w-full py-3 rounded font-bold uppercase tracking-wider mb-6 ${buttonClass}`}
                            >
                                Contact Pilot
                            </button>
                        </div>

                        {/* Comments Section - Scrollable */}
                        <div className={`flex-grow flex flex-col min-h-0 border-t ${isZeon ? 'border-red-900/30' : 'border-slate-700'}`}>
                            <div className="py-4 flex items-center gap-2">
                                <MessageCircle className="w-5 h-5 text-slate-400" />
                                <span className="font-bold text-white">Comms Channel ({post.comments?.length || 0})</span>
                            </div>

                            <div className="flex-grow overflow-y-auto space-y-4 pr-2 mb-4 scrollbar-thin">
                                {post.comments && post.comments.length > 0 ? (
                                    post.comments.map(comment => (
                                        <div key={comment.id} className="bg-black/20 p-3 rounded">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <span className={`font-bold text-sm ${textAccent}`}>{comment.author}</span>
                                                <span className="text-xs text-slate-600">{comment.date}</span>
                                            </div>
                                            <p className="text-slate-300 text-sm">{comment.text}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-slate-600 italic">No transmissions recorded.</div>
                                )}
                            </div>

                            <form onSubmit={handleSubmitComment} className="flex-shrink-0 flex gap-2 pt-2">
                                <input
                                    type="text"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="Broadcast a message..."
                                    className={`flex-grow bg-black/30 border rounded px-3 py-2 text-sm text-white outline-none focus:border-opacity-100 ${isZeon ? 'border-red-900/50 focus:border-yellow-500' : 'border-slate-700 focus:border-gundam-blue'
                                        }`}
                                />
                                <button
                                    type="submit"
                                    disabled={!commentText.trim()}
                                    className={`p-2 rounded transition-colors ${commentText.trim() ? (isZeon ? 'text-yellow-500 hover:bg-red-900/50' : 'text-gundam-blue hover:bg-slate-800') : 'text-slate-600'}`}
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
