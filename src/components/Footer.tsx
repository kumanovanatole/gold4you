import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-50 border-t border-gray-200" style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 300 }}>
      <div className="px-4 sm:px-8 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:gap-16">

            {/* Brand Section */}
            <div className="mb-10 lg:mb-0 lg:w-72 flex-shrink-0">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                  <span className="text-amber-400 font-bold text-sm">Au</span>
                </div>
                <span className="text-gray-900 font-medium text-lg tracking-tight">Superiora</span>
              </div>
              <p className="text-sm text-gray-500 font-light leading-relaxed mb-4">
                Premium investment gold bars. LBMA certified, insured delivery worldwide. Your trusted partner for physical gold investment.
              </p>

              {/* Trust Badges */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-4 h-4" viewBox="0 0 24 24" fill="#eab308">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-500">Trustpilot</span>
              </div>

              {/* Payment Methods */}
              <div className="mb-5">
                <p className="text-xs text-gray-400 mb-2">We accept</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 bg-gray-100 rounded-md text-xs text-gray-600 font-medium">VISA</span>
                  <span className="px-2.5 py-1 bg-gray-100 rounded-md text-xs text-gray-600 font-medium">Mastercard</span>
                  <span className="px-2.5 py-1 bg-gray-100 rounded-md text-xs text-gray-600 font-medium">SEPA</span>
                  <span className="px-2.5 py-1 bg-gray-100 rounded-md text-xs text-gray-600 font-medium">BTC</span>
                  <span className="px-2.5 py-1 bg-gray-100 rounded-md text-xs text-gray-600 font-medium">ETH</span>
                </div>
              </div>

              {/* Social */}
              <div className="flex gap-2.5">
                <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-colors">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-colors">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a href="mailto:info@superioragold.com" className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-colors">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Menu Columns */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {/* Products */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">Products</h4>
                <div className="space-y-3">
                  <button onClick={() => navigate('/shop')} className="block text-sm text-gray-500 hover:text-gray-900 transition-colors text-left">All Gold Bars</button>
                  <button onClick={() => navigate('/shop?filter=small')} className="block text-sm text-gray-500 hover:text-gray-900 transition-colors text-left">1g - 10g</button>
                  <button onClick={() => navigate('/shop?filter=medium')} className="block text-sm text-gray-500 hover:text-gray-900 transition-colors text-left">20g - 100g</button>
                  <button onClick={() => navigate('/shop?filter=large')} className="block text-sm text-gray-500 hover:text-gray-900 transition-colors text-left">250g - 1kg</button>
                </div>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">Company</h4>
                <div className="space-y-3">
                  <button onClick={() => navigate('/about')} className="block text-sm text-gray-500 hover:text-gray-900 transition-colors text-left">About Us</button>
                  <button onClick={() => navigate('/contact')} className="block text-sm text-gray-500 hover:text-gray-900 transition-colors text-left">Contact</button>
                  <button onClick={() => navigate('/faq')} className="block text-sm text-gray-500 hover:text-gray-900 transition-colors text-left">FAQ</button>
                </div>
              </div>

              {/* Information */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">Information</h4>
                <div className="space-y-3">
                  <button onClick={() => navigate('/about')} className="block text-sm text-gray-500 hover:text-gray-900 transition-colors text-left">Shipping</button>
                  <button onClick={() => navigate('/about')} className="block text-sm text-gray-500 hover:text-gray-900 transition-colors text-left">Storage</button>
                  <button onClick={() => navigate('/about')} className="block text-sm text-gray-500 hover:text-gray-900 transition-colors text-left">Certification</button>
                </div>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">Legal</h4>
                <div className="space-y-3">
                  <button className="block text-sm text-gray-500 hover:text-gray-900 transition-colors text-left">Terms of Service</button>
                  <button className="block text-sm text-gray-500 hover:text-gray-900 transition-colors text-left">Privacy Policy</button>
                  <button className="block text-sm text-gray-500 hover:text-gray-900 transition-colors text-left">Cookie Policy</button>
                  <button className="block text-sm text-gray-500 hover:text-gray-900 transition-colors text-left">Imprint</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Contact Bar */}
      <div className="border-t border-gray-200 bg-white">
        <div className="px-4 sm:px-8 py-4">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs text-gray-500 text-center font-light">
              Gold Inquiries & Orders · <a href="mailto:info@superioragold.com" className="text-gray-700 hover:text-gray-900 transition-colors">info@superioragold.com</a> · Mon-Fri 9:00-18:00 CET
            </p>
          </div>
        </div>
      </div>

      {/* Company Info */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="px-4 sm:px-8 py-4">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs text-gray-500 text-center font-light">
              © 2026 Superiora Gold GmbH · Bahnhofstrasse 21 · 8001 Zürich · Switzerland
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
