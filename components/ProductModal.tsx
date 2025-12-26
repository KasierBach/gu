import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingCart, X, Heart, Shield, Ruler, Sword, User } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (id: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const StatBar = ({ label, value, max = 100, color = 'bg-gundam-blue' }) => (
    <div className="mb-3">
      <div className="flex justify-between text-xs uppercase font-bold text-slate-400 mb-1">
        <span>{label}</span>
        <span className="text-white">{value}</span>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} animate-progress`}
          style={{ width: '80%' }} // Mock width animation
        />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-slate-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl flex flex-col md:flex-row rounded-sm group overflow-hidden animate-fade-in-up">
        {/* Tech Borders */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-slate-700 rounded-tl-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-slate-700 rounded-br-3xl pointer-events-none" />

        {/* Image Section */}
        <div className="w-full md:w-1/2 relative min-h-[400px] bg-slate-950">
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_100%)]" />
          <img
            src={product.image}
            alt={product.name}
            className="relative w-full h-full object-cover z-10"
          />
          {/* Blueprint Overlay Elements */}
          <div className="absolute top-4 left-4 z-20">
            <div className="text-xs text-gundam-blue font-mono border border-gundam-blue/50 px-2 py-1 bg-black/50">
              FIG_01: {product.grade.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="mb-2 flex items-center gap-2">
            <span className="text-gundam-blue font-bold text-sm tracking-widest border border-gundam-blue px-2 py-0.5 rounded-sm">
              MS-{Math.floor(Math.random() * 100)} // {product.series.toUpperCase()}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-2 leading-tight">
            {product.name}
          </h2>

          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-800">
            <div className="text-3xl font-bold text-white">
              ${(product.salePrice || product.price).toFixed(2)}
            </div>
            {product.salePrice && (
              <div className="text-slate-500 line-through text-lg">
                ${product.price.toFixed(2)}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-gundam-blue font-bold uppercase text-xs mb-4 flex items-center gap-2">
                <User className="w-4 h-4" /> Pilot Data
              </h4>
              <p className="text-xl font-display font-bold text-white">{product.lore?.pilot || 'Unknown'}</p>
              <div className="mt-2 text-xs text-slate-500">
                Assign to roster for combat deployment.
              </div>
            </div>
            <div>
              <h4 className="text-gundam-blue font-bold uppercase text-xs mb-4 flex items-center gap-2">
                <Ruler className="w-4 h-4" /> Specifications
              </h4>
              <StatBar label="Height" value={product.lore?.height || '18.0m'} />
              <StatBar label="Output" value="High" color="bg-gundam-red" />
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-gundam-blue font-bold uppercase text-xs mb-3 flex items-center gap-2">
              <Sword className="w-4 h-4" /> Armaments
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.lore?.armaments?.map((weapon, i) => (
                <span key={i} className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-bold uppercase border border-slate-700">
                  {weapon}
                </span>
              )) || <span className="text-slate-500 text-sm">Standard Loadout</span>}
            </div>
          </div>

          <div className="flex gap-4 mt-auto">
            <div className="flex items-center bg-slate-800 border border-slate-600 rounded px-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-2 py-2 text-slate-300 hover:text-white"
              >
                -
              </button>
              <span className="px-2 py-2 text-white font-bold w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-2 py-2 text-slate-300 hover:text-white"
              >
                +
              </button>
            </div>
            <button
              onClick={() => onAddToCart(product, quantity)}
              className="flex-1 bg-gundam-blue hover:bg-white hover:text-gundam-blue text-white font-bold py-4 px-6 rounded-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Initiate Purchase
            </button>
            {onToggleWishlist && (
              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`px-4 border border-slate-700 hover:border-white transition-colors ${isWishlisted ? 'text-red-500 bg-red-900/10 border-red-900' : 'text-slate-400'
                  }`}
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};