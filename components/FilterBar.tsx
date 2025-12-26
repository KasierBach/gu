import React from 'react';
import { Grade, Series } from '../types';
import { Search, Filter, Cpu, Database } from 'lucide-react';

interface FilterBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedGrade: Grade | '';
    onGradeChange: (grade: Grade | '') => void;
    selectedSeries: Series | '';
    onSeriesChange: (series: Series | '') => void;
    className?: string; // Kept for compatibility if used elsewhere
}

export const FilterBar: React.FC<FilterBarProps> = ({
    searchQuery,
    onSearchChange,
    selectedGrade,
    onGradeChange,
    selectedSeries,
    onSeriesChange,
    className = ''
}) => {
    return (
        <div className={`bg-slate-900/80 backdrop-blur-md border border-slate-700 p-4 mb-8 rounded-sm shadow-xl relative overflow-hidden group ${className}`}>
            {/* Decorative scanning line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gundam-blue to-transparent opacity-50" />

            <div className="flex flex-col md:flex-row gap-4 items-center">
                {/* Search Input */}
                <div className="relative flex-grow w-full md:w-auto group/search">
                    <Search className="absolute left-3 top-3 text-slate-500 group-focus-within/search:text-gundam-blue transition-colors h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Search Database..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 text-white pl-10 pr-4 py-2.5 outline-none focus:border-gundam-blue focus:ring-1 focus:ring-gundam-blue/50 transition-all font-mono placeholder:text-slate-600"
                    />
                </div>

                {/* Filters */}
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-48">
                        <Cpu className="absolute left-3 top-3 text-slate-500 h-4 w-4 pointer-events-none" />
                        <select
                            value={selectedGrade}
                            onChange={(e) => onGradeChange(e.target.value as Grade)}
                            className="w-full appearance-none bg-slate-950 border border-slate-700 text-slate-300 pl-10 pr-8 py-2.5 outline-none focus:border-gundam-blue focus:text-white transition-all font-bold uppercase text-xs cursor-pointer hover:border-slate-500"
                        >
                            <option value="">All Grades</option>
                            <option value="HG">High Grade</option>
                            <option value="RG">Real Grade</option>
                            <option value="MG">Master Grade</option>
                            <option value="PG">Perfect Grade</option>
                        </select>
                        <div className="absolute right-3 top-3.5 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-500 pointer-events-none" />
                    </div>

                    <div className="relative w-full md:w-56">
                        <Database className="absolute left-3 top-3 text-slate-500 h-4 w-4 pointer-events-none" />
                        <select
                            value={selectedSeries}
                            onChange={(e) => onSeriesChange(e.target.value as Series)}
                            className="w-full appearance-none bg-slate-950 border border-slate-700 text-slate-300 pl-10 pr-8 py-2.5 outline-none focus:border-gundam-blue focus:text-white transition-all font-bold uppercase text-xs cursor-pointer hover:border-slate-500"
                        >
                            <option value="">All Series</option>
                            <option value="Universal Century">Universal Century</option>
                            <option value="Cosmic Era">Cosmic Era</option>
                            <option value="Anno Domini">Anno Domini</option>
                            <option value="Post Disaster">Post Disaster</option>
                            <option value="Witch from Mercury">Witch from Mercury</option>
                        </select>
                        <div className="absolute right-3 top-3.5 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-500 pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
    );
};
