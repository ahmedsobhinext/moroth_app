// components/ItemsGrid.js

import ItemCard from './ItemCard';

const itemsData = [
  {
    title: 'الأزياء',
    imageUrl: 'clothing.png',
    linkTo:"clothing"
  },
  {
    title: 'الأماكن التراثية',
    imageUrl: 'heritage-places.png',
    linkTo:"heritage-places"
  },
  {
    title: 'الفعاليات الثقافية',
    imageUrl: 'cultural-events.png',
    linkTo:"cultural-events"
  },
  {
    title: 'الأكلات الشعبية',
    imageUrl: 'popular-dishes.png',
    linkTo:"popular-dishes"
  },
];

const ItemsGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {itemsData.map((item, index) => (
        <ItemCard key={index} title={item.title} imageUrl={item.imageUrl} linkTo={item.linkTo} />
      ))}
    </div>
  );
};

export default ItemsGrid;