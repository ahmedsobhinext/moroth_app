// pages/event-manager/index.js
import EventManagerLayout from '../components/EventManagerLayout';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { FiCalendar, FiUsers } from 'react-icons/fi';
import Link from 'next/link';


export default function EventManagerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      const eventsQuery = query(
        collection(db, 'events'),
        where('managerId', '==', user.uid)
      );
      
      const snapshot = await getDocs(eventsQuery);
      const now = new Date();
      
      setStats({
        totalEvents: snapshot.size,
        upcomingEvents: snapshot.docs.filter(doc => 
          new Date(doc.data().date) > now
        ).length
      });
      setLoading(false);
    };

    fetchStats();
  }, [user]);

  if (!user || user.role !== 'eventManager') return <div>Unauthorized</div>;

  return (
    <EventManagerLayout>
      <div className="space-y-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-lg shadow bg-blue-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-full">
                <FiCalendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-gray-500 text-sm">Total Events</h3>
                {loading ? (
                  <div className="h-8 w-12 bg-gray-200 rounded animate-pulse mt-1"></div>
                ) : (
                  <p className="text-2xl font-bold text-gray-800">{stats.totalEvents}</p>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg shadow bg-green-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-full">
                <FiUsers className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-gray-500 text-sm">Upcoming Events</h3>
                {loading ? (
                  <div className="h-8 w-12 bg-gray-200 rounded animate-pulse mt-1"></div>
                ) : (
                  <p className="text-2xl font-bold text-gray-800">{stats.upcomingEvents}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-800">Manage Your Events</h3>
              <p className="text-gray-600">Create and organize cultural events</p>
            </div>
            <Link 
              href="/event-manager/events/new"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create New Event
            </Link>
          </div>
        </div>
      </div>
    </EventManagerLayout>
  );
}