import React, { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { readJSON, writeJSON } from '../utils/localStorageHelpers';
const KEY = 'wc_orders_v1';
const OrderContext = createContext();
export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const saved = readJSON(KEY) || [];
    setOrders(saved);}, []);
  useEffect(() => {
    writeJSON(KEY, orders);}, [orders]);
  function placeOrder({ user, items, shipping, total }) {
    const id = uuidv4();
    const order = { id, userId: user?.id || null, createdAt: new Date().toISOString(), items, shipping, total };
    setOrders(prev => [order, ...prev]);
    return order;
  }

  function listOrdersForUser(userId) 
  {
    if (!userId) return [];
    return orders.filter(o => o.userId === userId);
  }

  function clearOrders() 
  {
    setOrders([]);
  }

  return (
    <OrderContext.Provider value={{ orders, placeOrder, listOrdersForUser, clearOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() 
{
  return useContext(OrderContext);
}
