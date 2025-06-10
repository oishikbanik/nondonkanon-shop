import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { state } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setIsAdmin(!!user.isAdmin);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchFocused(false);
    }
  };

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-md bg-white/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 bg-clip-text text-transparent">
              Nondonkanon
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-gray-700 hover:text-rose-600 transition-all duration-300 hover:scale-105 font-medium">
              All Products
            </Link>
            <Link to="/products/sarees" className="text-gray-700 hover:text-rose-600 transition-all duration-300 hover:scale-105 font-medium">
              Sarees
            </Link>
            <Link to="/products/skincare" className="text-gray-700 hover:text-rose-600 transition-all duration-300 hover:scale-105 font-medium">
              Skincare
            </Link>
            <Link to="/products/jewelry" className="text-gray-700 hover:text-rose-600 transition-all duration-300 hover:scale-105 font-medium">
              Jewelry
            </Link>
          </nav>

          {/* Enhanced Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-8">
            <div className={`relative flex-1 transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search for sarees, skincare, jewelry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="pl-10 border-2 border-gray-200 focus:border-rose-500 transition-all duration-300 rounded-full"
              />
            </div>
          </form>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {isAdmin && (
              <Link to="/admin">
                <Button variant="ghost" size="sm" className="hidden md:flex hover:scale-110 transition-transform duration-300">
                  <LayoutDashboard className="w-4 h-4" />
                </Button>
              </Link>
            )}
            <Link to="/profile">
              <Button variant="ghost" size="sm" className="hidden md:flex hover:scale-110 transition-transform duration-300">
                <User className="w-4 h-4" />
              </Button>
            </Link>
            
            <Link to="/cart" className="relative group">
              <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform duration-300">
                <ShoppingCart className="w-4 h-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden hover:scale-110 transition-transform duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </form>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col space-y-4">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center space-x-2 text-gray-700 hover:text-rose-600 px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Admin Panel</span>
                </Link>
              )}
              <Link
                to="/products"
                className="text-gray-700 hover:text-rose-600 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                All Products
              </Link>
              <Link
                to="/products/sarees"
                className="text-gray-700 hover:text-rose-600 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Sarees
              </Link>
              <Link
                to="/products/skincare"
                className="text-gray-700 hover:text-rose-600 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Skincare
              </Link>
              <Link
                to="/products/jewelry"
                className="text-gray-700 hover:text-rose-600 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Jewelry
              </Link>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-rose-600 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
