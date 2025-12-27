import React, { useState } from 'react';
import { ViewState, Theme } from '../types';
import { Menu, ShoppingCart, X, Zap, Heart, Shield, Crosshair, User } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  cartCount: number;
  onOpenCart: () => void;
  currentTheme?: Theme;
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  cartCount,
  onOpenCart,
  currentTheme = 'EFSF',
  onToggleTheme
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { label: string; view: ViewState }[] = [
    { label: 'Home', view: 'HOME' },
    { label: 'Shop', view: 'SHOP' },
    { label: 'Exchange', view: 'EXCHANGE' },
    { label: 'Deals', view: 'DEALS' },
    { label: 'Contact', view: 'CONTACT' },
  ];

  const handleNavClick = (view: ViewState) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md border-b shadow-lg transition-colors duration-500 ${currentTheme === 'ZEON'
      ? 'bg-red-950/90 border-red-900'
      : 'bg-slate-900/90 border-slate-700'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div
            className="flex-shrink-0 flex items-center cursor-pointer group"
            onClick={() => handleNavClick('HOME')}
          >
            <Zap className={`h-8 w-8 transition-colors duration-300 ${currentTheme === 'ZEON' ? 'text-yellow-500' : 'text-gundam-yellow group-hover:text-gundam-red'
              }`} />
            <span className="ml-2 font-display font-bold text-2xl tracking-wider text-white">
              GUNDAM<span className={currentTheme === 'ZEON' ? 'text-red-500' : 'text-gundam-blue'}>UNIVERSE</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.view)}
                  className={`px-3 py-2 rounded-md text-sm font-medium uppercase tracking-widest transition-all duration-200 ${currentView === item.view
                    ? `text-white ${currentTheme === 'ZEON' ? 'bg-red-900 border-b-2 border-yellow-500' : 'bg-slate-800 border-b-2 border-gundam-red'}`
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border transition-all ${currentTheme === 'ZEON'
                  ? 'border-yellow-600 bg-red-900/50 text-yellow-500 hover:bg-red-900'
                  : 'border-blue-500 bg-blue-900/20 text-blue-400 hover:bg-blue-900/40'
                  }`}
              >
                {currentTheme === 'ZEON' ? <Crosshair className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                <span className="text-xs font-bold">{currentTheme}</span>
              </button>
            )}

            {/* Pilot Profile Icon */}
            <button
              onClick={() => handleNavClick('PILOT')}
              className={`relative p-2 rounded-full group transition-colors ${currentTheme === 'ZEON' ? 'hover:bg-red-800' : 'bg-slate-800 hover:bg-gundam-blue'
                }`}
            >
              <User className={`h-6 w-6 ${currentView === 'PILOT' ? 'text-white' : 'text-slate-300'} group-hover:text-white`} />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => handleNavClick('WISHLIST')}
              className={`relative p-2 rounded-full group transition-colors ${currentTheme === 'ZEON' ? 'hover:bg-red-800' : 'bg-slate-800 hover:bg-gundam-red'
                }`}
            >
              <Heart className="h-6 w-6 text-slate-300 group-hover:text-white" />
            </button>

            {/* Cart Icon */}
            <button
              onClick={onOpenCart}
              className={`relative p-2 rounded-full group transition-colors ${currentTheme === 'ZEON' ? 'hover:bg-red-800' : 'bg-slate-800 hover:bg-gundam-blue'
                }`}
            >
              <ShoppingCart className="h-6 w-6 text-slate-300 group-hover:text-white" />
              {cartCount > 0 && (
                <span className={`absolute -top-1 -right-1 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg ${currentTheme === 'ZEON' ? 'bg-yellow-600' : 'bg-gundam-red'
                  }`}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden space-x-4">
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className={`p-2 rounded-full ${currentTheme === 'ZEON' ? 'text-yellow-500' : 'text-blue-400'}`}
              >
                {currentTheme === 'ZEON' ? <Crosshair className="h-6 w-6" /> : <Shield className="h-6 w-6" />}
              </button>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden border-b ${currentTheme === 'ZEON' ? 'bg-red-950 border-red-900' : 'bg-slate-900 border-slate-700'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.view)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${currentView === item.view
                  ? `text-white border-l-4 ${currentTheme === 'ZEON' ? 'bg-red-900 border-yellow-500' : 'bg-slate-800 border-gundam-red'}`
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('PILOT')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/10"
            >
              Pilot Profile
            </button>
            <button
              onClick={() => handleNavClick('WISHLIST')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/10"
            >
              My Hangar
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};