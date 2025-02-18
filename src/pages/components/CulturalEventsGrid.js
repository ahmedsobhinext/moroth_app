// components/CulturalEventsGrid.js

import CulturalEventCard from './CulturalEventCard';

const eventsData = [
  {
    title: 'ليالي الدرعية',
    dates: '٢٣ يناير - ١ فبراير',
    imageUrl: 'diriyah-nights.png',
    detailsLink: '/diriyah-nights/details',
  },
  {
    title: 'لحظات العلا',
    dates: '٧ - ٢٠ نوفمبر',
    imageUrl: 'alula-moments.png',
    detailsLink: '/alula-moments/details',
  },
];

const CulturalEventsGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {eventsData.map((event, index) => (
        <CulturalEventCard key={index} {...event} />
      ))}
    </div>
  );
};

export default CulturalEventsGrid;