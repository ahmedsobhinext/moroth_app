// pages/admin/index.js
import AdminLayout from '../components/AdminLayout';
// import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FiUsers, FiMapPin, FiShoppingBag, FiCoffee, FiCalendar } from 'react-icons/fi';

export default function AdminDashboard() {
//   const { user } = useAuth();
  const [stats, setStats] = useState({
    users: 0,
    sites: 0,
    clothing: 0,
    foods: 0,
    events: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [
        usersSnapshot,
        sitesSnapshot,
        clothingSnapshot,
        foodsSnapshot,
        eventsSnapshot
      ] = await Promise.all([
        getDocs(collection(db, 'users')),
        getDocs(collection(db, 'heritageSites')),
        getDocs(collection(db, 'heritageClothing')),
        getDocs(collection(db, 'heritageFoods')),
        getDocs(collection(db, 'events'))
      ]);

      setStats({
        users: usersSnapshot.size,
        sites: sitesSnapshot.size,
        clothing: clothingSnapshot.size,
        foods: foodsSnapshot.size,
        events: eventsSnapshot.size
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

//   if (!user || user.role !== 'admin') return <div>Unauthorized</div>;

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard 
            icon={<FiUsers className="w-6 h-6" />}
            title="Total Users"
            value={stats.users}
            loading={loading}
            color="bg-blue-100"
          />
          <StatCard 
            icon={<FiMapPin className="w-6 h-6" />}
            title="Heritage Sites"
            value={stats.sites}
            loading={loading}
            color="bg-green-100"
          />
          <StatCard 
            icon={<FiShoppingBag className="w-6 h-6" />}
            title="Traditional Clothing"
            value={stats.clothing}
            loading={loading}
            color="bg-yellow-100"
          />
          <StatCard 
            icon={<FiCoffee className="w-6 h-6" />}
            title="Traditional Foods"
            value={stats.foods}
            loading={loading}
            color="bg-red-100"
          />
          <StatCard 
            icon={<FiCalendar className="w-6 h-6" />}
            title="Upcoming Events"
            value={stats.events}
            loading={loading}
            color="bg-purple-100"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <QuickActionCard 
            title="Manage Heritage Content"
            description="Add or update cultural heritage items"
            link="/admin/heritage-sites"
            buttonText="Go to Heritage"
            icon="🏺"
          />
          <QuickActionCard 
            title="User Management"
            description="View and manage user accounts"
            link="/admin/users"
            buttonText="Manage Users"
            icon="👥"
          />
        </div>
      </div>
    </AdminLayout>
  );
}

const StatCard = ({ icon, title, value, loading, color }) => (
  <div className={`p-6 rounded-lg shadow ${color} hover:shadow-md transition-shadow`}>
    <div className="flex items-center gap-4">
      <div className="p-3 bg-white rounded-full">{icon}</div>
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        {loading ? (
          <div className="h-8 w-12 bg-gray-200 rounded animate-pulse mt-1"></div>
        ) : (
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        )}
      </div>
    </div>
  </div>
);

const QuickActionCard = ({ title, description, link, buttonText, icon }) => (
  <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
    <div className="flex items-start gap-4">
      <span className="text-3xl">{icon}</span>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-green-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <a
          href={link}
          className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          {buttonText}
        </a>
      </div>
    </div>
  </div>
);