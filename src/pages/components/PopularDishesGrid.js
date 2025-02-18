// components/PopularDishesGrid.js

import DishCard from './DishCard';

const dishesData = [
  {
    title: 'جريش',
    subtitle: 'طبق رئيسي',
    imageUrl: 'jareesh.png',
    recipeLink: '/jareesh/recipe',
  },
  {
    title: 'كبسة لحم',
    subtitle: 'طبق رئيسي',
    imageUrl: 'kabsa.png',
    recipeLink: '/kabsa/recipe',
  },
  {
    title: 'عريكة',
    subtitle: 'طبق جانبي',
    imageUrl: 'erika.png',
    recipeLink: '/erika/recipe',
  },
  {
    title: 'كليجا',
    subtitle: 'طبق جانبي',
    imageUrl: 'kleija.png',
    recipeLink: '/kleija/recipe',
  },
];

const PopularDishesGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {dishesData.map((dish, index) => (
        <DishCard key={index} {...dish} />
      ))}
    </div>
  );
};

export default PopularDishesGrid;