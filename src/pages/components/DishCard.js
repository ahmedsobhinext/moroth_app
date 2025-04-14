import Link from 'next/link';

const DishCard = ({ title, subtitle, imageUrl, recipeLink }) => {
  return (
    <div className="rounded-lg overflow-hidden border-2 border-gold-500 bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <img
        src={`${imageUrl}`}
        alt={title}
        className="w-full h-64 object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
      />

      {/* Content Below Image */}
      <div className="p-6 bg-amber-50">
        {/* Title and Subtitle in a Row */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-IBMPlexSansArabic text-2xl font-bold text-gold-400">{title}</h2>
          <p className="font-IBMPlexSansArabic text-base text-gray-300">{subtitle}</p>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-4">
          <Link
            href={`/${recipeLink}`}
            className="bg-gray-700 border-2 border-gold-500 rounded-lg px-6 py-2 flex items-center space-x-2 hover:bg-gold-500 hover:text-black transition-colors duration-300"
          >
            <span className="font-IBMPlexSansArabic text-sm font-semibold text-gray-300">طريقة التحضير</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DishCard;