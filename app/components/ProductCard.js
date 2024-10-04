import { useState } from "react";
import Link from "next/link";

export default function ProductCard({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = product.images || [];
  const currentImage = images[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="border p-6 rounded-lg shadow-xl relative transition-transform transform hover:scale-105">
      
      <div className="relative w-full h-64">
        <img
          className="w-full h-full object-contain mb-4"
          src={currentImage}
          alt={product.title}
        />

       
        {images.length > 1 && (
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-700 rounded-full p-2 shadow-md hover:bg-gray-200 transition-colors"
          >
            &#8592;
          </button>
        )}

        
        {images.length > 1 && (
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-700 rounded-full p-2 shadow-md hover:bg-gray-200 transition-colors"
          >
            &#8594;
          </button>
        )}
      </div>

     
      <div className="flex justify-center mt-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full mx-1 ${
              index === currentImageIndex ? "bg-gray-800" : "bg-gray-300"
            } transition-colors`}
          />
        ))}
      </div>

     
      <h2 className="text-xl font-semibold mt-4">{product.title}</h2>
      <p className="text-gray-700 mb-2 text-lg">Price: ${product.price}</p>
      
      
      <p className="text-sm text-gray-600 mb-2">Category: {product.category}</p>
      
      
      {product.tags && product.tags.length > 0 && (
        <div className="mb-4">
          {product.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold mr-2 mb-2 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

     
      <Link
        href={`/products/${product.id}`}
        className="bg-gray-800 text-white py-2 px-4 rounded-md inline-block text-center hover:bg-gray-700 transition-colors"
      >
        View Details
      </Link>
    </div>
  );
}
