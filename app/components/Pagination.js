"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Pagination({ currentPage, searchQuery, selectedCategory, sortOrder }) {
  
  
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage + 1;
  const router = useRouter();

  const buildPageLink = (page) => {
    const query = {
      ...router.query,
      page,
      search: searchQuery || undefined,
      category: selectedCategory || undefined,
      sort: sortOrder || undefined,
    };

    return {
      pathname: '/products',
      query,
    };
  };

  return (
    <div className="flex justify-between items-center mt-8">
      {prevPage && (
        <Link href={buildPageLink(prevPage)} className="bg-gray-300 px-4 py-2 rounded">
          Previous
        </Link>
      )}
      <span className="text-gray-700">Page {currentPage}</span>
      <Link href={buildPageLink(nextPage)} className="bg-gray-300 px-4 py-2 rounded">
        Next
      </Link>
    </div>
  );
}
