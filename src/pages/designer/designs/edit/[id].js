import DesignerLayout from '../../../components/DesignerLayout';
import { useAuth } from '../../../../context/AuthContext';
import { db } from '../../../../firebase/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function EditDesign() {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    region: '',
    image: ''
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchDesign = async () => {
      if (!id) return;

      const docRef = doc(db, 'designs', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setDesign({ id: docSnap.id, ...data });
        setFormData({
          name: data.name,
          description: data.description || '',
          region: data.region,
          image: data.image || ''
        });
      }
      setLoading(false);
    };

    fetchDesign();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    if (!formData.name || !formData.region) {
      setError('Name and Region are required fields');
      setSubmitting(false);
      return;
    }

    try {
      await updateDoc(doc(db, 'designs', id), {
        ...formData,
        updatedAt: serverTimestamp()
      });
      router.push(`/designer/designs/view/${id}`);
    } catch (err) {
      console.error('Error updating design:', err);
      setError('Failed to update design. Please try again.');
      setSubmitting(false);
    }
  };

  if (!user || user.role !== 'designer') {
    return <div>Unauthorized</div>;
  }

  if (loading) {
    return (
      <DesignerLayout>
        <div className="animate-pulse space-y-4 p-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </DesignerLayout>
    );
  }

  if (!design) {
    return (
      <DesignerLayout>
        <div className="p-6">Design not found</div>
      </DesignerLayout>
    );
  }

  if (design.designerId !== user.uid) {
    return (
      <DesignerLayout>
        <div className="p-6">You dont have permission to edit this design</div>
      </DesignerLayout>
    );
  }

  return (
    <DesignerLayout>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-purple-800">Edit Design</h1>
          <Link
            href={`/designer/designs/view/${id}`}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            ← Back to View
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Design Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded focus:ring-purple-600 focus:border-purple-600"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Region *
                </label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded focus:ring-purple-600 focus:border-purple-600"
                  required
                >
                  <option value="">Select Region</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded focus:ring-purple-600 focus:border-purple-600"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full px-4 py-2 border rounded focus:ring-purple-600 focus:border-purple-600"
                  placeholder="Add detailed description..."
                ></textarea>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 text-red-600">{error}</div>
          )}

          <div className="mt-8 flex space-x-4">
            <button
              type="submit"
              disabled={submitting}
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
            
            <Link
              href={`/designer/designs/view/${id}`}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </DesignerLayout>
  );
}