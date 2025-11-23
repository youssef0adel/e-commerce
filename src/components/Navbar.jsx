import { useState } from 'react';
import "../components/Navbar.css"
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaStore, FaCartPlus } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { count } = useCart();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function handleLogout() {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom ">
      <div className="container">
        <Link className="navbar-brand" to="/"onClick={handleNavClick}>
          <FaCartPlus className='brand-icon'/>
          <span className="brand-text">E-Commerce</span>
        </Link>
        <button 
          className="navbar-toggler custom-toggler"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-controls="navMenu"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navMenu">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}to="/" onClick={handleNavClick}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/shop" onClick={handleNavClick}>Shop</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}to="/about" onClick={handleNavClick}>About</NavLink>
            </li>
          </ul>
          <form className="d-flex search-form" onSubmit={handleSearch}>
            <div className="input-group search-group">
              <input type="text" className="form-control search-input" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
              <button className="btn search-btn" type="submit">
                <FaSearch className="search-icon" />
              </button>
            </div>
          </form>
          <ul className="navbar-nav ms-auto nav-right">
            <li className="nav-item cart-item">
              <NavLink  className={({ isActive }) => `nav-link cart-link ${isActive ? 'active' : ''}`} to="/cart" onClick={handleNavClick}>
                <div className="cart-container">
                  <FaShoppingCart className="cart-icon" />
                  {count > 0 && (
                    <span className="cart-badge">
                      {count > 99 ? '99+' : count}
                    </span>
                  )}
                  <span className="cart-text">Cart</span>
                </div>
              </NavLink>
            </li>
            <li className="nav-item dropdown user-dropdown">
              {currentUser ? (
                <div>
                  <button  className="nav-link user-toggle dropdown-toggle" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="user-info">
                      <FaUser className="user-icon" />
                      <span className="user-name">{currentUser.name}</span>
                    </div>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end user-menu" aria-labelledby="userDropdown">
                    <li>
                      <Link className="dropdown-item user-menu-item" to="/profile"onClick={handleNavClick}>
                        <i className="fas fa-user me-2"></i>
                        Profile
                      </Link>
                    </li>
                   
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button  className="dropdown-item user-menu-item logout-btn" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt me-2"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <NavLink 
                  className={({ isActive }) => `nav-link login-link ${isActive ? 'active' : ''}`}
                  to="/login"
                  onClick={handleNavClick}
                >
                  <FaUser className="me-1" />
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}