import React, { useState, useRef, useEffect } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, Tag, ArrowRight } from 'lucide-react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const cartRef = useRef<HTMLDivElement>(null);

  const subtotal = items.reduce((sum, item) => {
    const price = item.salePrice || item.price;
    return sum + price * item.quantity;
  }, 0);

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'GUNDAM10') {
      setDiscount(0.1);
      alert('Code Applied: 10% Off!');
    } else {
      alert('Invalid Code');
    }
  };

  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`fixed inset-0 z-50 transition-visibility duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <div
        ref={cartRef}
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-slate-900 border-l border-slate-700 shadow-2xl transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="text-gundam-blue" />
            <h2 className="text-xl font-display font-bold text-white">Hangar Inventory</h2>
            <span className="bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded-full">
              {items.reduce((acc, item) => acc + item.quantity, 0)} Items
            </span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500">
              <ShoppingBag size={48} className="mb-4 opacity-50" />
              <p className="text-lg">Your hangar is empty.</p>
              <button onClick={onClose} className="mt-4 text-gundam-blue hover:text-white font-bold uppercase text-sm">
                Acquire Mobile Suits
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                <div className="w-20 h-20 bg-slate-700 rounded overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-white line-clamp-1">{item.name}</h3>
                      <button onClick={() => onRemoveItem(item.id)} className="text-slate-500 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-gundam-blue font-bold">
                      ${(item.salePrice || item.price).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-6 h-6 rounded bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white"
                    >
                      -
                    </button>
                    <span className="text-white w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-6 h-6 rounded bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-slate-700 p-4 space-y-4 bg-slate-900">
            {/* Promo Code */}
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Tag className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded py-2 pl-9 pr-2 text-sm text-white focus:outline-none focus:border-gundam-blue"
                />
              </div>
              <button
                onClick={applyPromo}
                className="px-4 py-2 bg-slate-800 border border-slate-700 text-white font-bold uppercase text-xs rounded hover:bg-slate-700"
              >
                Apply
              </button>
            </div>

            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-500">
                  <span>Discount (10%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-slate-700">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-gundam-blue hover:bg-blue-600 text-white font-bold py-3 px-4 rounded uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02]"
            >
              Secure Checkout <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};