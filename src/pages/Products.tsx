import { useEffect, useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, X, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/services/api';

const Products = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProducts(category)
      .then(res => setAllProducts(res.data))
      .catch(() => setAllProducts([]))
      .finally(() => setLoading(false));
  }, [category]);

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
  }, [category, searchQuery, selectedCategories, priceRange, sortBy, allProducts]);

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
          {loading ? (
            <div className="text-center py-16">
              <p className="text-gray-600 mb-4">Loading products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
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
