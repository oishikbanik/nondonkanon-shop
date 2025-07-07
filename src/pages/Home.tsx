import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import ProductCard from '@/components/ProductCard';
import { Sparkles, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getProducts } from '@/services/api';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3; // Number of slides in heroImages

  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then(res => setFeaturedProducts(res.data.slice(0, 8))) // Show first 8 as featured
      .catch(() => setFeaturedProducts([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % totalSlides);
    }, 5000);  // Increased to 5 seconds to give more time for transitions

    return () => clearInterval(timer);
  }, [totalSlides]);

  const heroImages = [
    {
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&h=600&fit=crop',
      title: 'Exquisite Sarees',
      description: 'Traditional elegance meets modern style'
    },
    {
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&h=600&fit=crop',
      title: 'Premium Skincare',
      description: 'Nourish your skin with luxury'
    },
    {
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=600&fit=crop',
      title: 'Elegant Jewelry',
      description: 'Timeless pieces for every occasion'
    }
  ];

  const categories = [
    {
      name: 'Sarees',
      description: 'Traditional & Designer Collection',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=400&fit=crop',
      link: '/products/sarees'
    },
    {
      name: 'Skincare',
      description: 'Premium Beauty Solutions',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=400&fit=crop',
      link: '/products/skincare'
    },
    {
      name: 'Jewelry',
      description: 'Elegant Accessories',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop',
      link: '/products/jewelry'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Auto-sliding Carousel */}
      <section className="relative w-full h-[80vh]">
        <div className="slideshow-container">
          {heroImages.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ 
                backgroundImage: `url(${slide.image})`
              }}
            >
              <div className="dark-overlay" />
              <div className="relative h-full flex items-center justify-center">
                <div className="container mx-auto text-center text-white px-4">
                  <div className="flex items-center justify-center mb-5">
                    <Sparkles className="w-6 h-6 text-rose-400 mr-2" />
                    <span className="text-lg font-semibold text-rose-300">Nondonkanon</span>
                    <Sparkles className="w-6 h-6 text-rose-400 ml-2" />
                  </div>
                  <p className="hero-subtitle text-white text-lg font-semibold mb-5">
                    {slide.description}
                  </p>
                  <h1 className="hero-title text-4xl md:text-6xl font-bold mb-9 whitespace-nowrap mx-auto animate-fade-in">
                    {slide.title}
                  </h1>
                  <Button 
                    asChild 
                    size="lg" 
                    variant="secondary" 
                    className="bg-white text-gray-900 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-lg px-8 py-6"
                  >
                    <Link to="/products">
                      <Heart className="w-5 h-5 mr-2" />
                      Shop Now
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Dot indicators */}
          <div className="slideshow-dots">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated collections designed for the modern woman
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 shadow-lg hover:scale-105 transform">
                <CardContent className="p-0">
                  <Link to={category.link} className="block relative">
                    <div className="relative h-80 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 to-rose-900/90 group-hover:from-purple-900/95 group-hover:to-rose-900/95 transition-colors duration-300"></div>
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-center p-6">
                        <div className="text-white transform group-hover:scale-110 transition-transform duration-300">
                          <h3 className="text-3xl font-bold mb-3">{category.name}</h3>
                          <p className="text-lg opacity-90 mb-4">{category.description}</p>
                          <Button 
                            variant="secondary" 
                            size="lg" 
                            className="bg-white/30 backdrop-blur-sm border-white text-white hover:bg-white/40 transform hover:scale-105 transition-all duration-300 font-semibold"
                          >
                            Explore Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Handpicked favorites from our premium collection
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-2 border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4"
            >
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-20 bg-rose-600 text-white overflow-hidden relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Exclusive Offers
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Get up to 40% off on selected premium items. Limited time offer - Don't miss out!
            </p>
            <Button 
              asChild 
              size="lg" 
              variant="secondary" 
              className="bg-white text-gray-900 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-lg px-8 py-6"
            >
              <Link to="/products">
                <Heart className="w-5 h-5 mr-2" />
                Explore
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-500"></div>
      </section>
    </div>
  );
};

export default Home;
