import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Shop } from './components/Shop';
import { ProductModal } from './components/ProductModal';
import { Cart } from './components/Cart';
import { Exchange } from './components/Exchange';
import { Deals } from './components/Deals';
import { Contact } from './components/Contact';
import { Wishlist } from './components/Wishlist';
import { PilotProfile } from './components/PilotProfile';
import { TerminalOverlay } from './components/TerminalOverlay';
import { Checkout } from './components/Checkout';
import { Product, CartItem, ViewState, Theme } from './types';
import { PRODUCTS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [theme, setTheme] = useState<Theme>('EFSF');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(prev => prev === 'EFSF' ? 'ZEON' : 'EFSF');
  };

  // Keyboard listeners for Terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle with Ctrl+K or / (if not in input)
      if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA')) {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsTerminalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Wishlist Logic
  const toggleWishlist = (id: string) => {
    setWishlistIds(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const wishlistedProducts = PRODUCTS.filter(p => wishlistIds.includes(p.id));

  // Cart Logic
  const addToCart = (product: Product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Navigation Logic
  const renderView = () => {
    switch (currentView) {
      case 'HOME':
        return (
          <>
            <Hero onShopNow={() => setCurrentView('SHOP')} theme={theme} />

            {/* Mission Briefing / News Ticker Mockup */}
            <div className="bg-slate-950 border-b border-slate-800 py-3">
              <div className="max-w-7xl mx-auto px-4 flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-slate-500">
                <span className={`px-2 py-0.5 rounded ${theme === 'ZEON' ? 'bg-red-900 text-red-300' : 'bg-blue-900 text-blue-300'} font-bold`}>Latest Intel</span>
                <span className="animate-pulse">Analyzing combat data from Sector 7...</span>
                <span className="hidden md:inline text-slate-700">|</span>
                <span className="hidden md:inline">Supply lines secured for MG Barbatos shipment</span>
              </div>
            </div>

            <div className="py-16 px-4 max-w-7xl mx-auto relative">
              {/* Background Tech Elements */}
              <div className="absolute top-20 right-0 w-64 h-64 bg-gradient-to-b from-slate-800/20 to-transparent rounded-full blur-3xl" />

              <div className="flex items-center justify-between mb-10">
                <h2 className="text-4xl md:text-5xl font-display font-black text-white leading-none">
                  <span className={`block text-lg font-mono font-bold tracking-[0.5em] mb-2 ${theme === 'ZEON' ? 'text-yellow-600' : 'text-gundam-blue'}`}>
                    PRIORITY TARGETS
                  </span>
                  FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-600">UNITS</span>
                </h2>
                <div className="hidden md:flex gap-2">
                  <div className="w-12 h-1 bg-slate-800" />
                  <div className="w-2 h-1 bg-slate-700" />
                  <div className={`w-12 h-1 ${theme === 'ZEON' ? 'bg-red-900' : 'bg-gundam-blue'}`} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PRODUCTS.slice(0, 3).map((p, i) => (
                  <div key={p.id} className="group relative" style={{ animationDelay: `${i * 100}ms` }}>
                    {/* Card Tech overlay */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r from-transparent ${theme === 'ZEON' ? 'via-red-900/50' : 'via-gundam-blue/50'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`} />

                    <div className="relative bg-slate-900 border border-slate-700 h-full flex flex-col transition-transform duration-300 hover:-translate-y-2">
                      <div className="relative h-72 overflow-hidden bg-slate-950">
                        <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none z-10" />
                        <img
                          src={p.image}
                          className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-700"
                          alt={p.name}
                        />
                        <div className={`absolute top-0 right-0 p-2 z-20`}>
                          <span className={`text-[10px] font-bold px-2 py-1 bg-black/70 backdrop-blur border ${theme === 'ZEON' ? 'border-yellow-500 text-yellow-500' : 'border-cyan-400 text-cyan-400'}`}>
                            {p.grade}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex-grow flex flex-col relative overflow-hidden">
                        {/* Decorative background number */}
                        <div className="absolute -right-4 -bottom-8 text-9xl font-black text-white/5 font-display select-none">
                          0{i + 1}
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2 relative z-10">{p.name}</h3>
                        <p className="text-slate-400 text-sm mb-4 line-clamp-2 relative z-10">{p.description}</p>

                        <div className="mt-auto flex items-center justify-between relative z-10">
                          <span className={`text-2xl font-display font-bold ${theme === 'ZEON' ? 'text-yellow-500' : 'text-gundam-blue'}`}>
                            ${p.price.toFixed(2)}
                          </span>
                          <button
                            onClick={() => setSelectedProduct(p)}
                            className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors hover:text-white flex items-center gap-1 group/btn ${theme === 'ZEON' ? 'text-red-500 hover:bg-red-900/30' : 'text-gundam-blue hover:bg-blue-900/30'}`}
                          >
                            Analyze <span className="transform group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Deal Teaser */}
            <div className="relative py-24 overflow-hidden border-t border-b border-slate-700">
              <div className={`absolute inset-0 bg-cover bg-center opacity-40 ${theme === 'ZEON' ? 'bg-[url("https://images.unsplash.com/photo-1614728853975-666248bc4e85?q=80&w=2670&auto=format&fit=crop")]' : 'bg-[url("https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=2070&auto=format&fit=crop")]'} grayscale mix-blend-multiply transition-all duration-1000 md:grayscale-0`} />
              <div className={`absolute inset-0 ${theme === 'ZEON' ? 'bg-gradient-to-r from-red-950/90 via-red-900/80 to-transparent' : 'bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-transparent'}`} />

              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="max-w-2xl">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] border mb-6 ${theme === 'ZEON' ? 'border-yellow-500 text-yellow-500 bg-red-950/50' : 'border-cyan-400 text-cyan-400 bg-blue-950/50'}`}>
                    <span className={`w-2 h-2 rounded-full ${theme === 'ZEON' ? 'bg-yellow-500' : 'bg-cyan-400'} animate-pulse`} />
                    Priorty Transmission
                  </div>
                  <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-6 tracking-tighter leading-[0.9]">
                    WEEKLY <br />
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme === 'ZEON' ? 'from-yellow-400 to-red-600' : 'from-cyan-400 to-blue-600'}`}>SPECIALS</span>
                  </h2>
                  <p className="text-slate-300 text-lg max-w-lg font-mono">
                    Authorizing limited-time price reductions on select mobile suit units. Supply drops inbound. Secure your reinforcements immediately.
                  </p>
                </div>

                <div className="relative group">
                  <div className={`absolute -inset-1 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 ${theme === 'ZEON' ? 'bg-yellow-600' : 'bg-cyan-500'}`} />
                  <button
                    onClick={() => setCurrentView('DEALS')}
                    className={`relative px-12 py-6 font-bold uppercase tracking-widest text-xl transition-all duration-300 transform group-hover:scale-105 overflow-hidden ${theme === 'ZEON' ? 'bg-yellow-500 text-black shadow-[0_0_40px_rgba(234,179,8,0.4)]' : 'bg-white text-blue-900 shadow-[0_0_40px_rgba(14,165,233,0.4)]'}`}
                  >
                    <span className="relative z-10 flex items-center gap-4">
                      Access Deals <div className={`w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] ${theme === 'ZEON' ? 'border-t-black' : 'border-t-blue-900'} border-r-[10px] border-r-transparent transform -rotate-45`} />
                    </span>
                    {/* Button shine effect */}
                    <div className="absolute inset-0 w-full h-full bg-white/40 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      case 'SHOP':
        return (
          <Shop
            onAddToCart={addToCart}
            onViewDetails={setSelectedProduct}
            wishlistIds={wishlistIds}
            onToggleWishlist={toggleWishlist}
          />
        );
      case 'EXCHANGE':
        return <Exchange currentTheme={theme} />;
      case 'DEALS':
        return (
          <Deals
            onAddToCart={addToCart}
            onViewDetails={setSelectedProduct}
            wishlistIds={wishlistIds}
            onToggleWishlist={toggleWishlist}
          />
        );
      case 'WISHLIST':
        return (
          <Wishlist
            items={wishlistedProducts}
            onAddToCart={addToCart}
            onViewDetails={setSelectedProduct}
            wishlistIds={wishlistIds}
            onToggleWishlist={toggleWishlist}
            onGoShopping={() => setCurrentView('SHOP')}
          />
        );
      case 'CONTACT':
        return <Contact />;
      case 'CHECKOUT':
        return <Checkout cartItems={cartItems} onNavigate={setCurrentView} currentTheme={theme} />;
      case 'PILOT':
        return <PilotProfile theme={theme} />;
      default:
        return (
          <Shop
            onAddToCart={addToCart}
            onViewDetails={setSelectedProduct}
            wishlistIds={wishlistIds}
            onToggleWishlist={toggleWishlist}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen text-slate-100 flex flex-col font-sans selection:text-white transition-colors duration-500 ${theme === 'ZEON' ? 'bg-zinc-900 selection:bg-red-700' : 'bg-slate-900 selection:bg-gundam-blue'
      }`}>
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        currentTheme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-grow">
        {renderView()}
      </main>

      <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8 relative overflow-hidden">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        {/* Scanner Line */}
        <div className={`absolute top-0 left-0 w-full h-[1px] ${theme === 'ZEON' ? 'bg-gradient-to-r from-transparent via-red-500 to-transparent' : 'bg-gradient-to-r from-transparent via-cyan-500 to-transparent'} opacity-50 shadow-[0_0_15px_rgba(255,255,255,0.5)]`} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 flex items-center justify-center border-2 rounded ${theme === 'ZEON' ? 'border-yellow-500 bg-red-900/20' : 'border-gundam-blue bg-blue-900/20'}`}>
                  <div className={`w-8 h-8 ${theme === 'ZEON' ? 'bg-yellow-500' : 'bg-gundam-blue'} [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]`} />
                </div>
                <div>
                  <span className="font-display font-black text-3xl tracking-wider text-white block leading-none">
                    GUNDAM
                  </span>
                  <span className={`font-bold tracking-[0.3em] text-sm ${theme === 'ZEON' ? 'text-red-500' : 'text-cyan-400'}`}>
                    UNIVERSE // OS.VER.3.0
                  </span>
                </div>
              </div>
              <p className="text-slate-400 font-mono text-sm max-w-sm leading-relaxed border-l-2 border-slate-800 pl-4">
                Global distribution network for Mobile Suit weaponry and assembly kits.
                Warning: Authorized personnel only. Unauthorized access will be countered with maximum force.
              </p>
            </div>

            <div>
              <h4 className={`font-bold uppercase mb-6 tracking-widest text-sm flex items-center gap-2 ${theme === 'ZEON' ? 'text-yellow-500' : 'text-gundam-blue'}`}>
                <div className="w-1 h-4 bg-current" /> Quick Access
              </h4>
              <ul className="space-y-3 text-slate-400 text-sm font-mono">
                {['Shop Hangar', 'Exchange Comms', 'Support Relay', 'Pilot Profile'].map((item) => (
                  <li key={item} className="group cursor-pointer flex items-center gap-2 hover:text-white transition-colors">
                    <span className={`w-1.5 h-1.5 rounded-full ${theme === 'ZEON' ? 'bg-red-600 group-hover:bg-yellow-500' : 'bg-slate-600 group-hover:bg-cyan-400'} transition-colors`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={`font-bold uppercase mb-6 tracking-widest text-sm flex items-center gap-2 ${theme === 'ZEON' ? 'text-yellow-500' : 'text-gundam-blue'}`}>
                <div className="w-1 h-4 bg-current" /> Sub-Space Comm
              </h4>
              <p className="text-xs text-slate-500 mb-4">Subscribe for high-priority equipment drops.</p>
              <div className="flex relative group">
                <input
                  type="text"
                  placeholder="ENTER_FREQ_ID..."
                  className="bg-slate-900/50 border border-slate-700 px-4 py-3 text-xs font-mono w-full focus:outline-none focus:border-white/50 text-white placeholder:text-slate-600 transition-colors"
                />
                <button className={`px-4 font-bold text-lg transition-all absolute right-0 top-0 bottom-0 border-l border-slate-700 hover:bg-white/10 ${theme === 'ZEON' ? 'text-yellow-500' : 'text-cyan-400'}`}>
                  &rarr;
                </button>
                {/* Corner Accents */}
                <div className="absolute -bottom-1 -left-1 w-2 h-2 border-l border-b border-slate-500" />
                <div className="absolute -top-1 -right-1 w-2 h-2 border-r border-t border-slate-500" />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-600">
            <div>
              <span>SYS_ID: 874-992-X</span>
              <span className="mx-4">|</span>
              <span>SECURE CONNECTION ESTABLISHED</span>
            </div>
            <div className="flex gap-6">
              <span className="hover:text-white cursor-pointer transition-colors">PRIVACY_PROTOCOL</span>
              <span className="hover:text-white cursor-pointer transition-colors">TERMS_OF_ENGAGEMENT</span>
            </div>
          </div>

          <div className="mt-8 text-center text-slate-700 text-[10px] font-mono tracking-widest uppercase">
            © {new Date().getFullYear()} Gundam Universe. {theme === 'ZEON' ? 'GLORY TO THE PRINCIPALITY OF ZEON.' : 'EARTH FEDERATION SPACE FORCE.'}
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={toggleWishlist}
      />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={() => {
          setCurrentView('CHECKOUT');
          setIsCartOpen(false);
        }}
      />

      <TerminalOverlay
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onNavigate={setCurrentView}
        onToggleTheme={toggleTheme}
        currentTheme={theme}
      />
    </div>
  );
};

export default App;