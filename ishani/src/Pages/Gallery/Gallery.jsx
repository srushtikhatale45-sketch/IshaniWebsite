import React, { useState, useEffect } from 'react';
import { FaStar, FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa';

function Gallery() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Using fetch with async/await
        const response = await fetch('https://fakestoreapi.com/products');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data);
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category
  const filteredProducts = products.filter(product => {
    if (categoryFilter === 'all') return true;
    return product.category === categoryFilter;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating.rate - a.rating.rate;
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Toggle favorite
  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  // Add to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.title} added to cart!`);
  };

  // Get unique categories
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Calculate stats
  const totalProducts = products.length;
  const totalFavorites = favorites.length;
  const totalCartItems = cart.length;

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-red-50 rounded-xl">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Product Gallery</h1>
          <p className="text-gray-600">Browse our collection of premium products</p>
          
          {/* Stats */}
          <div className="flex justify-center space-x-6 mt-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-blue-600">{totalProducts}</div>
              <div className="text-gray-600">Products</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-pink-600">{totalFavorites}</div>
              <div className="text-gray-600">Favorites</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-green-600">{totalCartItems}</div>
              <div className="text-gray-600">In Cart</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Filter by Category:</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                    className={`px-4 py-2 rounded-lg transition ${
                      categoryFilter === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Sort by:</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border group"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden h-56">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                  }}
                />
                
                {/* Action Buttons */}
                <div className="absolute top-3 right-3 space-y-2">
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className={`p-2 rounded-full shadow-md transition ${
                      favorites.includes(product.id)
                        ? 'bg-pink-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-pink-50'
                    }`}
                    title={favorites.includes(product.id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <FaHeart />
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    className="p-2 bg-white rounded-full shadow-md text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
                    title="Add to cart"
                  >
                    <FaShoppingCart />
                  </button>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="p-2 bg-white rounded-full shadow-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                    title="View details"
                  >
                    <FaEye />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    {product.category}
                  </span>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="font-semibold">{product.rating.rate}</span>
                    <span className="text-gray-500 text-sm ml-1">
                      ({product.rating.count})
                    </span>
                  </div>
                </div>
                
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">
                  {product.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🛍️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}

        {/* Product Count */}
        <div className="mt-8 text-center text-gray-600">
          Showing {sortedProducts.length} of {products.length} products
        </div>

        {/* Product Details Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.title}</h2>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    &times;
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.title}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <div className="mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                        {selectedProduct.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`${
                              i < Math.floor(selectedProduct.rating.rate)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            } mr-1`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 font-semibold">
                        {selectedProduct.rating.rate} ({selectedProduct.rating.count} reviews)
                      </span>
                    </div>
                    
                    <p className="text-3xl font-bold text-gray-900 mb-6">
                      ${selectedProduct?.price.toFixed(2)}
                    </p>
                    
                    <p className="text-gray-700 mb-8">{selectedProduct.description}</p>
                    
                    <div className="space-y-4">
                      <button
                        onClick={() => {
                          addToCart(selectedProduct);
                          setSelectedProduct(null);
                        }}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                      >
                        Add to Cart
                      </button>
                      
                      <button
                        onClick={() => {
                          toggleFavorite(selectedProduct.id);
                          setSelectedProduct(null);
                        }}
                        className={`w-full py-3 rounded-lg transition font-medium ${
                          favorites.includes(selectedProduct.id)
                            ? 'bg-pink-600 text-white hover:bg-pink-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {favorites.includes(selectedProduct.id)
                          ? 'Remove from Favorites'
                          : 'Add to Favorites'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Gallery;