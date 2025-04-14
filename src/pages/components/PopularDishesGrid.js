// components/PopularDishesGrid.js

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
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
 const [items, setItems] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
 
   useEffect(() => {
     const fetchPopularDishes = async () => {
       try {
         const querySnapshot = await getDocs(collection(db, 'heritageFoods'));
         const dishData = querySnapshot.docs.map(doc => ({
           id: doc.id,
           title: doc.data().name,
           subtitle: 'طبق رئيسي',
           imageUrl: doc.data().image,
           recipeLink: `/popular-dishes/${doc.id}`,
         }));
         setItems(dishData);
         setLoading(false);
       } catch (err) {
         console.log(err);
         
         setError(err)
         // setError(err.message);
         setLoading(false);
       }
     };
 
     fetchPopularDishes();
   }, []);
 
   if (loading) return <div className="text-center py-8 text-amber-900">جاري التحميل...</div>;
   if (error) return <div className="text-center py-8 text-red-600">حدث خطأ: {error}</div>;
 
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {items.map((dish, index) => (
        <DishCard key={index} {...dish} />
      ))}
    </div>
  );
};

export default PopularDishesGrid;