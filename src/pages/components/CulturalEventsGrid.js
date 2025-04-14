// components/CulturalEventsGrid.js

// import CulturalEventCard from './CulturalEventCard';

// const eventsData = [
//   {
//     title: 'ليالي الدرعية',
//     dates: '٢٣ يناير - ١ فبراير',
//     imageUrl: 'diriyah-nights.png',
//     detailsLink: '',
//   },
//   {
//     title: 'لحظات العلا',
//     dates: '٧ - ٢٠ نوفمبر',
//     imageUrl: 'alula-moments.png',
//     detailsLink: '',
//   },
// ];

// const CulturalEventsGrid = () => {
//   return (
//     <div className="grid grid-cols-2 gap-4 p-4">
//       {eventsData.map((event, index) => (
//         <CulturalEventCard key={index} {...event} />
//       ))}
//     </div>
//   );
// };

// export default CulturalEventsGrid;

// components/CulturalEventsGrid.js
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase'; // Adjust path as needed
import CulturalEventCard from './CulturalEventCard';

const CulturalEventsGrid = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = collection(db, 'events');
        const querySnapshot = await getDocs(eventsRef);
        
        const eventsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Convert Firestore timestamp to date strings
          date: formatDate(doc.data().date)
          // dates:new Date(doc.data().date).toLocaleDateString('en-US', {
          //   year: 'numeric',
          //   month: 'long',
          //   day: 'numeric'
          // })
        }));

        console.log(eventsData[0]['date']);
        
        
        setEvents(eventsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
  };

  if (loading) return <div className="text-center py-8">جاري التحميل...</div>;
  if (error) return <div className="text-red-500 text-center py-8">حدث خطأ: {error}</div>;

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {events.map((event,index) => (
        <CulturalEventCard 
          key={index}
          title={event.name}
          dates={event.date}
          imageUrl={event.image}
          detailsLink={`events/${event.id}`} // Assuming you have an event details page
        />
      ))}
    </div>
  );
};

export default CulturalEventsGrid;