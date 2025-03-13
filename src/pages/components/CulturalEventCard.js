import Link from 'next/link';

const CulturalEventCard = ({ title, dates, imageUrl, detailsLink }) => {
  return (
    <div className="relative rounded-lg overflow-hidden border-2 border-gold-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <img
        src={`/${imageUrl}`}
        alt={title}
        className="w-full h-512 object-cover filter brightness-90 hover:brightness-100 transition-all duration-300"
      />

      {/* Content */}
      <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
        {/* Title and Dates */}
        <div className="text-center">
          <h2 className="font-IBMPlexSansArabic text-3xl font-bold text-gold-400 mb-2 font-wow">{title}</h2>
          <p className="font-IBMPlexSansArabic text-lg text-gray-300 font-wow">{dates}</p>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-6">
          <Link
            href={`/${detailsLink}`}
            className="bg-gold-500 border-2 border-gold-700 rounded-full px-6 py-3 flex items-center space-x-2 hover:bg-gold-600 hover:border-gold-800 transition-all duration-300"
          >
            <span className="font-IBMPlexSansArabic text-lg text-black font-wow font-semibold text-gray-300">التفاصيل</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CulturalEventCard;