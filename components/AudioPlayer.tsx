import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, Volume2, VolumeX, Music } from 'lucide-react';
import { Theme } from '../types';

interface AudioPlayerProps {
    theme?: Theme;
}

const TRACKS = [
    { title: "Unicorn Theme", duration: "3:45" },
    { title: "Gallant Char", duration: "2:30" },
    { title: "Beyond the Time", duration: "4:15" },
    { title: "Just Communication", duration: "3:10" }
];

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ theme = 'EFSF' }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true);

    // Mock audio ref - in a real app this would connect to an HTMLAudioElement
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        // Logic to play/pause actual audio would go here
    };

    const nextTrack = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
        setIsPlaying(true);
    };

    const isZeon = theme === 'ZEON';
    const accentColor = isZeon ? 'text-yellow-500' : 'text-gundam-blue';
    const bgClass = isZeon ? 'bg-red-950/90 border-red-900' : 'bg-slate-900/90 border-slate-700';

    return (
        <div className={`fixed bottom-4 left-4 z-50 backdrop-blur-md border rounded-lg shadow-2xl transition-all duration-300 ${bgClass} ${isCollapsed ? 'w-12 h-12 overflow-hidden' : 'w-72 p-4'}`}>

            {/* Collapsed Toggle */}
            {isCollapsed && (
                <button
                    onClick={() => setIsCollapsed(false)}
                    className={`w-full h-full flex items-center justify-center ${accentColor} animate-pulse-slow`}
                >
                    <Music className="w-6 h-6" />
                </button>
            )}

            {/* Expanded Player */}
            {!isCollapsed && (
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`} />
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Gundam OST</span>
                        </div>
                        <button onClick={() => setIsCollapsed(true)} className="text-slate-500 hover:text-white">
                            <span className="text-xs uppercase">Minimize</span>
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h4 className={`font-display font-bold text-lg truncate ${isZeon ? 'text-white' : 'text-white'}`}>
                                {TRACKS[currentTrackIndex].title}
                            </h4>
                            <div className="w-full bg-slate-800 h-1 mt-2 rounded-full overflow-hidden">
                                <div className={`h-full w-1/3 ${isZeon ? 'bg-yellow-600' : 'bg-gundam-blue'} animate-progress`} />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <button onClick={() => setIsMuted(!isMuted)} className="text-slate-400 hover:text-white">
                                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                            </button>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={togglePlay}
                                    className={`p-3 rounded-full ${isZeon ? 'bg-yellow-600 text-black hover:bg-yellow-500' : 'bg-gundam-blue text-white hover:bg-blue-600'}`}
                                >
                                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current pl-1" />}
                                </button>
                                <button onClick={nextTrack} className="text-slate-400 hover:text-white">
                                    <SkipForward className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
