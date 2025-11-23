import { useEffect, useState } from "react";
import { apiService } from "../../services/api";

const Sidebar = ({ selectedCategory, onSelectCategory, onPriceChange }) => {
  const [categories, setCategories] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await apiService.getCategoriesFromProducts();
        setCategories(categoriesData);
      } catch (err) {
        console.log("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const handlePriceFilter = () => {
    const min = minPrice ? parseInt(minPrice) : null;
    const max = maxPrice ? parseInt(maxPrice) : null;
    onPriceChange(min, max);
  };

  const clearPriceFilter = () => {
    setMinPrice('');
    setMaxPrice('');
    onPriceChange(null, null);
  };

  return (
    <div className="shadow-sm border rounded-4 p-3 bg-white">
      <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
        <i className="bi bi-funnel text-primary"></i> Filters
      </h5>
      <div className="mb-4">
        <h6 className="fw-bold mb-2 text-primary">Category</h6>
        <div className="d-flex flex-column gap-2 ps-2">
          <label className="d-flex align-items-center gap-2">
            <input type="radio" name="category" value="all" checked={selectedCategory === "all"} onChange={() => onSelectCategory("all")} className="form-check-input"/>
            <span>All Categories</span>
          </label>
          {categories.map((cat) => (
            <label key={cat._id || cat.id} className="d-flex align-items-center gap-2">
              <input
                type="radio"
                name="category"
                value={cat.slug}
                checked={selectedCategory === cat.slug}
                onChange={() => onSelectCategory(cat.slug)}
                className="form-check-input"
              />
              <span>{cat.name}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h6 className="fw-bold text-primary mb-2">Price Range</h6>
        <div className="row g-2">
          <div className="col-6">
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="Min $"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              onBlur={handlePriceFilter}
            />
          </div>
          <div className="col-6">
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="Max $"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              onBlur={handlePriceFilter}
            />
          </div>
        </div>
        {(minPrice || maxPrice) && (
          <button 
            className="btn btn-sm btn-outline-secondary w-100 mt-2"
            onClick={clearPriceFilter}
          >
            Clear Price Filter
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;