
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full"></div>
              <span className="text-xl font-bold">Elegance</span>
            </div>
            <p className="text-gray-400">
              Your destination for beautiful sarees, premium skincare, and elegant jewelry.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <div className="space-y-2">
              <Link to="/products/sarees" className="block text-gray-400 hover:text-white transition-colors">
                Sarees
              </Link>
              <Link to="/products/skincare" className="block text-gray-400 hover:text-white transition-colors">
                Skincare
              </Link>
              <Link to="/products/jewelry" className="block text-gray-400 hover:text-white transition-colors">
                Jewelry
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <div className="space-y-2">
              <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors">
                Contact Us
              </Link>
              <Link to="/shipping" className="block text-gray-400 hover:text-white transition-colors">
                Shipping Info
              </Link>
              <Link to="/returns" className="block text-gray-400 hover:text-white transition-colors">
                Returns
              </Link>
              <Link to="/faq" className="block text-gray-400 hover:text-white transition-colors">
                FAQ
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400">
              <p>📞 +91 98765 43210</p>
              <p>📧 hello@elegance.com</p>
              <p>📍 Mumbai, India</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Elegance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
