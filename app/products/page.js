"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { collection, query, where, getDocs, orderBy, limit, startAt } from 'firebase/firestore';
import { db } from '@/firebase';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner'; 
import SortSelect from '../components/SortSelect'; 


const categories = [
  "beauty", "fragrances", "furniture", "groceries", "home-decoration", 
  "kitchen-accessories", "laptops", "mens-shirts", "mens-shoes", "mens-watches", 
  "mobile-accessories", "motorcycle", "skin-care", "smartphones", "sports-accessories", 
  "sunglasses", "tablets", "tops", "vehicle", "womens-bags", "womens-dresses", 
  "womens-jewellery", "womens-shoes", "womens-watches"
];

const PAGE_SIZE = 20; 

async function fetchProducts({ search = '', category = '', page = 1, limitValue = PAGE_SIZE, sortOrder = '' }) {
  try {
    const productRef = collection(db, 'products'); 

    
    let q = query(productRef);

    
    if (category) {
      q = query(q, where('category', '==', category));
    }

    
    if (search) {
      q = query(q, where('name', '>=', search), where('name', '<=', search + '\uf8ff'));
    }

    
    if (sortOrder === 'price-asc') {
      q = query(q, orderBy('price', 'asc'));
    } else if (sortOrder === 'price-desc') {
      q = query(q, orderBy('price', 'desc'));
    }

   
    const offset = (page - 1) * limitValue;
    q = query(q, orderBy('id'), limit(limitValue), startAt(offset)); 

    const productDocs = await getDocs(q);
    const products = productDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return products; 
  } catch (error) {
    console.error('Firebase Fetch Error:', error.message);
    throw new Error('Failed to fetch products');
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
  const [sortOrder, setSortOrder] = useState(''); 
  const [totalProducts, setTotalProducts] = useState(194); 

  const loadProducts = async () => {
    try {
      setLoading(true);
      const fetchedProducts = await fetchProducts({
        search: searchQuery,
        category: selectedCategory,
        page,
        limitValue: PAGE_SIZE, 
        sortOrder,
      });
  
      console.log("Fetched Products:", fetchedProducts); 
      setProducts(fetchedProducts); 
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(); 
  }, [searchQuery, selectedCategory, sortOrder, page]);

  const updateUrl = () => {
    router.push(`/products?search=${searchQuery || ''}&category=${selectedCategory || ''}&sortby=${sortOrder}&page=${page}`);
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
        {Array.isArray(categories) && categories.length > 0 && (
          categories.map((category) => (
            <option key={category} value={category}>
              {category.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
            </option>
          ))
        )}
      </select>

      <SortSelect sortOrder={sortOrder} onSortChange={handleSortChange} /> 

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination 
        currentPage={page} 
        totalProducts={totalProducts} 
        limitValue={PAGE_SIZE} 
        onPageChange={setPage} 
      />
    </div>
  );
}
