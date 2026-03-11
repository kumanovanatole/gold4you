import { useNavigate } from 'react-router-dom';
import { Shield, Truck, Award, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { goldBars } from '../data/products';

export default function Homepage() {
  const navigate = useNavigate();

  const featuredBars = goldBars.filter(b => ['10g', '25g', '100g', '1000g'].includes(b.id));

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'EUR' }).format(price);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-20 sm:py-32">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left: Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-xs text-amber-700 font-medium">Live Gold Price: €92.50/g</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-6">
                Invest in
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">
                  Physical Gold
                </span>
              </h1>

              <p className="text-lg text-gray-500 font-light leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                LBMA certified gold bars from 1g to 1kg. Swiss quality, insured worldwide delivery. The timeless store of value.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button
                  onClick={() => navigate('/shop')}
                  className="bg-gray-900 text-white px-8 py-3.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  Browse Gold Bars
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate('/about')}
                  className="bg-white text-gray-700 px-8 py-3.5 rounded-lg text-sm font-medium border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  How It Works
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 mt-10 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-gray-500">LBMA Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-gray-500">Insured Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-gray-500">Swiss Vault Storage</span>
                </div>
              </div>
            </div>

            {/* Right: Featured Gold Bar Image */}
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-3xl bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border border-amber-100 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&q=80"
                    alt="Gold bars"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Gold Price 24h</p>
                      <p className="text-sm font-semibold text-green-600">+1.24%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-gray-100 bg-gray-25">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'LBMA Certified', desc: 'London Bullion Market Assoc.' },
              { icon: Truck, title: 'Insured Delivery', desc: 'Fully insured worldwide' },
              { icon: Award, title: '999.9 Fine Gold', desc: 'Highest purity standard' },
              { icon: TrendingUp, title: 'Best Premiums', desc: 'Competitive pricing' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Popular Gold Bars</h2>
              <p className="text-sm text-gray-500">Our most purchased investment bars</p>
            </div>
            <button
              onClick={() => navigate('/shop')}
              className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredBars.map((bar) => (
              <button
                key={bar.id}
                onClick={() => navigate(`/product/${bar.id}`)}
                className="group text-left bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <div className="aspect-square bg-gradient-to-br from-amber-50 to-yellow-50 p-6 flex items-center justify-center">
                  <img
                    src={bar.image}
                    alt={`${bar.weight} Gold Bar`}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full font-medium">{bar.purity}</span>
                    <span className="text-xs text-gray-400">{bar.manufacturer}</span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    {bar.weight} Gold Bar
                  </h3>
                  <p className="text-lg font-bold text-gray-900">
                    {formatPrice(bar.price)}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Premium: {bar.premium}%
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="flex sm:hidden justify-center mt-8">
            <button
              onClick={() => navigate('/shop')}
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              View all gold bars <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Gold Section */}
      <section className="py-16 sm:py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Why Invest in Gold?</h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto">Gold has preserved wealth for thousands of years. It remains the ultimate hedge against inflation and economic uncertainty.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Inflation Hedge',
                desc: 'Gold historically maintains its purchasing power over long periods, protecting your wealth from currency devaluation.',
              },
              {
                title: 'Portfolio Diversification',
                desc: 'Gold has low correlation with stocks and bonds, providing true portfolio diversification and reducing overall risk.',
              },
              {
                title: 'Tangible Asset',
                desc: 'Unlike digital assets, physical gold cannot be hacked, frozen, or devalued by government policy. You hold real wealth.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 sm:p-8">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center mb-4">
                  <span className="text-amber-600 font-bold text-sm">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="bg-gray-900 rounded-2xl px-8 sm:px-16 py-12 sm:py-16 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Start Your Gold Investment Today
            </h2>
            <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
              From 1g to 1kg. LBMA certified, insured delivery. Secure your wealth with physical gold.
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-white text-gray-900 px-8 py-3.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              Browse Gold Bars
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
