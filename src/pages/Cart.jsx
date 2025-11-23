import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import "../pages/Cart.css"
export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQty, removeFromCart, clearCart, subtotal } = useCart();
  const handleCheckout = () => 
  {
    navigate("/checkout");
  };

  if (!items || items.length === 0)
    return (
      <div className="text-center py-5 vh-100 d-flex justify-content-center align-items-center">
        <div>
            <h4>Your cart is empty</h4>
            <Link to="/shop" className="btn btn-primary mt-3">Shop products</Link>
        </div>
        
      </div>
    );

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-md-8">
          <div className="list-group shadow-sm rounded-4 overflow-hidden">
            {items.map((it) => (
              <div key={it.id} className="list-group-item d-flex align-items-center gap-3 py-3">
                <img src={it.images?.[0]} alt={it.title} className="img-cart rounded-3 border"/>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="fw-semibold mb-1">{it.title}</h6>
                      <h6 className="text-muted">${Number(it.price).toFixed(2)}</h6>
                    </div>
                    <div className="text-end">
                      <div className="input-group input-group-sm mb-2">
                        <button className="btn btn-outline-secondary" onClick={() => updateQty(it.id, it.qty - 1)}>−</button>
                        <input className="form-control text-center" value={it.qty}readOnly/>
                        <button className="btn btn-outline-secondary" onClick={() => updateQty(it.id, it.qty + 1)}>+</button>
                      </div>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(it.id)}>Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <button className="btn btn-outline-danger" onClick={clearCart}>Clear cart</button>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-lg rounded-4">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3 text-center">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span className="fw-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <span>Estimated Shipping</span>
                <span className="text-muted">$0.00</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Tax</span>
                <span className="text-muted">$0.00</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <h6>Total</h6>
                <h6 className="fw-bold text-primary">${subtotal.toFixed(2)}</h6>
              </div>
              <button className="btn btn-primary w-100" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
