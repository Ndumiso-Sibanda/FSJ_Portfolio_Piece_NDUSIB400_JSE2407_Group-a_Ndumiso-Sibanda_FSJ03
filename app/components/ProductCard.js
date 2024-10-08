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
    <div className="bg-white border p-4 rounded-lg shadow-xl relative transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out max-w-2xl w-full">
      
      <div className="relative w-full h-48 overflow-hidden rounded-lg mb-4">
        <img
          className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
          src={currentImage}
          alt={product.title}
        />

       
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 backdrop-blur text-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            >
              &#8592;
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 backdrop-blur text-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            >
              &#8594;
            </button>
          </>
        )}
      </div>

      
      {images.length > 1 && (
        <div className="flex justify-center mt-2 mb-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full mx-1 ${
                index === currentImageIndex ? "bg-gray-800" : "bg-gray-300"
              } transition-colors duration-300`}
            />
          ))}
        </div>
      )}

     
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">{product.title}</h2>
      <p className="text-gray-800 text-lg font-medium mb-2">Price: ${product.price}</p>
      <p className="text-sm text-gray-600 mb-4">Category: {product.category}</p>

      
      {product.tags && product.tags.length > 0 && (
        <div className="mb-4">
          {product.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold mr-2 mb-2 px-3 py-1 rounded-lg shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      
      <Link
        href={`/products/${product.id}`}
        className="bg-indigo-600 text-white py-2 px-6 rounded-full inline-block text-center hover:bg-indigo-500 transition-colors duration-300"
      >
        View Details
      </Link>
    </div>
  );
}
