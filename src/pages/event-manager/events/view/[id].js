import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../../context/AuthContext';
import EventManagerLayout from '../../../components/EventManagerLayout';
import { db } from '../../../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function ViewEventPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
          
          setEventData({
            id: docSnap.id,
            ...data,
            date: new Date(data.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
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

  if (error) {
    return (
      <EventManagerLayout>
        <div className="p-6 text-red-500">{error}</div>
      </EventManagerLayout>
    );
  }

  return (
    <EventManagerLayout>
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">Event Details</h1>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">{eventData.name}</h2>
            </div>

            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Date:</span> {eventData.date}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Location:</span> {eventData.location}
              </p>
            </div>

            {eventData.image && (
              <div className="space-y-2 col-span-full">
                <img 
                  src={eventData.image} 
                  alt={eventData.name}
                  className="max-w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Description</h3>
            <p className="text-gray-600 whitespace-pre-wrap">{eventData.description}</p>
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="button"
              onClick={() => router.push('/event-manager/events')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Back to Events
            </button>
          </div>
        </div>
      </div>
    </EventManagerLayout>
  );
}