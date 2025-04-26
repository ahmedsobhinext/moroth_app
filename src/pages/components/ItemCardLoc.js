// components/ItemCard.js

import Link from 'next/link';

const ItemCardLoc = ({ title, subtitle, imageUrl, detailsLink, locationsLink }) => {
  return (
    <div className="relative rounded-lg overflow-hidden border-2 border-gold-500 bg-gray-900 shadow-lg">
      {/* Image */}
      <img src={`${imageUrl}`} alt={title} className="w-full h-512 object-cover opacity-90 hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
        {/* Title and Subtitle */}
        <div className="text-center">
          <h2 className="font-IBMPlexSansArabic text-2xl font-bold text-gold-400 mb-2 text-gray-300">{title}</h2>
          <p className="font-IBMPlexSansArabic text-base text-gray-300">{subtitle}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-4">
          <Link href={`${locationsLink}`} className="bg-gray-800 border-2 border-gold-500 rounded-lg px-6 py-2 flex items-center space-x-2 hover:bg-gold-500 hover:text-black transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gold-400">
              <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75-4.365-9.75-9.75-9.75zM15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
            {/* <Link href={'/arview'}> */}
            <span className="text-sm font-semibold text-gray-300">شاهد الواقع العزز</span>
            {/* </Link> */}
          </Link>
          <Link href={`${detailsLink}`} className="bg-gray-800 border-2 border-gold-500 rounded-lg px-6 py-2 hover:bg-gold-500 hover:text-black transition-colors duration-300">
            <span className="font-IBMPlexSansArabic text-sm font-semibold text-gray-300">التفاصيل</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemCardLoc;