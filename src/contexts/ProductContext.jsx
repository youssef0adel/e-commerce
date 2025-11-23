import { createContext, useContext, useEffect, useState } from 'react';
import { readJSON, writeJSON } from '../utils/localStorageHelpers';
import { apiService } from '../services/api';
const KEY = 'wc_products_v1';
const ProductContext = createContext();
export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const cached = readJSON(KEY);
    if (cached && Array.isArray(cached) && cached.length > 0) {
      setProducts(cached);
      setLoading(false);
      return;
    }
  fetchProducts();
  }, []);
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try 
    {
      const data = await apiService.getProducts();
      setProducts(data || []);
      writeJSON(KEY, data || []);
    } 
    catch (err) 
    {
      setError(err.message || 'Failed to fetch products');
      console.error('Products fetch error:', err);
    } 
    finally 
    {
      setLoading(false);
    }
  };

  function reload() 
  {
    fetchProducts();
  }

  function findById(id) 
  {
    return products.find(p => String(p._id || p.id) === String(id));
  }

  function filter({ search = '', category = '' }) 
  {
    const s = String(search).toLowerCase();
    return products.filter(p => {
      if (category && p.category?.slug !== category && p.category?.name !== category) return false;
      if (!s) return true;
      return p.title.toLowerCase().includes(s) || (p.description || '').toLowerCase().includes(s);
    });
  }

  const categories = Array.from(
    new Set(
      products
        .map(p => p.category?.name)
        .filter(Boolean)
    )
  );

  return (
    <ProductContext.Provider value={{ 
      products, 
      loading, 
      error, 
      reload, 
      findById, 
      filter, 
      categories 
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}