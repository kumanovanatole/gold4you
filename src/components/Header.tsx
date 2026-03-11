import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Info, Menu, X } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActivePage = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/shop', label: 'Gold Bars' },
    { path: '/about', label: 'About' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <div className="sticky top-0 z-[100] w-full bg-white/50 backdrop-blur-xl border-b border-gray-200/30">
      <header className="px-4 sm:px-8 py-2 sm:py-3 flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <button onClick={() => navigate('/')} className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-amber-400 font-bold text-sm sm:text-base">Au</span>
            </div>
            <span className="text-gray-900 font-medium text-base sm:text-lg tracking-tight">
              Superiora
            </span>
          </button>
        </div>

        <div className="hidden md:block flex-1" />

        {/* Right Side Actions */}
        <div className="flex items-center gap-2" ref={menuRef}>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2 flex-row-reverse">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-9 h-9 bg-gray-200 text-gray-600 rounded-md flex items-center justify-center hover:bg-gray-300 transition-all duration-200"
            >
              <div className={`text-lg font-light transition-transform duration-300 ${isMenuOpen ? 'rotate-45' : ''}`}>
                +
              </div>
            </button>

            <div className={`flex items-center gap-1 overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-w-[500px] opacity-100' : 'max-w-0 opacity-0'}`}>
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => { navigate(item.path); setIsMenuOpen(false); }}
                  className={`px-3 py-1.5 text-xs rounded-full whitespace-nowrap transition-all duration-200 border flex items-center gap-1.5 ${
                    isActivePage(item.path)
                      ? 'text-gray-900 font-medium bg-gray-100 border-gray-300'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-9 h-9 bg-gray-200 text-gray-600 rounded-md flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Info Button */}
          <button
            onClick={() => navigate('/faq')}
            className="w-9 h-9 bg-gray-200 text-gray-600 rounded-md flex items-center justify-center hover:bg-gray-300 transition-colors"
            title="FAQ"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Shop CTA */}
          <button
            onClick={() => navigate('/shop')}
            className="bg-gray-900 text-white px-3 sm:px-5 py-2 rounded-md text-xs sm:text-sm hover:bg-gray-800 transition-colors"
          >
            Shop Gold
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="flex flex-col px-4 pb-4 bg-white/95 backdrop-blur-md border-t border-gray-100">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => { navigate(item.path); setIsMobileMenuOpen(false); }}
              className={`px-4 py-3 text-sm text-left border-b border-gray-100 last:border-b-0 transition-colors ${
                isActivePage(item.path)
                  ? 'text-gray-900 font-medium bg-gray-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
