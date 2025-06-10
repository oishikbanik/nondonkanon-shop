
import { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, X, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import ProductCard from '@/components/ProductCard';

const Products = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Enhanced product data with realistic content
  const allProducts = [
    // Sarees
    { id: '1', name: 'Royal Silk Banarasi Saree', price: 4599, originalPrice: 6999, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop', category: 'sarees', rating: 4.8, isBestSeller: true, stock: 5 },
    { id: '2', name: 'Designer Georgette Saree', price: 3299, originalPrice: 4799, image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop', category: 'sarees', rating: 4.9, isTrending: true, stock: 8 },
    { id: '3', name: 'Cotton Handloom Saree', price: 1899, image: 'https://images.unsplash.com/photo-1594736797933-d0808ba62ac6?w=400&h=400&fit=crop', category: 'sarees', rating: 4.5, isNew: true, stock: 12 },
    { id: '4', name: 'Chiffon Printed Saree', price: 2499, originalPrice: 3299, image: 'https://images.unsplash.com/photo-1610030469749-c7de640bc36a?w=400&h=400&fit=crop', category: 'sarees', rating: 4.6, stock: 7 },
    
    // Skincare
    { id: '5', name: 'Vitamin C Brightening Serum', price: 1899, originalPrice: 2499, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop', category: 'skincare', rating: 4.6, isNew: true, stock: 15 },
    { id: '6', name: 'Retinol Night Cream', price: 2299, image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=400&fit=crop', category: 'skincare', rating: 4.7, isBestSeller: true, stock: 10 },
    { id: '7', name: 'Hyaluronic Acid Moisturizer', price: 1599, originalPrice: 2199, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop', category: 'skincare', rating: 4.8, stock: 20 },
    { id: '8', name: 'Niacinamide Face Serum', price: 1299, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop', category: 'skincare', rating: 4.5, isTrending: true, stock: 18 },
    
    // Jewelry
    { id: '9', name: 'Gold Plated Kundan Earrings', price: 2299, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop', category: 'jewelry', rating: 4.7, isTrending: true, stock: 8 },
    { id: '10', name: 'Silver Pearl Necklace Set', price: 3499, originalPrice: 4999, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop', category: 'jewelry', rating: 4.9, isBestSeller: true, stock: 5 },
    { id: '11', name: 'Traditional Jhumka Earrings', price: 1799, image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop', category: 'jewelry', rating: 4.6, stock: 12 },
    { id: '12', name: 'Diamond-cut Bangles Set', price: 2899, originalPrice: 3999, image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop', category: 'jewelry', rating: 4.8, isNew: true, stock: 6 },
  ];

  const categories = ['sarees', 'skincare', 'jewelry'];

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by category from URL
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    // Filter by search query (enhanced search)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    // Filter by price range
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        // Keep original order for 'featured'
        break;
    }

    return filtered;
  }, [category, searchQuery, selectedCategories, priceRange, sortBy]);

  const handleCategoryChange = (categoryName: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryName]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== categoryName));
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 10000]);
    setSortBy('featured');
  };

  const getPageTitle = () => {
    if (searchQuery) return `Search results for "${searchQuery}"`;
    if (category) return `${category.charAt(0).toUpperCase() + category.slice(1)}`;
    return 'All Products';
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            {getPageTitle()}
          </h1>
          <p className="text-gray-600 text-lg">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden hover:scale-105 transition-transform duration-300"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex border rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="transition-all duration-300"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="transition-all duration-300"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-56 hover:scale-105 transition-transform duration-300">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="name">Name: A to Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Enhanced Filters Sidebar */}
        <div className={`lg:w-72 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <Card className="sticky top-24 shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900 text-xl">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-rose-600 hover:text-rose-700 hover:scale-105 transition-all duration-300"
                >
                  Clear All
                </Button>
              </div>

              {/* Categories */}
              {!category && (
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4 text-lg">Categories</h4>
                  <div className="space-y-3">
                    {categories.map((cat) => (
                      <div key={cat} className="flex items-center space-x-3 group">
                        <Checkbox
                          id={cat}
                          checked={selectedCategories.includes(cat)}
                          onCheckedChange={(checked) => 
                            handleCategoryChange(cat, checked as boolean)
                          }
                          className="group-hover:scale-110 transition-transform duration-300"
                        />
                        <label
                          htmlFor={cat}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize cursor-pointer group-hover:text-rose-600 transition-colors duration-300"
                        >
                          {cat}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-4 text-lg">Price Range</h4>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={10000}
                    min={0}
                    step={100}
                    className="mb-6"
                  />
                  <div className="flex justify-between text-sm text-gray-600 font-medium">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Mobile Close Button */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(false)}
                className="w-full lg:hidden hover:scale-105 transition-transform duration-300"
              >
                <X className="w-4 h-4 mr-2" />
                Close Filters
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="animate-fade-in" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <div className="text-gray-400 mb-6">
                <Filter className="w-20 h-20 mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No products found</h3>
              <p className="text-gray-600 mb-6 text-lg">
                Try adjusting your filters or search terms
              </p>
              <Button onClick={clearFilters} variant="outline" size="lg" className="hover:scale-105 transition-transform duration-300">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
