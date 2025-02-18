// components/ItemCard.js

import Link from 'next/link';

const ItemCard = ({ title, imageUrl,linkTo }) => {
  return (
    <Link href={`/${linkTo}`} className="relative block">
      {/* Image */}
      <img src={imageUrl} alt={title} className="w-full h-64 object-cover rounded-lg" />

      {/* Title */}
      <div className="font-IBMPlexSansArabic absolute bottom-0 left-0 w-full p-4 bg-black bg-opacity-50 text-center text-white text-xl font-semibold">
        {title}
      </div>
    </Link>
  );
};

export default ItemCard;