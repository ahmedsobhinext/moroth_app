// // components/ItemsGrid.



// import ItemCardLoc from './ItemCardLoc';

// const itemsData = [
//   {
//     title: 'جدة التاريخية',
//     subtitle: 'المنطقة الغربية',
//     imageUrl: 'jeddah.png',
//     detailsLink: '/jeddah/details',
//     locationsLink: '/jeddah/locations',
//   },
//   {
//     title: 'حي الطريف بالدرعية',
//     subtitle: 'منطقة نجد',
//     imageUrl: 'diriyah.png',
//     detailsLink: '/diriyah/details',
//     locationsLink: '/diriyah/locations',
//   },
//   {
//     title: 'قرية جبال ألمع',
//     subtitle: 'منطقة عسير',
//     imageUrl: 'almae.png',
//     detailsLink: '/almae/details',
//     locationsLink: '/almae/locations',
//   },
//   {
//     title: 'العلا',
//     subtitle: 'المنطقة الشمالية الغربية',
//     imageUrl: 'alula.png',
//     detailsLink: '/alula/details',
//     locationsLink: '/alula/locations',
//   },
// ];

// const ItemsGridLoc = () => {
//   return (
//     <div className="grid grid-cols-2 gap-4 p-4">
//       {itemsData.map((item, index) => (
//         <ItemCardLoc key={index} {...item} />
//       ))}
//     </div>
//   );
// };

// export default ItemsGridLoc;

// components/ItemsGrid.js
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import ItemCardLoc from './ItemCardLoc';

const ItemsGridLoc = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeritageSites = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'heritageSites'));
        const sitesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().name,
          subtitle: doc.data().location,
          imageUrl: doc.data().photo,
          detailsLink: `/heritage-sites/${doc.id}`,
          locationsLink: `/heritage-sites/${doc.id}`
        }));
        setItems(sitesData);
        setLoading(false);
      } catch (err) {
        console.log(err);
        
        setError(err)
        // setError(err.message);
        setLoading(false);
      }
    };

    fetchHeritageSites();
  }, []);

  if (loading) return <div className="text-center py-8 text-amber-900">جاري التحميل...</div>;
  if (error) return <div className="text-center py-8 text-red-600">حدث خطأ: {error}</div>;

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {items.map((item,index) => (
         <ItemCardLoc key={index} {...item} />
        // <ItemCardLoc 
        //   key={item.id}
        //   title={item.title}
        //   subtitle={item.subtitle}
        //   imageUrl={item.imageUrl}
        //   detailsLink={item.detailsLink}
        //   // locationsLink={item.locationsLink}
        // />
      ))}
    </div>
  );
};

export default ItemsGridLoc;