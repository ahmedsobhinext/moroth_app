import DesignerLayout from '../../../components/DesignerLayout';
import { useAuth } from '../../../../context/AuthContext';
import { db } from '../../../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ViewDesign() {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDesign = async () => {
      if (!id) return;

      const docRef = doc(db, 'designs', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setDesign({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log('No such document!');
      }
      setLoading(false);
    };

    fetchDesign();
  }, [id]);

  if (!user || user.role !== 'designer') {
    return <div>Unauthorized</div>;
  }

  if (loading) {
    return (
      <DesignerLayout>
        <div className="animate-pulse space-y-4 p-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </DesignerLayout>
    );
  }

  if (!design) {
    return (
      <DesignerLayout>
        <div className="p-6">Design not found</div>
      </DesignerLayout>
    );
  }

  // Check if current user is the owner of the design
  if (design.designerId !== user.uid) {
    return (
      <DesignerLayout>
        <div className="p-6">You dont have permission to view this design</div>
      </DesignerLayout>
    );
  }

  return (
    <DesignerLayout>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-purple-800 mb-2">{design.name}</h1>
            <p className="text-gray-600">
              Created: {new Date(design.createdAt?.toDate()).toLocaleDateString()}
              {design.updatedAt && (
                <span className="ml-4">
                  Last updated: {new Date(design.updatedAt?.toDate()).toLocaleDateString()}
                </span>
              )}
            </p>
          </div>
          <Link
            href="/designer/designs"
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            ← Back to Designs
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {design.image && (
              <div className="mb-6">
                <img
                  src={design.image}
                  alt={design.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Region</h3>
              <p className="text-gray-700">{design.region}</p>
            </div>
          </div>

          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Description</h3>
              <p className="text-gray-700 whitespace-pre-line">{design.description}</p>
            </div>

            <div className="flex space-x-4 mt-8">
              <Link
                href={`/designer/designs/edit/${design.id}`}
                className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
              >
                Edit Design
              </Link>
              <Link
                href="/designer/designs"
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300"
              >
                Back to List
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DesignerLayout>
  );
}