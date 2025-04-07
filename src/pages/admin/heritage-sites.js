// pages/admin/heritage-sites.js
import AdminLayout from '../components/AdminLayout';
import { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export default function HeritageSitesPage() {
  const [sites, setSites] = useState([]);
  const [newSite, setNewSite] = useState({
    name: '',
    location: '',
    description: '',
    photo: ''
  });
  const [viewingSite, setViewingSite] = useState(null);
  const [editingSite, setEditingSite] = useState(null);

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

  const handleUpdateSite = async () => {
    const siteRef = doc(db, 'heritageSites', editingSite.id);
    await updateDoc(siteRef, {
      name: editingSite.name,
      location: editingSite.location,
      description: editingSite.description,
      photo: editingSite.photo
    });
    setSites(sites.map(site => site.id === editingSite.id ? editingSite : site));
    setEditingSite(null);
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

        {/* View Site Modal */}
        {viewingSite && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
              <h3 className="text-xl font-bold mb-4">{viewingSite.name}</h3>
              {viewingSite.photo && (
                <img 
                  src={viewingSite.photo} 
                  alt={viewingSite.name} 
                  className="mb-4 max-h-48 w-full object-cover rounded"
                />
              )}
              <p className="mb-2"><strong>Location:</strong> {viewingSite.location}</p>
              <div className="mb-4">
                <strong>Description:</strong>
                <p className="whitespace-pre-wrap mt-1">{viewingSite.description}</p>
              </div>
              <button
                onClick={() => setViewingSite(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Edit Site Modal */}
        {editingSite && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
              <h3 className="text-xl font-bold mb-4">Edit Heritage Site</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Site Name"
                  className="border rounded p-2"
                  value={editingSite.name}
                  onChange={(e) => setEditingSite({ ...editingSite, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="border rounded p-2"
                  value={editingSite.location}
                  onChange={(e) => setEditingSite({ ...editingSite, location: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Photo URL"
                  className="border rounded p-2"
                  value={editingSite.photo}
                  onChange={(e) => setEditingSite({ ...editingSite, photo: e.target.value })}
                />
                <textarea
                  placeholder="Description"
                  className="border rounded p-2 col-span-2"
                  value={editingSite.description}
                  onChange={(e) => setEditingSite({ ...editingSite, description: e.target.value })}
                />
                <div className="col-span-2 flex justify-end gap-4">
                  <button
                    onClick={() => setEditingSite(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateSite}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
                  <td className="px-6 py-4 whitespace-nowrap space-x-4">
                    <button
                      onClick={() => setViewingSite(site)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                    <button
                      onClick={() => setEditingSite(site)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Edit
                    </button>
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