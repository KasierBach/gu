import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';
import { ProductCard } from './ProductCard';
import { Timer, Zap, AlertTriangle } from 'lucide-react';

interface DealsProps {
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
}

export const Deals: React.FC<DealsProps> = ({
  onAddToCart,
  onViewDetails,
  wishlistIds,
  onToggleWishlist
}) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const saleProducts = PRODUCTS.filter(p => p.salePrice);

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Alert Background */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0)_0px,rgba(0,0,0,0)_20px,rgba(20,0,0,0.5)_20px,rgba(20,0,0,0.5)_40px)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Custom Banner */}
        <div className="bg-gradient-to-r from-red-900 via-red-800 to-black rounded-sm p-1 ml-1 mb-12 border-l-4 border-yellow-500 shadow-[0_0_50px_rgba(220,38,38,0.3)]">
          <div className="bg-black/40 backdrop-blur p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <AlertTriangle size={120} className="text-red-500" />
            </div>

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500 text-black text-xs font-bold uppercase tracking-widest mb-4 animate-pulse">
                <Zap size={14} fill="currentColor" /> Priority Alert
              </div>
              <h2 className="text-4xl md:text-7xl font-display font-black uppercase mb-2 tracking-tighter text-white">
                BLACK MARKET <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500">CACHE</span>
              </h2>
              <p className="text-red-200 font-mono text-sm tracking-widest mb-8">
                UNAUTHORIZED DISCOUNTS DETECTED. TIME REMAINING UNTIL ENCRYPTION RESET:
              </p>

              <div className="flex justify-center gap-4 md:gap-8">
                {['HOURS', 'MINUTES', 'SECONDS'].map((label, i) => {
                  const val = i === 0 ? timeLeft.hours : i === 1 ? timeLeft.minutes : timeLeft.seconds;
                  return (
                    <div key={label} className="flex flex-col items-center">
                      <div className="text-4xl md:text-6xl font-black text-white bg-slate-900 border border-slate-700 px-4 py-2 rounded-sm font-mono relative group">
                        {String(val).padStart(2, '0')}
                        <div className="absolute inset-0 border border-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-[10px] md:text-xs font-bold text-slate-500 mt-2 tracking-[0.2em]">{label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 flex items-end gap-4 border-b border-white/10 pb-4">
          <h3 className="text-2xl font-bold text-white uppercase flex items-center gap-2">
            <div className="w-2 h-8 bg-red-600" />
            Active Supply Drops
          </h3>
          <span className="text-slate-500 text-sm font-mono mb-1">
             // SECURE THESE ASSETS BEFORE MARKET CORRECTION
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {saleProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
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
      </div>
    </div>
  );
};