import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { readJSON, writeJSON } from '../utils/localStorageHelpers';
const KEY = 'wc_cart_v1';
const CartContext = createContext();
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const saved = readJSON(KEY) || [];
    setItems(saved);}, []);
  useEffect(() => {
    writeJSON(KEY, items);}, [items]);
  function addToCart(product, qty = 1) {
    setItems(prev => {
      const productId = product._id || product.id;
      const existing = prev.find(i => i.id === productId);
      if (existing) 
      {
        return prev.map(i => 
          i.id === productId 
            ? { ...i, qty: i.qty + qty } 
            : i
        );
      }
      
      return [...prev, { 
        id: productId, 
        title: product.title, 
        price: product.price, 
        images: product.images,
        image: product.images?.[0],
        qty 
      }];
    });
  }
  function removeFromCart(id) {
    setItems(prev => prev.filter(i => i.id !== id));
  }
  function updateQty(id, qty) {
    if (qty <= 0) return removeFromCart(id);
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }
  function clearCart() {
    setItems([]);
  }
  const subtotal = useMemo(() => 
    items.reduce((s, it) => s + it.price * it.qty, 0), 
    [items]
  );
  const count = useMemo(() => 
    items.reduce((n, it) => n + it.qty, 0), 
    [items]
  );
  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQty, 
      clearCart, 
      subtotal, 
      count 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}