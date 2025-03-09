// components/DesignerLayout.jsx
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

export default function DesignerLayout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 bg-purple-800 text-white">
        <div className="p-4 text-xl font-bold">Designer Dashboard</div>
        <nav className="mt-6">
          <Link href="/designer" className="block p-4 hover:bg-purple-700">
            Dashboard
          </Link>
          <Link href="/designer/designs" className="block p-4 hover:bg-purple-700">
            My Designs
          </Link>
          <Link href="/designer/catalog" className="block p-4 hover:bg-purple-700">
            Catalog Management
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="text-2xl font-bold text-purple-800">Designer Portal</div>
          <div className="flex items-center gap-4">
            {/* <span>{user?.email}</span>
            <button 
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button> */}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}