"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner'; 
import SortSelect from '../components/SortSelect'; 

const API_URL = 'https://next-ecommerce-api.vercel.app/products';

const categories = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches"
];


async function fetchProducts({ search = '', category = '', page = 1, limit = 20 }) {
  try {
    const query = new URLSearchParams({
      search,
      category,
      skip: (page - 1) * limit,
      limit,
    });

    const fetchUrl = `${API_URL}?${query.toString()}`;
    console.log('Fetching URL:', fetchUrl); 

    const res = await fetch(fetchUrl);

    if (!res.ok) {
      const errorMessage = await res.text();
      console.error('API Response Error:', errorMessage); 
      throw new Error(`Failed to fetch products: ${res.status} - ${errorMessage}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Fetch Error:', error.message);
    throw new Error(error.message);
  }
}

export default function ProductsPage({ searchParams }) {
  const router = useRouter();
  const [page, setPage] = useState(Number(searchParams.page) || 1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.search || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.category || '');
  const [sortOrder, setSortOrder] = useState(searchParams.sort || ''); 

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await fetchProducts({
          search: searchQuery,
          category: selectedCategory,
          page,
        });

       
        let sortedProducts = [...fetchedProducts];
        if (sortOrder === 'price-asc') {
          sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'price-desc') {
          sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
        }

        setProducts(sortedProducts || []);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [searchQuery, selectedCategory, sortOrder, page]);

  const updateUrl = () => {
    router.push(`/products?search=${searchQuery || ''}&category=${selectedCategory || ''}&sort=${sortOrder}&page=${page}`);
  };

  useEffect(() => {
    updateUrl();
  }, [searchQuery, selectedCategory, sortOrder, page]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); 
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setPage(1); 
  };

  const handleSortChange = (sort) => {
    setSortOrder(sort);
    setPage(1); 
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search products..."
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />

      <select value={selectedCategory} onChange={handleCategoryChange} className="mb-4 p-2 border border-gray-300 rounded">
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())} 
          </option>
        ))}
      </select>

     
      <SortSelect sortOrder={sortOrder} onSortChange={handleSortChange} /> 

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination currentPage={page} />
    </div>
  );
}
