// pages/event-manager/events.js
import EventManagerLayout from '../components/EventManagerLayout';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import Link from 'next/link';

export default function EventManagerEvents() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!user) return;

      const eventsQuery = query(
        collection(db, 'events'),
        where('managerId', '==', user.uid)
      );
      
      const snapshot = await getDocs(eventsQuery);
      setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };

    fetchEvents();
  }, [user]);

  const handleDeleteEvent = async (eventId) => {
    await deleteDoc(doc(db, 'events', eventId));
    setEvents(events.filter(event => event.id !== eventId));
  };

  if (!user || user.role !== 'eventManager') return <div>Unauthorized</div>;

  return (
    <EventManagerLayout>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-800">Your Events</h2>
          <Link
            href="/event-manager/events/new"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + New Event
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map(event => (
                  <tr key={event.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{event.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{event.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-4">
                      <Link
                        href={`/event-manager/events/edit/${event.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
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
    </EventManagerLayout>
  );
}