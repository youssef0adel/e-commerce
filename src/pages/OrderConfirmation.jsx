import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrders } from '../contexts/OrderContext';

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const { orders } = useOrders();

  const order = orders.find(o => o.id === orderId);

  if (!order) return (
    <div className="text-center py-5">
      <h4>Order not found</h4>
      <Link to="/">Back to home</Link>
    </div>
  );

  return (
    <div className="text-center">
      <h3>Thank you! Your order has been placed.</h3>
      <p className="lead">Order ID: <strong>{order.id}</strong></p>
      <p>Total: <strong>${Number(order.total).toFixed(2)}</strong></p>
      <Link to="/profile" className="btn btn-primary mt-3">View your orders</Link>
    </div>
  );
}
