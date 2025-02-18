// components/ItemsGrid.js

import ItemCardLoc from './ItemCardLoc';

const itemsData = [
  {
    title: 'جدة التاريخية',
    subtitle: 'المنطقة الغربية',
    imageUrl: 'jeddah.png',
    detailsLink: '/jeddah/details',
    locationsLink: '/jeddah/locations',
  },
  {
    title: 'حي الطريف بالدرعية',
    subtitle: 'منطقة نجد',
    imageUrl: 'diriyah.png',
    detailsLink: '/diriyah/details',
    locationsLink: '/diriyah/locations',
  },
  {
    title: 'قرية جبال ألمع',
    subtitle: 'منطقة عسير',
    imageUrl: 'almae.png',
    detailsLink: '/almae/details',
    locationsLink: '/almae/locations',
  },
  {
    title: 'العلا',
    subtitle: 'المنطقة الشمالية الغربية',
    imageUrl: 'alula.png',
    detailsLink: '/alula/details',
    locationsLink: '/alula/locations',
  },
];

const ItemsGridLoc = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {itemsData.map((item, index) => (
        <ItemCardLoc key={index} {...item} />
      ))}
    </div>
  );
};

export default ItemsGridLoc;