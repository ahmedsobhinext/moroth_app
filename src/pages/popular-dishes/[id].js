// pages/events/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

const DishDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [places, setPlaces] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const docRef = doc(db, 'heritageFoods', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const placeData = docSnap.data();
          setPlaces({
            id: docSnap.id,
            ...placeData,
        
          });
        } else {
          setError('الطبق غير موجود');
        }
        setLoading(false);
      } catch (err) {
        setError(err)

        // setError('حدث خطأ أثناء جلب بيانات الحدث');
        setLoading(false);
      }
    };

    if (id) fetchPlaces();
  }, [id,router]);

  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 text-center">
        <p className="text-2xl text-amber-900">جاري التحميل...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 text-center">
        <p className="text-2xl text-red-600">{error}</p>
        <Link href="/" className="mt-4 inline-block text-amber-900 hover:text-amber-700 font-IBMPlexSansArabic">
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/popular-dishes" className="mb-8 inline-block group">
          <button className="flex items-center space-x-2 bg-amber-100 hover:bg-amber-200 px-6 py-3 rounded-full transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <span className="text-amber-900 font-IBMPlexSansArabic text-lg">العودة إلى عرض جميع الأطباق             </span>
          </button>
        </Link>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300">
          <div className="relative">
            <img 
              src={places.image} 
              alt={places.name} 
              className="w-full h-96 object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 to-transparent"></div>
          </div>

          <div className="p-8 sm:p-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-amber-900 mb-6 font-IBMPlexSansArabic leading-tight">
              {places.name}
            </h1>

            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-amber-50 p-6 rounded-xl">
                {/* <div className="flex-1">
                  <p className="text-xl text-amber-700 font-IBMPlexSansArabic mb-2">التاريخ</p>
                  <p className="text-2xl font-semibold text-amber-900 font-IBMPlexSansArabic">
                    {event.date}
                  </p>
                </div> */}
                {places.region && (
                  <div className="flex-1">
                    <p className="text-xl text-amber-700 font-IBMPlexSansArabic mb-2">المنطقة</p>
                    <p className="text-2xl font-semibold text-amber-900 font-IBMPlexSansArabic">
                      {places.region}
                    </p>
                  </div>
                )}
              </div>

              {places.recipe && (
                <div className="mt-10 border-t-2 border-amber-100 pt-10">
                  <h2 className="text-3xl font-bold text-amber-900 mb-6 font-IBMPlexSansArabic">طريقة التحضير</h2>
                  <p className="text-xl text-gray-800 leading-loose font-IBMPlexSansArabic whitespace-pre-line">
                    {places.recipe}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/popular-dishes" className="inline-block bg-amber-900 text-white px-12 py-4 rounded-full 
            hover:bg-amber-800 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl
            font-IBMPlexSansArabic text-xl">
    عرض جميع الأطباق 
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DishDetailsPage;