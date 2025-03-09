// pages/admin/heritage-sites.js
import AdminLayout from '../components/AdminLayout';
import { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs, addDoc, deleteDoc,doc } from 'firebase/firestore';

export default function HeritageSitesPage() {
  const [sites, setSites] = useState([]);
  const [newSite, setNewSite] = useState({
    name: '',
    location: '',
    description: '',
    photo: ''
  });

  useEffect(() => {
    const fetchSites = async () => {
      const querySnapshot = await getDocs(collection(db, 'heritageSites'));
      setSites(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchSites();
  }, []);

  const handleAddSite = async () => {
    const docRef = await addDoc(collection(db, 'heritageSites'), newSite);
    setSites([...sites, { id: docRef.id, ...newSite }]);
    setNewSite({ name: '', location: '', description: '', photo: '' });
  };

  const handleDeleteSite = async (siteId) => {
    await deleteDoc(doc(db, 'heritageSites', siteId));
    setSites(sites.filter(site => site.id !== siteId));
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-green-800">Manage Heritage Sites</h2>

        {/* Add New Site Form */}
        <div className="mb-8 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Add New Heritage Site</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Site Name"
              className="border rounded p-2"
              value={newSite.name}
              onChange={(e) => setNewSite({ ...newSite, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Location"
              className="border rounded p-2"
              value={newSite.location}
              onChange={(e) => setNewSite({ ...newSite, location: e.target.value })}
            />
            <input
              type="text"
              placeholder="Photo URL"
              className="border rounded p-2"
              value={newSite.photo}
              onChange={(e) => setNewSite({ ...newSite, photo: e.target.value })}
            />
            <textarea
              placeholder="Description"
              className="border rounded p-2 col-span-2"
              value={newSite.description}
              onChange={(e) => setNewSite({ ...newSite, description: e.target.value })}
            />
            <button
              onClick={handleAddSite}
              className="col-span-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Site
            </button>
          </div>
        </div>

        {/* Sites List */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sites.map(site => (
                <tr key={site.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{site.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{site.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDeleteSite(site.id)}
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