import React from 'react';
import { Product } from '../types';
import { Heart, ShoppingCart, Crosshair } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (id: string) => void;
  theme?: 'EFSF' | 'ZEON';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
  isWishlisted = false,
  onToggleWishlist,
  theme = 'EFSF'
}) => {
  const isZeon = theme === 'ZEON';
  const borderColor = isZeon ? 'border-red-900 group-hover:border-yellow-500' : 'border-slate-700 group-hover:border-gundam-blue';
  const glowColor = isZeon ? 'hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]' : 'hover:shadow-[0_0_20px_rgba(0,87,183,0.3)]';
  const accentText = isZeon ? 'text-yellow-500' : 'text-gundam-blue';

  return (
    <div className={`group relative bg-slate-900/80 backdrop-blur-sm border ${borderColor} overflow-hidden transition-all duration-300 transform hover:-translate-y-2 ${glowColor}`}>
      {/* Tech Corners */}
      <div className={`absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 transition-colors ${isZeon ? 'border-red-900 group-hover:border-yellow-500' : 'border-slate-600 group-hover:border-gundam-blue'} z-20`} />
      <div className={`absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 transition-colors ${isZeon ? 'border-red-900 group-hover:border-yellow-500' : 'border-slate-600 group-hover:border-gundam-blue'} z-20`} />

      {/* Image Container with Scanline Effect */}
      <div className="relative h-64 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-scanline bg-scanline animate-scan opacity-30 z-10 pointer-events-none" />
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 z-20 backdrop-blur-[2px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className={`px-6 py-2 border-2 font-bold uppercase tracking-widest text-sm flex items-center gap-2 transition-all hover:scale-105 ${isZeon ? 'border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black' : 'border-white text-white hover:bg-white hover:text-black'}`}
          >
            <Crosshair className="w-4 h-4" /> Analyze
          </button>
        </div>

        {/* Status Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
          {product.tags?.map(tag => (
            <span key={tag} className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/20 ${tag === 'New Arrival' ? 'bg-gundam-blue/80 text-white' :
                tag === 'Best Seller' ? 'bg-yellow-500/80 text-black' :
                  'bg-slate-800/80 text-slate-300'
              }`}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 relative">
        {/* Animated Background Grid on Hover */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-2">
            <span className={`text-xs font-bold px-2 py-1 rounded bg-slate-800 ${isZeon ? 'text-red-400' : 'text-slate-400'}`}>
              {product.series} | {product.grade}
            </span>
            {onToggleWishlist && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWishlist(product.id);
                }}
                className={`transition-transform hover:scale-110 ${isWishlisted ? 'text-red-500' : 'text-slate-600 hover:text-white'}`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            )}
          </div>

          <h3 className="font-display font-bold text-lg text-white mb-1 truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
            {product.name}
          </h3>

          <div className="flex items-end justify-between mt-4">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Unit Cost</p>
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-display font-bold ${accentText}`}>
                  ${(product.salePrice || product.price).toFixed(2)}
                </span>
                {product.salePrice && (
                  <span className="text-sm text-slate-500 line-through decoration-red-500">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className={`p-3 rounded-sm transition-all duration-300 hover:scale-110 active:scale-95 ${isZeon ? 'bg-red-900 text-yellow-500 hover:bg-yellow-500 hover:text-black' : 'bg-gundam-blue text-white hover:bg-white hover:text-gundam-blue'}`}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};