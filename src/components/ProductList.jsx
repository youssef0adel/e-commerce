import ProductCard from './ProductCard';
import Loader from './Loader';
export default function ProductList({ products, loading, error }) {
  if (loading) return <div className="d-flex justify-content-center py-5"><Loader /></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!products || products.length === 0) return <div className="alert alert-info">No products found</div>;

  return (
    <div className="row g-3">
      {products.map(p => (
        <div key={p._id || p.id} className="col-6 col-md-4 col-lg-3">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}