// pages/designer/index.js
import DesignerLayout from '../components/DesignerLayout';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { FiPackage, FiStar } from 'react-icons/fi';
import Link from 'next/link';


export default function DesignerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalDesigns: 0,
    catalogItems: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      const designsQuery = query(
        collection(db, 'designs'),
        where('designerId', '==', user.uid)
      );
      
      const catalogQuery = query(
        collection(db, 'catalog'),
        where('designerId', '==', user.uid)
      );

      const [designsSnapshot, catalogSnapshot] = await Promise.all([
        getDocs(designsQuery),
        getDocs(catalogQuery)
      ]);
      
      setStats({
        totalDesigns: designsSnapshot.size,
        catalogItems: catalogSnapshot.size
      });
      setLoading(false);
    };

    fetchStats();
  }, [user]);

  if (!user || user.role !== 'designer') return <div>Unauthorized</div>;

  return (
    <DesignerLayout>
      <div className="space-y-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-lg shadow bg-purple-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-full">
                <FiPackage className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-gray-500 text-sm">Total Designs</h3>
                {loading ? (
                  <div className="h-8 w-12 bg-gray-200 rounded animate-pulse mt-1"></div>
                ) : (
                  <p className="text-2xl font-bold text-gray-800">{stats.totalDesigns}</p>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg shadow bg-yellow-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-full">
                <FiStar className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-gray-500 text-sm">Catalog Items</h3>
                {loading ? (
                  <div className="h-8 w-12 bg-gray-200 rounded animate-pulse mt-1"></div>
                ) : (
                  <p className="text-2xl font-bold text-gray-800">{stats.catalogItems}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-purple-800">Design Management</h3>
                <p className="text-gray-600">Create and manage your traditional designs</p>
              </div>
              <Link 
                href="/designer/designs/new"
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                New Design
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DesignerLayout>
  );
}