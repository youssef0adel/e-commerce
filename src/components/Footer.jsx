import React from 'react';
export default function Footer() {
  return (
       <footer className="footer-section bg-dark text-white py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <h5 className="footer-brand">E-Commerce</h5>
              <p className="footer-desc">
                Your one-stop destination for quality products and exceptional shopping experience.
              </p>
              <div className="social-links">
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
            <div className="col-lg-2 col-6">
              <h6>Quick Links</h6>
              <ul className="footer-links">
                <li><a href="/">Home</a></li>
                <li><a href="/shop">Shop</a></li>
                <li><a href="/about">About</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-6">
              <h6>Categories</h6>
              <ul className="footer-links">
                <li><a href="/shop?category=clothes">Clothes</a></li>
                <li><a href="/shop?category=electronics">Electronics</a></li>
                <li><a href="/shop?category=furniture">Furniture</a></li>
                <li><a href="/shop?category=shoes">Shoes</a></li>
              </ul>
            </div>
            <div className="col-lg-4">
              <h6>Contact Info</h6>
              <div className="contact-info">
                <p><i className="fas fa-map-marker-alt me-2"></i> Beni Suef</p>
                <p><i className="fas fa-phone me-2"></i> 010000020</p>
                <p><i className="fas fa-envelope me-2"></i> YATAMA@gmail.com</p>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <div className="footer-bottom text-center">
            <p className="mb-0">© 2025 E-Commerce. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
}
