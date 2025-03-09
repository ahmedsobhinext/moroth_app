// pages/admin/heritage-clothing.js
import AdminLayout from '../components/AdminLayout';
import { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs, addDoc, deleteDoc } from 'firebase/firestore';

export default function HeritageClothingPage() {
  const [clothing, setClothing] = useState([]);
  const [newClothing, setNewClothing] = useState({
    name: '',
    region: '',
    description: '',
    image: '',
    designerId: ''
  });

  useEffect(() => {
    const fetchClothing = async () => {
      const querySnapshot = await getDocs(collection(db, 'heritageClothing'));
      setClothing(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchClothing();
  }, []);

  const handleAddClothing = async () => {
    const docRef = await addDoc(collection(db, 'heritageClothing'), newClothing);
    setClothing([...clothing, { id: docRef.id, ...newClothing }]);
    setNewClothing({ name: '', region: '', description: '', image: '', designerId: '' });
  };

  const handleDeleteClothing = async (clothingId) => {
    await deleteDoc(doc(db, 'heritageClothing', clothingId));
    setClothing(clothing.filter(item => item.id !== clothingId));
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-green-800">Manage Heritage Clothing</h2>

        {/* Add New Clothing Form */}
        <div className="mb-8 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Add New Clothing</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Clothing Name"
              className="border rounded p-2"
              value={newClothing.name}
              onChange={(e) => setNewClothing({ ...newClothing, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Region"
              className="border rounded p-2"
              value={newClothing.region}
              onChange={(e) => setNewClothing({ ...newClothing, region: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              className="border rounded p-2"
              value={newClothing.image}
              onChange={(e) => setNewClothing({ ...newClothing, image: e.target.value })}
            />
            <input
              type="text"
              placeholder="Designer ID"
              className="border rounded p-2"
              value={newClothing.designerId}
              onChange={(e) => setNewClothing({ ...newClothing, designerId: e.target.value })}
            />
            <textarea
              placeholder="Description"
              className="border rounded p-2 col-span-2"
              value={newClothing.description}
              onChange={(e) => setNewClothing({ ...newClothing, description: e.target.value })}
            />
            <button
              onClick={handleAddClothing}
              className="col-span-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Clothing
            </button>
          </div>
        </div>

        {/* Clothing List */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Designer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clothing.map(item => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.region}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.designerId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDeleteClothing(item.id)}
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