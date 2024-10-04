import { useState, useEffect } from 'react';
import Link from 'next/link'; 
import ProductCard from '../components/ProductCard';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('https://next-ecommerce-api.vercel.app/products');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchProducts();
  }, []); 

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} passHref>
              <a>
                <ProductCard product={product} />
              </a>
            </Link>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
