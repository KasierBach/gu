import React, { useState, useMemo } from 'react';
import { Product, Grade, Series } from '../types';
import { PRODUCTS } from '../constants';
import { ProductCard } from './ProductCard';
import { FilterBar } from './FilterBar';

interface ShopProps {
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
}

export const Shop: React.FC<ShopProps> = ({
  onAddToCart,
  onViewDetails,
  wishlistIds,
  onToggleWishlist
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<Grade | ''>('');
  const [selectedSeries, setSelectedSeries] = useState<Series | ''>('');
  const [isGridMode, setIsGridMode] = useState(true);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGrade = selectedGrade ? product.grade === selectedGrade : true;
      const matchesSeries = selectedSeries ? product.series === selectedSeries : true;
      return matchesSearch && matchesGrade && matchesSeries;
    });
  }, [searchQuery, selectedGrade, selectedSeries]);

  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* Fixed background layer for performance */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-slate-900 to-transparent pointer-events-none" />

      <div className="py-12 px-4 max-w-7xl mx-auto relative z-10">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="text-xs font-mono text-gundam-blue mb-2">:: ACCESSING DATABASE ::</div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-white leading-none tracking-tighter">
              MOBILE SUIT <span className="text-transparent bg-clip-text bg-gradient-to-r from-gundam-blue to-cyan-400">CATALOG</span>
            </h2>
          </div>
          <div className="bg-slate-900/50 backdrop-blur border border-white/10 px-4 py-2 rounded-sm flex items-center gap-4 text-xs font-mono text-slate-400">
            <span>TOTAL UNITS: <span className="text-white font-bold">{filteredProducts.length}</span></span>
            <span className="h-4 w-px bg-white/10" />
            <span>STATUS: <span className="text-green-400 animate-pulse">ONLINE</span></span>
          </div>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-6 mb-10 shadow-2xl relative overflow-hidden group">
          {/* Scanline overlay for filter panel */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)] animate-scan pointer-events-none" />

          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedGrade={selectedGrade}
            onGradeChange={setSelectedGrade}
            selectedSeries={selectedSeries}
            onSeriesChange={setSelectedSeries}
          />
        </div>

        {filteredProducts.length > 0 ? (
          <div className={`grid ${isGridMode ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}>
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  onViewDetails={onViewDetails}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
              <div className="w-64 h-64 border-4 border-dashed border-slate-500 rounded-full animate-spin-slow" />
            </div>
            <p className="text-2xl font-display font-bold text-slate-500 mb-2">NO SIGNALS DETECTED</p>
            <p className="text-slate-400 font-mono text-sm mb-6">Modify search parameters to acquire targets.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedGrade('');
                setSelectedSeries('');
              }}
              className="px-6 py-2 bg-gundam-blue hover:bg-white hover:text-gundam-blue text-white font-bold uppercase tracking-widest transition-colors"
            >
              Reset Sensors
            </button>
          </div>
        )}
      </div>
    </div>
  );
};