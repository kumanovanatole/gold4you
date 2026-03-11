import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Truck, Award, CheckCircle, Minus, Plus, ShoppingBag } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { goldBars } from '../data/products';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const bar = goldBars.find(b => b.id === id);

  if (!bar) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-24 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <button onClick={() => navigate('/shop')} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Back to Shop
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'EUR' }).format(price);
  };

  const pricePerGram = (bar.price / bar.weightGrams).toFixed(2);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate('/shop')}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Gold Bars
        </button>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Image */}
          <div className="flex-1">
            <div className="aspect-square bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl overflow-hidden border border-amber-100">
              <img
                src={bar.image}
                alt={`${bar.weight} Gold Bar`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-1 bg-amber-50 text-amber-700 rounded-full font-medium">{bar.certification} Certified</span>
              <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full font-medium">In Stock</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {bar.weight} Gold Bar
            </h1>
            <p className="text-sm text-gray-500 mb-6">{bar.manufacturer} · Fine Gold {bar.purity}</p>

            <div className="text-3xl font-bold text-gray-900 mb-1">
              {formatPrice(bar.price)}
            </div>
            <p className="text-sm text-gray-400 mb-6">
              €{pricePerGram}/g · Premium: {bar.premium}% over spot
            </p>

            <p className="text-sm text-gray-600 font-light leading-relaxed mb-8">
              {bar.description}
            </p>

            {/* Specifications */}
            <div className="border border-gray-100 rounded-xl divide-y divide-gray-100 mb-8">
              {[
                { label: 'Weight', value: bar.weight },
                { label: 'Purity', value: `${bar.purity} (24 Karat)` },
                { label: 'Dimensions', value: bar.dimensions },
                { label: 'Manufacturer', value: bar.manufacturer },
                { label: 'Certification', value: bar.certification },
              ].map((spec) => (
                <div key={spec.label} className="flex justify-between items-center px-4 py-3">
                  <span className="text-sm text-gray-500">{spec.label}</span>
                  <span className="text-sm font-medium text-gray-900">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm text-gray-600">Quantity</span>
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Minus className="w-4 h-4 text-gray-500" />
                </button>
                <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              <span className="text-sm text-gray-400 ml-auto">
                Total: <span className="font-semibold text-gray-900">{formatPrice(bar.price * quantity)}</span>
              </span>
            </div>

            {/* Buy Button */}
            <button
              className="w-full bg-gray-900 text-white py-4 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mb-4"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart · {formatPrice(bar.price * quantity)}
            </button>

            <p className="text-xs text-gray-400 text-center mb-8">
              Secure checkout · Price locked for 15 minutes
            </p>

            {/* Trust */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Shield, label: 'LBMA Certified' },
                { icon: Truck, label: 'Insured Delivery' },
                { icon: Award, label: '999.9 Fine Gold' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-10 h-10 mx-auto rounded-lg bg-gray-50 flex items-center justify-center mb-2">
                    <item.icon className="w-4 h-4 text-gray-500" />
                  </div>
                  <p className="text-xs text-gray-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 sm:mt-24">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Other Gold Bars</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {goldBars.filter(b => b.id !== bar.id).slice(0, 4).map((related) => (
              <button
                key={related.id}
                onClick={() => { navigate(`/product/${related.id}`); window.scrollTo(0, 0); }}
                className="group text-left bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <div className="aspect-square bg-gradient-to-br from-amber-50 to-yellow-50 p-4 flex items-center justify-center">
                  <img
                    src={related.image}
                    alt={`${related.weight} Gold Bar`}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">{related.weight} Gold Bar</h3>
                  <p className="text-sm font-bold text-gray-900">{formatPrice(related.price)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
