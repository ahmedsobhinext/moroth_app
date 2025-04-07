// pages/admin/heritage-foods.js
import AdminLayout from '../components/AdminLayout';
import { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export default function HeritageFoodsPage() {
  const [foods, setFoods] = useState([]);
  const [newFood, setNewFood] = useState({
    name: '',
    region: '',
    recipe: '',
    image: '',
    video: ''
  });
  const [viewingFood, setViewingFood] = useState(null);
  const [editingFood, setEditingFood] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      const querySnapshot = await getDocs(collection(db, 'heritageFoods'));
      setFoods(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchFoods();
  }, []);

  const handleAddFood = async () => {
    const docRef = await addDoc(collection(db, 'heritageFoods'), newFood);
    setFoods([...foods, { id: docRef.id, ...newFood }]);
    setNewFood({ name: '', region: '', recipe: '', image: '', video: '' });
  };

  const handleDeleteFood = async (foodId) => {
    await deleteDoc(doc(db, 'heritageFoods', foodId));
    setFoods(foods.filter(food => food.id !== foodId));
  };

  const handleUpdateFood = async () => {
    const foodRef = doc(db, 'heritageFoods', editingFood.id);
    await updateDoc(foodRef, {
      name: editingFood.name,
      region: editingFood.region,
      recipe: editingFood.recipe,
      image: editingFood.image,
      video: editingFood.video
    });
    setFoods(foods.map(food => food.id === editingFood.id ? editingFood : food));
    setEditingFood(null);
  };

  // Convert YouTube URL to embed format
  const getEmbedUrl = (url) => {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-green-800">Manage Heritage Foods</h2>

        {/* Add New Food Form */}
        <div className="mb-8 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Add New Food</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Food Name"
              className="border rounded p-2"
              value={newFood.name}
              onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Region"
              className="border rounded p-2"
              value={newFood.region}
              onChange={(e) => setNewFood({ ...newFood, region: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              className="border rounded p-2"
              value={newFood.image}
              onChange={(e) => setNewFood({ ...newFood, image: e.target.value })}
            />
            <input
              type="text"
              placeholder="Video URL"
              className="border rounded p-2"
              value={newFood.video}
              onChange={(e) => setNewFood({ ...newFood, video: e.target.value })}
            />
            <textarea
              placeholder="Recipe"
              className="border rounded p-2 col-span-2"
              value={newFood.recipe}
              onChange={(e) => setNewFood({ ...newFood, recipe: e.target.value })}
            />
            <button
              onClick={handleAddFood}
              className="col-span-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Food
            </button>
          </div>
        </div>

        {/* View Food Modal */}
        {viewingFood && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
              <h3 className="text-xl font-bold mb-4">{viewingFood.name}</h3>
              {viewingFood.image && (
                <img 
                  src={viewingFood.image} 
                  alt={viewingFood.name} 
                  className="mb-4 max-h-48 w-full object-cover rounded"
                />
              )}
              <p className="mb-2"><strong>Region:</strong> {viewingFood.region}</p>
              <div className="mb-4">
                <strong>Recipe:</strong>
                <p className="whitespace-pre-wrap mt-1">{viewingFood.recipe}</p>
              </div>
              {viewingFood.video && (
                <div className="aspect-video w-full">
                  <iframe
                    src={getEmbedUrl(viewingFood.video)}
                    className="w-full h-full rounded"
                    allowFullScreen
                  />
                </div>
              )}
              <button
                onClick={() => setViewingFood(null)}
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Edit Food Modal */}
        {editingFood && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
              <h3 className="text-xl font-bold mb-4">Edit Food</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Food Name"
                  className="border rounded p-2"
                  value={editingFood.name}
                  onChange={(e) => setEditingFood({ ...editingFood, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Region"
                  className="border rounded p-2"
                  value={editingFood.region}
                  onChange={(e) => setEditingFood({ ...editingFood, region: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  className="border rounded p-2"
                  value={editingFood.image}
                  onChange={(e) => setEditingFood({ ...editingFood, image: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Video URL"
                  className="border rounded p-2"
                  value={editingFood.video}
                  onChange={(e) => setEditingFood({ ...editingFood, video: e.target.value })}
                />
                <textarea
                  placeholder="Recipe"
                  className="border rounded p-2 col-span-2"
                  value={editingFood.recipe}
                  onChange={(e) => setEditingFood({ ...editingFood, recipe: e.target.value })}
                />
                <div className="col-span-2 flex justify-end gap-4">
                  <button
                    onClick={() => setEditingFood(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateFood}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Foods List */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {foods.map(food => (
                <tr key={food.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{food.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{food.region}</td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-4">
                    <button
                      onClick={() => setViewingFood(food)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                    <button
                      onClick={() => setEditingFood(food)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteFood(food.id)}
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