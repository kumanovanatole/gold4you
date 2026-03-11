import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { goldBars } from '../data/products';

type FilterType = 'all' | 'small' | 'medium' | 'large';

export default function Shop() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialFilter = (searchParams.get('filter') as FilterType) || 'all';
  const [filter, setFilter] = useState<FilterType>(initialFilter);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'EUR' }).format(price);
  };

  const filteredBars = goldBars.filter((bar) => {
    if (filter === 'small') return bar.weightGrams <= 10;
    if (filter === 'medium') return bar.weightGrams >= 20 && bar.weightGrams <= 100;
    if (filter === 'large') return bar.weightGrams >= 250;
    return true;
  });

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'small', label: '1g - 10g' },
    { key: 'medium', label: '20g - 100g' },
    { key: 'large', label: '250g - 1kg' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Gold Bars</h1>
          <p className="text-sm text-gray-500">LBMA certified investment gold bars. All prices include premium over spot.</p>
        </div>

        {/* Live Price Banner */}
        <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 border border-amber-100 rounded-xl mb-8">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-sm text-amber-800">
            Live Gold Spot Price: <span className="font-semibold">€92.50/g</span> · Updated just now
          </span>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-1">
          <SlidersHorizontal className="w-4 h-4 text-gray-400 flex-shrink-0" />
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 text-xs rounded-full whitespace-nowrap transition-all border ${
                filter === f.key
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="text-xs text-gray-400 ml-auto flex-shrink-0">
            {filteredBars.length} product{filteredBars.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredBars.map((bar) => (
            <button
              key={bar.id}
              onClick={() => navigate(`/product/${bar.id}`)}
              className="group text-left bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              <div className="aspect-square bg-gradient-to-br from-amber-50 to-yellow-50 p-4 sm:p-6 flex items-center justify-center relative">
                <img
                  src={bar.image}
                  alt={`${bar.weight} Gold Bar`}
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                {bar.premium < 0.1 && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-[10px] font-medium rounded-full">
                    Best Value
                  </div>
                )}
              </div>
              <div className="p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full font-medium">{bar.purity}</span>
                  <span className="text-[10px] sm:text-xs text-gray-400">{bar.manufacturer}</span>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                  {bar.weight} Gold Bar
                </h3>
                <p className="text-base sm:text-lg font-bold text-gray-900">
                  {formatPrice(bar.price)}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-[10px] sm:text-xs text-gray-400">
                    Premium: {bar.premium}%
                  </p>
                  <p className="text-[10px] sm:text-xs text-green-600 font-medium">
                    In Stock
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
