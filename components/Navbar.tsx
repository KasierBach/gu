import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Sun, Moon, User as UserIcon, LogOut } from 'lucide-react';
import { ViewState, Theme } from '../types';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  cartCount: number;
  onOpenCart: () => void;
  currentTheme: Theme;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  cartCount,
  onOpenCart,
  currentTheme,
  onToggleTheme
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const isZeon = currentTheme === 'ZEON';

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
    <nav className={`sticky top-0 z-50 backdrop-blur-md border-b shadow-lg transition-colors duration-300 ${isZeon
      ? 'bg-zinc-950/80 border-red-900 shadow-red-900/10'
      : 'bg-slate-950/80 border-slate-700 shadow-blue-500/10'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavClick('HOME')}>
            <div className={`relative w-10 h-10 flex items-center justify-center transform group-hover:rotate-180 transition-transform duration-700`}>
              {isZeon ? (
                <div className="w-8 h-8 bg-yellow-500 [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] shadow-[0_0_15px_rgba(234,179,8,0.6)]" />
              ) : (
                <div className="w-8 h-8 bg-gundam-blue [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-2xl tracking-tighter text-white italic leading-none">
                GUNDAM
                <span className={isZeon ? 'text-yellow-500' : 'text-gundam-blue'}>UNIVERSE</span>
              </span>
              <span className="text-[10px] tracking-[0.3em] text-slate-400 font-bold uppercase">Ms-Factory // Ref-78</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.view)}
                  className={`px-4 py-2 rounded-sm text-sm font-bold uppercase tracking-wider transition-all duration-300 relative group overflow-hidden ${currentView === item.view
                    ? 'text-white bg-white/10'
                    : 'text-slate-400 hover:text-white'
                    }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {/* Hover scan effect */}
                  <div className={`absolute bottom-0 left-0 w-full h-[2px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${isZeon ? 'bg-yellow-500' : 'bg-gundam-blue'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={onToggleTheme}
              className={`flex items-center gap-2 text-sm font-bold uppercase border px-3 py-1 bg-opacity-20 backdrop-blur-sm transition-all hover:bg-opacity-40 ${isZeon
                ? 'border-yellow-500 text-yellow-500 bg-yellow-900 dashed'
                : 'border-gundam-blue text-cyan-400 bg-blue-900 dashed'
                }`}
            >
              {isZeon ? <div className='flex items-center gap-2'><Moon size={14} /> <span>Zeon</span></div> : <div className='flex items-center gap-2'><Sun size={14} /> <span>EFSF</span></div>}
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onNavigate('PILOT')}
                  className="group relative"
                  title="Pilot Profile"
                >
                  <UserIcon className={`w-6 h-6 transition-colors ${currentView === 'PILOT'
                    ? (isZeon ? 'text-yellow-500' : 'text-cyan-400')
                    : 'text-slate-400 group-hover:text-white'
                    }`} />
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-white">
                    {user.name}
                  </span>
                </button>
                <button
                  onClick={logout}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4 text-sm font-bold">
                <button
                  onClick={() => onNavigate('LOGIN')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  LOGIN
                </button>
                <button
                  onClick={() => onNavigate('REGISTER')}
                  className={`px-3 py-1 ${isZeon ? 'bg-red-700 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-500'} text-white rounded skew-x-[-10deg]`}
                >
                  <span className="skew-x-[10deg] block">JOIN</span>
                </button>
              </div>
            )}

            <button
              onClick={onOpenCart}
              className={`relative p-2 transition-colors ${isZeon ? 'text-yellow-500 hover:text-white' : 'text-cyan-400 hover:text-white'}`}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className={`absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white rounded-full ${isZeon ? 'bg-red-600' : 'bg-blue-600'}`}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={onOpenCart}
              className={`relative p-2 ${isZeon ? 'text-yellow-500' : 'text-cyan-400'}`}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.view)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${currentView === item.view
                  ? 'text-white bg-slate-800'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-slate-800 my-2 pt-2">
              {user ? (
                <>
                  <button
                    onClick={() => {
                      onNavigate('PILOT');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 text-lg font-display text-slate-400 hover:text-white px-3"
                  >
                    Pilot Profile
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 text-lg font-display text-red-500 hover:text-red-400 px-3"
                  >
                    System Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      onNavigate('LOGIN');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 text-lg font-display text-slate-400 hover:text-white px-3"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('REGISTER');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left py-2 text-lg font-display ${isZeon ? 'text-yellow-500' : 'text-cyan-400'} px-3`}
                  >
                    Enlist Now
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};