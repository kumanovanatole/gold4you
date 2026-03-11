import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What does LBMA certified mean?',
    answer: 'LBMA stands for London Bullion Market Association. It is the international standard for gold quality. All our gold bars are produced by LBMA-accredited refiners such as Argor-Heraeus, PAMP Suisse, and Heraeus, guaranteeing 999.9 fine gold purity.',
  },
  {
    question: 'How is my gold delivered?',
    answer: 'All gold bars are shipped via insured, specialized precious metals logistics. Packages are discreetly labeled with no indication of contents. Delivery typically takes 2-5 business days within Europe and 5-10 days worldwide.',
  },
  {
    question: 'Can I store my gold with you?',
    answer: 'Yes, we offer allocated vault storage in Switzerland. Your gold is held in your name, fully segregated from other holdings, and audited quarterly by independent auditors. Storage fees are competitive and transparent.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept bank transfer (SEPA), credit/debit cards (Visa, Mastercard), and cryptocurrency (Bitcoin, Ethereum). For orders over €10,000, bank transfer is preferred.',
  },
  {
    question: 'Is gold investment VAT-free?',
    answer: 'Investment gold (bars and coins meeting certain criteria) is VAT-exempt in the European Union and Switzerland. All our gold bars qualify as investment gold and are sold VAT-free.',
  },
  {
    question: 'What is the premium over spot price?',
    answer: 'The premium is the markup over the live gold spot price, covering manufacturing, certification, and distribution costs. Smaller bars have higher premiums (2-8%) while larger bars have very low premiums (below 0.1% for 1kg bars).',
  },
  {
    question: 'Can I sell my gold back to you?',
    answer: 'Yes, we offer a buyback program for all LBMA certified gold bars. The buyback price is based on the current gold spot price minus a small handling fee. Contact us for a quote.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship worldwide with full insurance. Shipping costs depend on the destination and order value. Free insured shipping is available for orders over €5,000 within the EU and Switzerland.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-base text-gray-500 font-light">
            Everything you need to know about buying gold bars.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-gray-900 pr-4">{faq.question}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-200 ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="px-5 pb-4 text-sm text-gray-500 font-light leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
