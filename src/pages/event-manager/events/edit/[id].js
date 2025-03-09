import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../../context/AuthContext';
import EventManagerLayout from '../../../components/EventManagerLayout';
import { db } from '../../../../firebase/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

export default function EditEventPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    description: '',
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const docRef = doc(db, 'events', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.managerId !== user?.uid) {
            router.push('/event-manager/events');
            return;
          }
          
          setFormData({
            name: data.name,
            date: data.date.split('T')[0],
            location: data.location,
            description: data.description,
            image: data.image || ''
          });
        } else {
          setError('Event not found');
        }
      } catch (err) {
        setError('Failed to load event data');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEvent();
  }, [id, user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    if (!user || user.role !== 'eventManager') {
      setError('Unauthorized access');
      setSubmitting(false);
      return;
    }

    try {
      await updateDoc(doc(db, 'events', id), {
        ...formData,
        date: new Date(formData.date).toISOString(),
        updatedAt: serverTimestamp()
      });

      router.push('/event-manager/events');
    } catch (err) {
      setError('Failed to update event: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <EventManagerLayout>
        <div className="p-6">Loading event data...</div>
      </EventManagerLayout>
    );
  }

  if (!user || user.role !== 'eventManager') {
    return (
      <EventManagerLayout>
        <div className="p-6 text-red-500">Unauthorized access</div>
      </EventManagerLayout>
    );
  }

  return (
    <EventManagerLayout>
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">Edit Event</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Event Name *
              </label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded-md"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Date *
              </label>
              <input
                type="date"
                required
                className="w-full p-2 border rounded-md"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Location *
              </label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded-md"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                className="w-full p-2 border rounded-md"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              required
              rows="4"
              className="w-full p-2 border rounded-md"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={() => router.push('/event-manager/events')}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </EventManagerLayout>
  );
}