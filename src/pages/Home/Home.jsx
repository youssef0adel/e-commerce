import "../Home/Home.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../services/api";
import { useCart } from "../../contexts/CartContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchData = async () => {
      try 
      {
        setLoading(true);
        const productsData = await apiService.getProducts({ limit: 8, offset: 0 });
        setProducts(productsData);
        const categoriesData = await apiService.getCategoriesFromProducts();
        setCategories(categoriesData.slice(0, 4));
      } 
      catch (err) 
      {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (categorySlug) => {
    navigate(`/shop?category=${categorySlug}`);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star text-warning"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-warning"></i>);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star text-warning"></i>);
    }

    return stars;
  };

  const categoryIcons = {
    'clothes': 'fa-solid fa-shirt',
    'electronics': 'fa-solid fa-laptop',
    'furniture': 'fa-solid fa-couch',
    'shoes': 'fa-solid fa-shoe-prints',
    'others': 'fa-solid fa-gift'
  };

  const getCategoryIcon = (slug) => {
    return categoryIcons[slug];
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">E-commerce <span className="highlight">Perfect Solution</span></h1>
            <p className="hero-subtitle">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet repellendus temporibus tempore aperiam? Corrupti, aperiam.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/shop')}>
                <i className="fas fa-shopping-bag me-2"></i>Shop Now
              </button>
              <button className="btn btn-outline-light btn-lg" onClick={() => navigate('/shop')}>
                <i className="fas fa-eye me-2"></i>
                Browse Collection
              </button>
            </div>
            <div className="hero-features">
              <div className="feature">
                <i className="fas fa-shipping-fast"></i>
                <span>Free Shipping</span>
              </div>
              <div className="feature">
                <i className="fas fa-shield-alt"></i>
                <span>Secure Payment</span>
              </div>
              <div className="feature">
                <i className="fas fa-undo"></i>
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="categories-section py-5">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 className="section-title">Shop By Category</h2>
            <p className="section-subtitle">Explore our wide range of products</p>
          </div>
          <div className="row g-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="col-md-6 col-lg-3">
                  <div className="category-card loading">
                    <div className="category-icon placeholder"></div>
                    <div className="category-name placeholder"></div>
                  </div>
                </div>
              ))
            ) : (
              categories.map((category) => (
                <div key={category.slug} className="col-md-6 col-lg-3">
                  <div className="category-card" onClick={() => handleCategoryClick(category.slug)}>
                    <div className="category-icon">
                      <i className={`${getCategoryIcon(category.slug)}`}></i>
                    </div>
                    <div className="category-content">
                      <h5 className="category-name">{category.name}</h5>
                      <p className="category-desc">Explore collection</p>
                      <div className="category-arrow">
                        <i className="fas fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      <section className="best-sellers-section py-5 bg-light">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 className="section-title">Best Sellers</h2>
            <p className="section-subtitle">Most loved products by our customers</p>
          </div>
          <div className="row g-4">
            {loading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="col-sm-6 col-md-4 col-lg-3">
                  <div className="product-card loading">
                    <div className="product-image placeholder"></div>
                    <div className="product-info">
                      <div className="product-title placeholder"></div>
                      <div className="product-price placeholder"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="col-sm-6 col-md-4 col-lg-3">
                  <div className="product-card">
                    <div className="product-image" onClick={() => handleProductClick(product._id)}>
                      <img src={product.images?.[0]} alt={product.title}/>
                      <div className="product-overlay">
                        <button className="btn btn-primary btn-sm">Quick View</button>
                      </div>
                    </div>
                    <div className="product-info">
                      <h6 className="product-title" onClick={() => handleProductClick(product._id)}>{product.title}</h6>
                      {product.rating && (
                        <div className="product-rating">
                          <div className="stars">
                            {renderStars(product.rating.rate)}
                          </div>
                          <h6 className="rating-count">({product.rating.count})</h6>
                        </div>
                      )}
                      
                      <div className="product-meta">
                        <span className="product-price">${product.price}</span>
                        <button className="btn btn-outline-primary btn-sm" onClick={() => addToCart(product)}>
                          <i className="fas fa-cart-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <i className="fas fa-box-open fa-3x text-muted mb-3"></i>
                <h5>No products found</h5>
              </div>
            )}
          </div>
          <div className="text-center mt-5">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/shop')}>
              <i className="fas fa-store me-2"></i>
              View All Products
            </button>
          </div>
        </div>
      </section>
      <section className="features-section py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card text-center">
                <div className="feature-icon">
                  <i className="fas fa-truck"></i>
                </div>
                <h5>Fast Delivery</h5>
                <p>Free shipping on orders over $50. Delivery within 2-3 business days.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card text-center">
                <div className="feature-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h5>Secure Payment</h5>
                <p>Your payments are safe with our encrypted payment system.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card text-center">
                <div className="feature-icon">
                  <i className="fas fa-headset"></i>
                </div>
                <h5>24/7 Support</h5>
                <p>Get help anytime with our round-the-clock customer support.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="newsletter-section py-5 bg-primary text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h3 className="newsletter-title">Stay Updated</h3>
              <p className="newsletter-subtitle">
                Subscribe to our newsletter and get exclusive deals and new product alerts.
              </p>
            </div>
            <div className="col-lg-6">
              <form className="newsletter-form">
                <div className="input-group">
                  <input 
                    type="email" 
                    className="form-control form-control-lg" 
                    placeholder="Enter your email address"
                    required
                  />
                  <button className="btn btn-light btn-lg" type="submit">
                    Subscribe
                  </button>
                </div>
                <h6 className="form-text">
                  We respect your privacy. Unsubscribe at any time.
                </h6>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}