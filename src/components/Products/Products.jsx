import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Sidebar from "../Filters/Sidebar";
import "../Products/Products.css";
import { useCart } from "../../contexts/CartContext";
import { apiService } from "../../services/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState({ min: null, max: null });
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const perPage = 12;

  const navigate = useNavigate();
  const { addToCart } = useCart();


  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star text-warning small"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-warning small"></i>);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star text-warning small"></i>);
    }

    return stars;
  };

  
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    const urlSearch = searchParams.get('search');
    
    if (urlCategory) {
      setCategory(urlCategory);
    }
    
    if (urlSearch) {
      setSearchTerm(urlSearch);
    }
  }, [searchParams]);

  
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const data = await apiService.getProducts();
        console.log('Total products from API:', data.length);
        
        setProducts(data);
        setTotalProducts(data.length);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  
  useEffect(() => {
    let filtered = [...products];
    if (category !== "all") {
      filtered = filtered.filter(product => 
        product.category?.slug === category
      );
    }
    if (price.min && price.max) {
      filtered = filtered.filter(product => 
        product.price >= price.min && product.price <= price.max
      );
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(term) ||
        (product.description && product.description.toLowerCase().includes(term)) ||
        (product.category?.name && product.category.name.toLowerCase().includes(term))
      );
    }

    console.log('Filtered products:', filtered.length);
    setFilteredProducts(filtered);
    setPage(1);
  }, [category, price, searchTerm, products]);

  useEffect(() => {
    const newParams = new URLSearchParams();
    
    if (category !== "all") {
      newParams.set('category', category);
    }
    
    if (searchTerm) {
      newParams.set('search', searchTerm);
    }
    
    setSearchParams(newParams);
  }, [category, searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const shownProducts = filteredProducts.slice((page - 1) * perPage, page * perPage);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const clearAllFilters = () => {
    setCategory("all");
    setPrice({ min: null, max: null });
    setSearchTerm("");
  };

  return (
    <div className=" p-4">
      <h1 className="fw-bold mb-5">Shop All Products</h1>
      <div className="row mb-5">
        <div className="col-md-8 mx-auto">
          <form onSubmit={handleSearch}>
            <div className="input-group input-group-lg">
              <input
                type="text"
                className="form-control"
                placeholder="Search products by name, description, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={clearSearch}
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
              <button 
                className="btn btn-primary" 
                type="submit"
              >
                <i className="fas fa-search"></i> Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 col-lg-2">
          <Sidebar
            selectedCategory={category}
            onSelectCategory={(cat) => {
              setCategory(cat);
            }}
            onPriceChange={(min, max) => {
              setPrice({ min, max });
            }}
          />
        </div>
        <div className="col-md-9 col-lg-10">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" >
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading products...</p>
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <div className="row g-4">
                {shownProducts.map((p) => (
                  <div className="col-lg-4 col-md-6" key={p._id}>
                    <div className="Product shadow-sm rounded-4 border h-100">
                      <div className="Product-image rounded-top-4 overflow-hidden cursor-pointer" onClick={() => handleProductClick(p._id)}>
                        <img className="w-100 img-hover object-fit-cover" src={p.images?.[0] } alt={p.title}/>
                      </div>
                      <div className="product-caption p-3">
                        <h5 className="fw-bold cursor-pointer"onClick={() => handleProductClick(p._id)}>{p.title}</h5>
                        {p.rating && (
                          <div className="mb-2">
                            <div className="d-flex align-items-center gap-1">
                              {renderStars(p.rating.rate)}
                              <small className="text-muted ms-1">
                                ({p.rating.count} reviews)
                              </small>
                            </div>
                          </div>
                        )}
                        <h4 className="text-primary fw-bold mb-3">${p.price}</h4>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-outline-primary flex-grow-1"
                            onClick={() => handleProductClick(p._id)}
                          >
                            View Details
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => addToCart(p)}
                          >
                            <i className="fa-solid fa-cart-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-5">
                  <nav>
                    <ul className="pagination">
                      <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => setPage(p => Math.max(p - 1, 1))}
                        >
                          Previous
                        </button>
                      </li>
                      
                      {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 7) {
                          pageNum = i + 1;
                        } else if (page <= 4) {
                          pageNum = i + 1;
                        } else if (page >= totalPages - 3) {
                          pageNum = totalPages - 6 + i;
                        } else {
                          pageNum = page - 3 + i;
                        }
                        
                        return (
                          <li key={pageNum} className={`page-item ${pageNum === page ? 'active' : ''}`}>
                            <button 
                              className="page-link" 
                              onClick={() => setPage(pageNum)}
                            >
                              {pageNum}
                            </button>
                          </li>
                        );
                      })}
                      
                      <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="d-flex justify-content-center align-items-center" >
              <div className="text-center">
                <i className="fa-solid fa-search fa-3x text-muted mb-3"></i>
                <h4>No products found</h4>
                <p className="text-muted">
                  {searchTerm 
                    ? `No products found for "${searchTerm}"`
                    : "No products match your filters"
                  }
                </p>
                <div className="d-flex gap-2 justify-content-center">
                  <button 
                    className="btn btn-primary"
                    onClick={clearAllFilters}
                  >
                    Show All Products
                  </button>
                  {searchTerm && (
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={clearSearch}
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Products;