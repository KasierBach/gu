import React, { useState } from 'react';
import { Theme, CartItem } from '../types';
import { CreditCard, Truck, CheckCircle } from 'lucide-react';

interface CheckoutProps {
    items: CartItem[];
    total: number;
    onPlaceOrder: (details: any) => void;
    onCancel: () => void;
    theme?: Theme;
}

export const Checkout: React.FC<CheckoutProps> = ({ items, total, onPlaceOrder, onCancel, theme = 'EFSF' }) => {
    const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
    const [isProcessing, setIsProcessing] = useState(false);
    const [shippingDetails, setShippingDetails] = useState({
        name: '',
        address: '',
        colony: '',
        zip: ''
    });

    const isZeon = theme === 'ZEON';
    const headingColor = isZeon ? 'text-white' : 'text-white';
    const buttonClass = isZeon
        ? 'bg-red-900 hover:bg-red-800 text-yellow-500 border border-yellow-600'
        : 'bg-gundam-blue hover:bg-blue-700 text-white border border-transparent';

    const handleShippingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('payment');
    };

    const handlePaymentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            setStep('confirmation');
            onPlaceOrder(shippingDetails);
        }, 2000);
    };

    if (step === 'confirmation') {
        return (
            <div className="max-w-2xl mx-auto py-12 px-4 text-center">
                <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6 animate-bounce ${isZeon ? 'bg-yellow-600' : 'bg-green-500'}`}>
                    <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Order Confirmed!</h2>
                <p className="text-slate-400 mb-8">
                    Your Gunpla supplies have been secured. A transport ship will be dispatched to <span className="text-white font-bold">{shippingDetails.colony}</span> shortly.
                </p>
                <button
                    onClick={onCancel}
                    className={`px-8 py-3 font-bold uppercase tracking-wider rounded ${buttonClass}`}
                >
                    Return to Hangar
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <h2 className={`text-3xl font-display font-bold mb-8 flex items-center gap-3 ${headingColor}`}>
                {step === 'shipping' ? <Truck /> : <CreditCard />}
                {step === 'shipping' ? 'Secure Transport Details' : 'Payment Authorization'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="md:col-span-2">
                    <div className={`p-6 rounded-lg border ${isZeon ? 'bg-zinc-900 border-red-900' : 'bg-slate-800 border-slate-700'}`}>
                        {step === 'shipping' ? (
                            <form onSubmit={handleShippingSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-sm text-slate-400 mb-1">Pilot Name</label>
                                        <input required type="text" className="w-full bg-black/20 border border-slate-600 rounded p-2 text-white outline-none focus:border-white"
                                            value={shippingDetails.name} onChange={e => setShippingDetails({ ...shippingDetails, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm text-slate-400 mb-1">Delivery Address</label>
                                        <input required type="text" className="w-full bg-black/20 border border-slate-600 rounded p-2 text-white outline-none focus:border-white"
                                            value={shippingDetails.address} onChange={e => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Colony / Side</label>
                                        <input required type="text" className="w-full bg-black/20 border border-slate-600 rounded p-2 text-white outline-none focus:border-white"
                                            value={shippingDetails.colony} onChange={e => setShippingDetails({ ...shippingDetails, colony: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Postal Code</label>
                                        <input required type="text" className="w-full bg-black/20 border border-slate-600 rounded p-2 text-white outline-none focus:border-white"
                                            value={shippingDetails.zip} onChange={e => setShippingDetails({ ...shippingDetails, zip: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4">
                                    <button type="submit" className={`px-6 py-2 font-bold uppercase tracking-wider rounded ${buttonClass}`}>
                                        Proceed to Payment
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handlePaymentSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Card Number</label>
                                    <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-black/20 border border-slate-600 rounded p-2 text-white outline-none focus:border-white" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Expiry</label>
                                        <input required type="text" placeholder="MM/YY" className="w-full bg-black/20 border border-slate-600 rounded p-2 text-white outline-none focus:border-white" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">CVC</label>
                                        <input required type="text" placeholder="123" className="w-full bg-black/20 border border-slate-600 rounded p-2 text-white outline-none focus:border-white" />
                                    </div>
                                </div>
                                <div className="flex justify-between pt-4">
                                    <button type="button" onClick={() => setStep('shipping')} className="text-slate-400 hover:text-white">Back</button>
                                    <button disabled={isProcessing} type="submit" className={`px-6 py-2 font-bold uppercase tracking-wider rounded ${buttonClass} ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                        {isProcessing ? 'Authorizing...' : `Pay $${total.toFixed(2)}`}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Order Summary */}
                <div>
                    <div className={`p-6 rounded-lg sticky top-24 ${isZeon ? 'bg-red-950/20 border border-red-900' : 'bg-slate-800/50 border border-slate-700'}`}>
                        <h3 className="font-bold text-white mb-4 border-b border-slate-700 pb-2">Order Summary</h3>
                        <div className="space-y-3 max-h-60 overflow-y-auto pr-2 mb-4 scrollbar-thin">
                            {items.map(item => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-slate-300">{item.name} <span className="text-slate-500">x{item.quantity}</span></span>
                                    <span className="text-white">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-slate-700 pt-4 flex justify-between font-bold text-lg text-white">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
