import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Heart, Archive, AlertCircle, ShoppingBag } from 'lucide-react';

interface WishlistProps {
    items: Product[];
    onAddToCart: (product: Product) => void;
    onViewDetails: (product: Product) => void;
    wishlistIds: string[];
    onToggleWishlist: (id: string) => void;
    onGoShopping: () => void;
}

export const Wishlist: React.FC<WishlistProps> = ({
    items,
    onAddToCart,
    onViewDetails,
    wishlistIds,
    onToggleWishlist,
    onGoShopping
}) => {
    const totalCost = items.reduce((acc, item) => acc + (item.salePrice || item.price), 0);
    const avgGrade = items.length > 0 ? 'MIXED' : 'N/A'; // Mock logic

    return (
        <div className="min-h-screen bg-slate-950 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                    <div className="flex items-center gap-4">
                        <div className="bg-pink-900/20 p-4 rounded-full border border-pink-500/30">
                            <Heart className="h-8 w-8 text-pink-500 fill-current animate-pulse" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-display font-bold text-white leading-none">
                                PERSONAL HANGAR
                            </h2>
                            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                                Saved Units Requisition List
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-4 md:gap-8">
                        <div className="text-center">
                            <div className="text-xs text-slate-500 font-bold uppercase mb-1">Total Units</div>
                            <div className="text-2xl font-mono text-white">{items.length}</div>
                        </div>
                        <div className="w-px h-10 bg-slate-800" />
                        <div className="text-center">
                            <div className="text-xs text-slate-500 font-bold uppercase mb-1">Est. Cost</div>
                            <div className="text-2xl font-mono text-gundam-blue">${totalCost.toFixed(2)}</div>
                        </div>
                        <div className="w-px h-10 bg-slate-800" />
                        <div className="text-center">
                            <div className="text-xs text-slate-500 font-bold uppercase mb-1">Status</div>
                            <div className="text-xl font-bold text-yellow-500 uppercase">Pending</div>
                        </div>
                    </div>
                </div>

                {items.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {items.map((product, index) => (
                            <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
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
                    <div className="text-center py-32 bg-slate-900/50 border-2 border-slate-800 border-dashed rounded-lg flex flex-col items-center justify-center group hover:border-slate-700 transition-colors">
                        <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Archive className="h-10 w-10 text-slate-600 group-hover:text-slate-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 font-display">HANGAR EMPTY</h3>
                        <p className="text-slate-500 mb-8 max-w-sm mx-auto font-mono text-sm leading-relaxed">
                            <AlertCircle className="w-4 h-4 inline mr-2 text-yellow-500" />
                            No mobile suits designated for requisition. Access the catalog to begin fleet assembly.
                        </p>
                        <button
                            onClick={onGoShopping}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 uppercase tracking-widest transition-all rounded-sm flex items-center gap-2 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            Access Catalog
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
