import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useCart } from "../contexts/CartContext"; 
import { apiService } from "../services/api";
import "../pages/ProductDetails.css"
export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); 
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  const renderStars = (rating) => 
  {
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

  useEffect(() => 
    {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await apiService.getProductById(id);
        setProduct(data);
        if (data.category) {
          const allProducts = await apiService.getProducts();
          const filtered = allProducts
            .filter(p => p.category?._id === data.category?._id && p._id !== data._id)
            .slice(0, 4);
          setRelated(filtered);
        }

      } 
      catch (error) 
      {
        console.log("Error fetching product:", error);
      } 
      finally 
      {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleRelatedProductClick = (productId) => 
    {
    navigate(`/product/${productId}`);
    window.scrollTo(0, 0);
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center py-5">
        <Loader />
      </div>
    );

  if (!product) return <div className="alert alert-warning">Product not found</div>;

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-md-6">
          <div className="main-image mb-3">
            <img
              src={product.images?.[selectedImage]}
              alt={product.title}
              className="main-img rounded-4 shadow-sm w-100"/>
          </div>
          {product.images && product.images.length > 1 && (
            <div className="thumbnail-images d-flex gap-2">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className={`img-thumbnail cursor-pointer ${selectedImage === index ? 'border-primary' : ''}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          )}
        </div>
        <div className="col-md-6">
          <h1 className="h2 fw-bold">{product.title}</h1>
          {product.rating && (
            <div className="mb-3">
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="d-flex align-items-center gap-1">
                  {renderStars(product.rating.rate)}
                </div>
                <span className="text-muted">
                  {product.rating.rate} out of 5
                </span>
              </div>
              <small className="text-muted">
                ({product.rating.count} customer reviews)
              </small>
            </div>
          )}
          <h2 className="text-primary fw-bold mb-3">${Number(product.price).toFixed(2)}</h2>
          {product.category && (
            <p className="text-muted mb-3">
              Category: <span className="badge bg-secondary">{product.category.name}</span>
            </p>
          )}
          <p className="lead mb-4">{product.description}</p>
          <div className="my-4">
            <button
              className="btn btn-primary px-4 py-2 w-100 "
              onClick={() => addToCart(product)} 
            >
              <i className="fas fa-shopping-cart me-2"></i>
              Add to Cart
            </button>
          </div>
          <div className="product-features">
            <h5 className="mb-3">Product Features</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <i className="fas fa-check text-success me-2"></i>Free shipping on orders over $50
              </li>
              <li className="mb-2">
                <i className="fas fa-check text-success me-2"></i>30-day return policy</li>
              <li className="mb-2">
                <i className="fas fa-check text-success me-2"></i>Secure payment
              </li>
            </ul>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <div className="mt-5 pt-5 border-top">
          <h3 className="mb-4">Related Products</h3>
          <div className="row g-4">
            {related.map((r) => (
              <div key={r._id} className="col-md-3">
                <div className="card h-100 shadow-sm cursor-pointer overflow-hidden rounded-3" onClick={() => handleRelatedProductClick(r._id)}
                  style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <img src={r.images?.[0]} alt={r.title} className="realated-img "/>
                  <div className="card-body">
                    <h6 className="card-title">{r.title}</h6>
                    {r.rating && (
                      <div className="mb-2">
                        <div className="d-flex align-items-center gap-1">
                          {renderStars(r.rating.rate)}
                          <h6 className="text-muted ms-1">
                            ({r.rating.count})
                          </h6>
                        </div>
                      </div>
                    )}
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="text-primary">${Number(r.price).toFixed(2)}</h5>
                      <button className="btn btn-sm btn-outline-primary" onClick={(e) => {e.stopPropagation();addToCart(r);}}>Add</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}