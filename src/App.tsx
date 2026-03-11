import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Shop from './components/Shop';
import ProductDetail from './components/ProductDetail';
import About from './components/About';
import Contact from './components/Contact';
import FAQ from './components/FAQ';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
    </Routes>
  );
}
