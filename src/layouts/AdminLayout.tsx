import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  Users, 
  User, 
  Shield, 
  Menu, 
  X, 
  Home, 
  Settings,
  LogOut
} from 'lucide-react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Users', href: '/admin/users', icon: User },
    { name: 'Volunteers', href: '/admin/volunteers', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    // Clear authentication tokens
    localStorage.removeItem('adminToken');
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-semibold text-gray-800">Admin Panel</span>
          </div>
          <button 
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        
        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    location.pathname === item.href
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* Mobile header */}
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 lg:hidden">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-blue-600" />
            <span className="ml-2 text-lg font-semibold text-gray-800">Admin</span>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;