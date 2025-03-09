// components/AdminLayout.jsx
import Link from 'next/link';
// import { useAuth } from '../context/AuthContext';

export default function AdminLayout({ children }) {
//   const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 bg-green-800 text-white">
        <div className="p-4 text-xl font-bold">Morouth Admin</div>
        <nav className="mt-6">
          <Link href="/admin" className="block p-4 hover:bg-green-700">
            Dashboard
          </Link>
          <Link href="/admin/users" className="block p-4 hover:bg-green-700">
            Manage Users
          </Link>
          <Link href="/admin/heritage-sites" className="block p-4 hover:bg-green-700">
            Heritage Sites
          </Link>
          <Link href="/admin/heritage-clothing" className="block p-4 hover:bg-green-700">
            Heritage Clothing
          </Link>
        {/* <Link href="/admin/heritage-clothing" className="block p-4 hover:bg-green-700">
            Heritage Clothing
        </Link> */}
        <Link href="/admin/heritage-foods" className="block p-4 hover:bg-green-700">
            Heritage Foods
        </Link>
        <Link href="/admin/events" className="block p-4 hover:bg-green-700">
            Events
        </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="text-2xl font-bold text-green-800">Admin Dashboard</div>
          {/* <div className="flex items-center gap-4">
            <span>{user?.email}</span>
            <button 
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div> */}
        </div>
        {children}
      </div>
    </div>
  );
}