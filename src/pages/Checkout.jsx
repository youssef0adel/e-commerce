import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useOrders } from '../contexts/OrderContext';

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: currentUser?.name || "",
    address: "",
    city: "",
    postal: "",
  });

  const [payment, setPayment] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, [currentUser, navigate]);

  if (!items?.length)
    return (
      <div className="text-center py-5">
        <h3>Your cart is empty</h3>
      </div>
    );

  function handleChange(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function handlePaymentChange(e) {
    setPayment((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function validatePayment() {
    if (payment.cardNumber.length < 12) return false;
    if (payment.cvv.length < 3) return false;
    if (!payment.expiry.includes("/")) return false;
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validatePayment()) {
      alert("Please enter valid card information.");
      return;
    }

    try {
      const order = await placeOrder({
        user: currentUser,
        items,
        shipping: form,
        payment,
        total: subtotal,
      });

      if (!order?.id) throw new Error("Order missing ID");

      clearCart();
      navigate(`/order-confirmation/${order.id}`);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while placing your order.");
    }
  }
  return (
    <section className="container py-5">
      <div className="row">
        <div className="col-md-7">
          <h4>Shipping</h4>

          <form onSubmit={handleSubmit} className="mt-3">
            <div className="mb-2">
              <label className="form-label">Full name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-2">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6 mb-2">
                <label className="form-label">Postal code</label>
                <input
                  type="text"
                  name="postal"
                  value={form.postal}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <h4>Payment (Visa/Mastercard)</h4>

              <div className="mb-2">
                <label className="form-label">Name on card</label>
                <input
                  type="text"
                  name="cardName"
                  value={payment.cardName}
                  onChange={handlePaymentChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Card number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={payment.cardNumber}
                  onChange={handlePaymentChange}
                  className="form-control"
                  placeholder="1111 2222 3333 4444"
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-2">
                  <label className="form-label">Expiry (MM/YY)</label>
                  <input
                    type="text"
                    name="expiry"
                    value={payment.expiry}
                    onChange={handlePaymentChange}
                    className="form-control"
                    placeholder="12/27"
                    required
                  />
                </div>

                <div className="col-md-6 mb-2">
                  <label className="form-label">CVV</label>
                  <input
                    type="password"
                    name="cvv"
                    value={payment.cvv}
                    onChange={handlePaymentChange}
                    className="form-control"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-primary mt-3" type="submit">
              Place order
            </button>
          </form>
        </div>
        <div className="col-md-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Order summary</h5>

              <ul className="list-unstyled">
                {items.map((it) => (
                  <li key={it.id} className="d-flex justify-content-between">
                    <small>{it.title} x {it.qty}</small>
                    <small>${(it.price * it.qty).toFixed(2)}</small>
                  </li>
                ))}
              </ul>

              <hr />

              <div className="d-flex justify-content-between fw-semibold">
                Total <span>${Number(subtotal).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
