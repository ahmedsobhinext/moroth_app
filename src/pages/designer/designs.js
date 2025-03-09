// pages/designer/designs.js
import DesignerLayout from '../components/DesignerLayout';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import Link from 'next/link';

export default function DesignerDesigns() {
  const { user } = useAuth();
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDesigns = async () => {
      if (!user) return;

      const designsQuery = query(
        collection(db, 'designs'),
        where('designerId', '==', user.uid)
      );
      
      const snapshot = await getDocs(designsQuery);
      setDesigns(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };

    fetchDesigns();
  }, [user]);

  const handleDeleteDesign = async (designId) => {
    await deleteDoc(doc(db, 'designs', designId));
    setDesigns(designs.filter(design => design.id !== designId));
  };

  if (!user || user.role !== 'designer') return <div>Unauthorized</div>;

  return (
    <DesignerLayout>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-800">Your Designs</h2>
          <Link
            href="/designer/designs/new"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            + New Design
          </Link>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Design Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {designs.map(design => (
                  <tr key={design.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{design.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{design.region}</td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-4">
                      <Link
                        href={`/designer/designs/edit/${design.id}`}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteDesign(design.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DesignerLayout>
  );
}