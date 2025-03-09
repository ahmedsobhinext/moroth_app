// pages/admin/events.js
import AdminLayout from '../components/AdminLayout';
import { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs, addDoc, deleteDoc } from 'firebase/firestore';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
    image: ''
  });

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, 'events'));
      setEvents(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchEvents();
  }, []);

  const handleAddEvent = async () => {
    const docRef = await addDoc(collection(db, 'events'), newEvent);
    setEvents([...events, { id: docRef.id, ...newEvent }]);
    setNewEvent({ name: '', description: '', location: '', date: '', image: '' });
  };

  const handleDeleteEvent = async (eventId) => {
    await deleteDoc(doc(db, 'events', eventId));
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-green-800">Manage Events</h2>

        {/* Add New Event Form */}
        <div className="mb-8 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Add New Event</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Event Name"
              className="border rounded p-2"
              value={newEvent.name}
              onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Location"
              className="border rounded p-2"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            />
            <input
              type="date"
              className="border rounded p-2"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              className="border rounded p-2"
              value={newEvent.image}
              onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
            />
            <textarea
              placeholder="Description"
              className="border rounded p-2 col-span-2"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
            <button
              onClick={handleAddEvent}
              className="col-span-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Event
            </button>
          </div>
        </div>

        {/* Events List */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.map(event => (
                <tr key={event.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{event.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{event.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{event.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
      </div>
    </AdminLayout>
  );
}