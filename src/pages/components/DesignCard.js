// components/DesignCard.js
import Link from 'next/link';

const DesignCard = ({ 
  title, 
  designer, 
  price, 
  imageUrl, 
  detailsLink, 
  onAddToCart 
}) => {
  return (
    <div className="relative rounded-lg overflow-hidden border-2 border-gold-500 bg-gray-900 shadow-lg">
      {/* Image Container with Aspect Ratio */}
      <div className="relative pt-[100%]"> {/* 1:1 Aspect Ratio */}
        <img 
          src={imageUrl} 
          alt={title} 
          className="absolute top-0 left-0 w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300" 
        />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
        {/* Title and Details */}
        <div className="text-center mb-4">
          <h2 className="font-IBMPlexSansArabic text-2xl font-bold text-gold-400 text-gray-300">
            {title}
          </h2>
          <p className="font-IBMPlexSansArabic text-base text-gray-300">
            {designer}
          </p>
          <p className="font-IBMPlexSansArabic text-lg text-gray-400 mt-2">
            {price} ر.س
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={onAddToCart}
            className="bg-gray-800 border-2 border-gold-500 rounded-lg px-6 py-2 flex items-center space-x-2 hover:bg-gold-500 hover:text-black transition-colors duration-300"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-gold-400"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            <span className="text-sm font-IBMPlexSansArabic text-gray-300">أضف إلى السلة</span>
          </button>
          
          {/* <Link 
            href={detailsLink}
            className="bg-gray-800 border-2 border-gold-500 rounded-lg px-6 py-2 hover:bg-gold-500 hover:text-black transition-colors duration-300"
          >
            <span className="font-IBMPlexSansArabic text-sm font-semibold text-gray-300">
              التفاصيل
            </span>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default DesignCard;