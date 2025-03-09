// pages/designer/designs/new.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../context/AuthContext';
import DesignerLayout from '../../components/DesignerLayout';
import { db } from '../../../firebase/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function NewDesignPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    region: '',
    description: '',
    catalogId: ''
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    if (!user || user.role !== 'designer') {
      setError('Unauthorized access');
      setSubmitting(false);
      return;
    }

    try {
      await addDoc(collection(db, 'designs'), {
        ...formData,
        designerId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      router.push('/designer/designs');
    } catch (err) {
      setError('Failed to create design: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DesignerLayout>
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-purple-800 mb-6">New Traditional Design</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Design Name *
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
                Region *
              </label>
              <input
                type="text"
                required
                className="w-full p-2 border rounded-md"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Image URL *
              </label>
              <input
                type="url"
                required
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
              onClick={() => router.push('/designer/designs')}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? 'Creating...' : 'Create Design'}
            </button>
          </div>
        </form>
      </div>
    </DesignerLayout>
  );
}