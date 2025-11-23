import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useOrders } from "../contexts/OrderContext";
import "./Profile.css";

export default function Profile() 
{
  const { currentUser } = useAuth();
  const { orders, listOrdersForUser, clearOrders } = useOrders();
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => 
  {
    if (currentUser?.id) 
    {
      const userOrdersList = listOrdersForUser(currentUser.id);
      setUserOrders(userOrdersList);
    }
  }, [currentUser, orders, listOrdersForUser]);

  const handleClearOrders = () => 
    {
    if (
      window.confirm(
        "Are you sure ??"
      )
    ) {
      clearOrders();
      setUserOrders([]);
    }
  };

  return (
    <div className="profile-page">
      <div className="container py-5">
        <div className="profile-header text-center mb-5">
          <div className="profile-avatar">
            <i className="fas fa-user-circle"></i>
          </div>
          <h2 className="profile-title">My Profile</h2>
          <p className="profile-subtitle">
            Manage your account and view order history
          </p>
        </div>

        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="profile-card">
              <div className="card-header">
                <h5 className="card-title">
                  <i className="fas fa-user me-2"></i>
                  Personal Information
                </h5>
              </div>
              <div className="card-body">
                <div className="info-item">
                  <label>Full Name</label>
                  <p className="info-value">
                    {currentUser?.name || "Not provided"}
                  </p>
                </div>
                <div className="info-item">
                  <label>Email Address</label>
                  <p className="info-value">
                    {currentUser?.email || "Not provided"}
                  </p>
                </div>
                <div className="info-item">
                  <label>Member Since</label>
                  <p className="info-value">
                    {currentUser?.joinDate || "Recently"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="orders-card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">
                  <i className="fas fa-shopping-bag me-2"></i>
                  Order History
                </h5>
                {userOrders.length > 0 && (
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleClearOrders}
                  >
                    <i className="fas fa-trash me-1"></i>
                    Clear All
                  </button>
                )}
              </div>
              <div className="card-body">
                {userOrders.length === 0 ? (
                  <div className="empty-orders text-center py-5">
                    <i className="fas fa-shopping-bag fa-3x text-muted mb-3"></i>
                    <h5>No Orders Yet</h5>
                    <p className="text-muted mb-4">
                      You haven't placed any orders yet.
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => (window.location.href = "/shop")}
                    >
                      <i className="fas fa-shopping-cart me-2"></i>
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="orders-list">
                    {userOrders.map((order, index) => (
                      <div key={order.id || index} className="order-item">
                        <div className="order-header">
                          <div className="order-info">
                            <h6 className="order-id">
                              Order #{order.id || `ORD-${index + 1}`}
                            </h6>
                            <small className="order-date">
                              <i className="fas fa-calendar me-1"></i>
                              {new Date(
                                order.createdAt || new Date()
                              ).toLocaleString()}
                            </small>
                          </div>
                          <div className="order-status">
                            <span
                              className={`status-badge ${
                                order.status || "completed"
                              }`}
                            >
                              {order.status || "Completed"}
                            </span>
                          </div>
                        </div>
                        <div className="order-details">
                          <div className="order-items">
                            <small className="text-muted">
                              {order.items?.length || 0} item(s)
                            </small>
                          </div>
                          <div className="order-total">
                            <strong>
                              ${Number(order.total || 0).toFixed(2)}
                            </strong>
                          </div>
                        </div>
                        {order.items && (
                          <div className="order-products">
                            {order.items.slice(0, 3).map((item, itemIndex) => (
                              <div key={itemIndex} className="product-preview">
                                <img
                                  src={
                                    item.image ||
                                    item.images?.[0] ||
                                    "/placeholder-product.jpg"
                                  }
                                  alt={item.title}
                                  className="product-image"
                                />
                                <span className="product-name">
                                  {item.title}
                                </span>
                                <span className="product-quantity">
                                  x{item.qty || 1}
                                </span>
                              </div>
                            ))}
                            {order.items.length > 3 && (
                              <div className="more-items">
                                +{order.items.length - 3} more items
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {userOrders.length > 0 && (
              <div className="order-stats mt-4">
                <div className="row">
                  <div className="col-md-4">
                    <div className="stat-card text-center">
                      <div className="stat-icon">
                        <i className="fas fa-shopping-bag"></i>
                      </div>
                      <h4 className="stat-number">{userOrders.length}</h4>
                      <p className="stat-label">Total Orders</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="stat-card text-center">
                      <div className="stat-icon">
                        <i className="fas fa-dollar-sign"></i>
                      </div>
                      <h4 className="stat-number">
                        $
                        {userOrders
                          .reduce(
                            (total, order) => total + (order.total || 0),
                            0
                          )
                          .toFixed(2)}
                      </h4>
                      <p className="stat-label">Total Spent</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="stat-card text-center">
                      <div className="stat-icon">
                        <i className="fas fa-box"></i>
                      </div>
                      <h4 className="stat-number">
                        {userOrders.reduce(
                          (total, order) => total + (order.items?.length || 0),
                          0
                        )}
                      </h4>
                      <p className="stat-label">Items Purchased</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
