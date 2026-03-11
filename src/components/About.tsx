import { useNavigate } from 'react-router-dom';
import { Shield, Truck, Lock, Award, ArrowRight } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">About Superiora Gold</h1>
          <p className="text-base text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
            We are a Swiss-based precious metals dealer specializing in investment-grade gold bars.
            Our mission is to make physical gold investment accessible, transparent, and secure.
          </p>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[
            {
              icon: Shield,
              title: 'LBMA Certified',
              desc: 'We exclusively sell gold bars certified by the London Bullion Market Association (LBMA), the global standard for gold quality. Every bar is produced by accredited refiners including Argor-Heraeus, PAMP Suisse, and Heraeus.'
            },
            {
              icon: Truck,
              title: 'Insured Delivery',
              desc: 'Every shipment is fully insured from our vault to your doorstep. We use specialized precious metals logistics partners with armored transport and real-time tracking for complete peace of mind.'
            },
            {
              icon: Lock,
              title: 'Swiss Vault Storage',
              desc: 'For customers who prefer professional storage, we offer allocated vault storage in Switzerland. Your gold is held in your name, fully segregated, and audited quarterly by independent auditors.'
            },
            {
              icon: Award,
              title: 'Transparent Pricing',
              desc: 'Our prices are based on the live gold spot price with a clearly displayed premium. No hidden fees, no markups. You see exactly what you pay and why. Premium decreases with larger bars.'
            },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 p-6 sm:p-8">
              <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-5">
                <item.icon className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Choose Your Gold', desc: 'Browse our range from 1g to 1kg. Each bar is LBMA certified with clearly displayed pricing.' },
              { step: '02', title: 'Secure Checkout', desc: 'Complete your order with bank transfer, credit card, or cryptocurrency. Price is locked at checkout.' },
              { step: '03', title: 'Receive Your Gold', desc: 'Your gold is shipped insured within 2-5 business days. Or choose our Swiss vault storage option.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-4">
                  <span className="text-amber-700 font-bold text-sm">{item.step}</span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => navigate('/shop')}
            className="bg-gray-900 text-white px-8 py-3.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
          >
            Browse Gold Bars
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
