// pages/admin/events.js
import AdminLayout from '../components/AdminLayout';
import { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
    image: ''
  });
  const [viewingEvent, setViewingEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

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

  const handleUpdateEvent = async () => {
    const eventRef = doc(db, 'events', editingEvent.id);
    await updateDoc(eventRef, {
      name: editingEvent.name,
      description: editingEvent.description,
      location: editingEvent.location,
      date: editingEvent.date,
      image: editingEvent.image
    });
    setEvents(events.map(event => event.id === editingEvent.id ? editingEvent : event));
    setEditingEvent(null);
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

        {/* View Event Modal */}
        {viewingEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
              <h3 className="text-xl font-bold mb-4">{viewingEvent.name}</h3>
              {viewingEvent.image && (
                <img 
                  src={viewingEvent.image} 
                  alt={viewingEvent.name} 
                  className="mb-4 max-h-48 w-full object-cover rounded"
                />
              )}
              <p className="mb-2"><strong>Date:</strong> {viewingEvent.date}</p>
              <p className="mb-2"><strong>Location:</strong> {viewingEvent.location}</p>
              <p className="mb-4 whitespace-pre-wrap"><strong>Description:</strong> {viewingEvent.description}</p>
              <button
                onClick={() => setViewingEvent(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Edit Event Modal */}
        {editingEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
              <h3 className="text-xl font-bold mb-4">Edit Event</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Event Name"
                  className="border rounded p-2"
                  value={editingEvent.name}
                  onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="border rounded p-2"
                  value={editingEvent.location}
                  onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                />
                <input
                  type="date"
                  className="border rounded p-2"
                  value={editingEvent.date}
                  onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  className="border rounded p-2"
                  value={editingEvent.image}
                  onChange={(e) => setEditingEvent({ ...editingEvent, image: e.target.value })}
                />
                <textarea
                  placeholder="Description"
                  className="border rounded p-2 col-span-2"
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                />
                <div className="col-span-2 flex justify-end gap-4">
                  <button
                    onClick={() => setEditingEvent(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateEvent}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
                  <td className="px-6 py-4 whitespace-nowrap space-x-4">
                    <button
                      onClick={() => setViewingEvent(event)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                    <button
                      onClick={() => setEditingEvent(event)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Edit
                    </button>
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