// components/DesignsGrid.js
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import DesignCard from './DesignCard';
import { useCart } from '../../context/CartContext'; // Create this context

const DesignsGrid = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'designs'));
        const designsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().name,
          designer: doc.data().designer,
          price: 150,
          imageUrl: doc.data().image,
          detailsLink: `/designs/${doc.id}`,
        }));
        setDesigns(designsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  if (loading) return <div className="text-center py-8 text-amber-900">جاري التحميل...</div>;
  if (error) return <div className="text-center py-8 text-red-600">حدث خطأ: {error}</div>;

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {designs.map((design) => (
        <DesignCard 
          key={design.id}
          {...design}
          onAddToCart={() => addToCart(design)}
        />
      ))}
    </div>
  );
};

export default DesignsGrid;