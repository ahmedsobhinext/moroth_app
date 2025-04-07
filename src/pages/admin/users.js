// pages/admin/users.js
import AdminLayout from '../components/AdminLayout';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [viewingUser, setViewingUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      setUsers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchUsers();
  }, []);

  const handleUpdateUser = async () => {
    if (!editingUser) return;
    
    try {
      await updateDoc(doc(db, 'users', editingUser.id), {
        displayName: editingUser.fullName,
        role: editingUser.role
      });
      setUsers(users.map(user => 
        user.id === editingUser.id ? editingUser : user
      ));
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    await deleteDoc(doc(db, 'users', userId));
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-green-800">Manage Users</h2>
        
        {/* View User Modal */}
        {viewingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">User Details</h3>
              <div className="space-y-2">
                <p><strong>Name:</strong> {viewingUser.fullName || 'N/A'}</p>
                <p><strong>Email:</strong> {viewingUser.email}</p>
                <p><strong>Role:</strong> {viewingUser.role}</p>
                {viewingUser.photoURL && (
                  <img 
                    src={viewingUser.photoURL} 
                    alt="User profile" 
                    className="mt-4 w-32 h-32 rounded-full object-cover"
                  />
                )}
              </div>
              <button
                onClick={() => setViewingUser(null)}
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Edit User</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    className="border rounded p-2 w-full"
                    value={editingUser.fullName || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, displayName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    className="border rounded p-2 w-full bg-gray-100"
                    value={editingUser.email}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                    className="border rounded p-2 w-full"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="designer">Designer</option>
                    <option value="eventManager">Event Manager</option>
                  </select>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => setEditingUser(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateUser}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.fullName || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-4">
                    <button
                      onClick={() => setViewingUser(user)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                    <button
                      onClick={() => setEditingUser(user)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
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