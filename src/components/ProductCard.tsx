
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
  originalPrice?: number;
  isNew?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { dispatch } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      },
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const getDiscountPercentage = () => {
    if (product.originalPrice && product.originalPrice > product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 shadow-lg hover:scale-105 transform h-full flex flex-col">
      <Link to={`/product/${product.id}`} className="flex-1 flex flex-col">
        <CardContent className="p-0 relative flex-1 flex flex-col">
          <div className="relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Product Labels */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isNew && (
                <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  NEW
                </span>
              )}
              {product.isTrending && (
                <span className="bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  TRENDING
                </span>
              )}
              {product.isBestSeller && (
                <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  BESTSELLER
                </span>
              )}
            </div>

            {/* Discount Badge */}
            {getDiscountPercentage() > 0 && (
              <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                -{getDiscountPercentage()}%
              </div>
            )}

            {/* Category Tag */}
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700 capitalize">
              {product.category}
            </div>
          </div>
          
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="font-semibold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors duration-300 line-clamp-2 h-12">
              {product.name}
            </h3>
            
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-1 mb-2 min-h-[20px]">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating!)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600">({product.rating})</span>
              </div>
            )}
            
            {/* Price - Push to bottom with flex */}
            <div className="flex items-center gap-2 mt-auto">
              <span className="text-xl font-bold text-rose-600">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Link>
      
      <CardFooter className="pt-0 pb-5 px-5">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
