// pages/admin/heritage-foods.js
import AdminLayout from '../components/AdminLayout';
import { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs, addDoc, deleteDoc,doc } from 'firebase/firestore';

export default function HeritageFoodsPage() {
  const [foods, setFoods] = useState([]);
  const [newFood, setNewFood] = useState({
    name: '',
    region: '',
    recipe: '',
    image: '',
    video: ''
  });

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
                  <td className="px-6 py-4 whitespace-nowrap">
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