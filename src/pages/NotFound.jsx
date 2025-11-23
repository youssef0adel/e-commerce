import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-content">
          <div className="error-animation">
            <div className="error-number">4</div>
            <div className="error-icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <div className="error-number">4</div>
          </div>
          <div className="error-content">
            <h1 className="error-title">Oops! Page Not Found</h1>
            <p className="error-description">
              The page you're looking for seems to have wandered off. 
              Maybe it's shopping for something special?
            </p>
            <div className="error-actions">
              <Link to="/" className="btn btn-primary btn-lg home-btn">
                <i className="fas fa-home me-2"></i>
                Back to Home
              </Link>
              <Link to="/shop" className="btn btn-outline-primary btn-lg shop-btn">
                <i className="fas fa-shopping-bag me-2"></i>
                Continue Shopping
              </Link>
            </div>
            <div className="search-suggestion">
              <p className="suggestion-text">
                Or try searching for what you need:
              </p>
              <Link to="/shop" className="search-link">
                <i className="fas fa-search me-2"></i>
                Browse All Products
              </Link>
            </div>
          </div>
          <div className="decoration">
            <div className="floating-item item-1">
              <i className="fas fa-tshirt"></i>
            </div>
            <div className="floating-item item-2">
              <i className="fas fa-laptop"></i>
            </div>
            <div className="floating-item item-3">
              <i className="fas fa-shoe-prints"></i>
            </div>
            <div className="floating-item item-4">
              <i className="fas fa-clock"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}