import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, X, Menu, BarChart3, Users, FileText, Calendar, UserCheck, TrendingUp, Zap, LogOut, Clock } from 'lucide-react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Check if admin is authenticated
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    // Clear admin authentication data
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out transform lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold">Admin Panel</span>
          </div>
          <button 
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-6">
          <div className="px-4 py-2 text-sm text-gray-400 uppercase tracking-wider">Main</div>
          <a href="/admin/dashboard" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700">
            <BarChart3 className="h-5 w-5 mr-3" />
            Dashboard
          </a>
          <a href="/admin/user-management" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700">
            <Users className="h-5 w-5 mr-3" />
            User Management
          </a>
          <a href="/admin/security-logs" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700">
            <Shield className="h-5 w-5 mr-3" />
            Security Logs
          </a>
          
          <div className="px-4 py-2 mt-6 text-sm text-gray-400 uppercase tracking-wider">System</div>
          <a href="/admin/reports" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700">
            <FileText className="h-5 w-5 mr-3" />
            Reports
          </a>
          <a href="/admin/events" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700">
            <Calendar className="h-5 w-5 mr-3" />
            Events
          </a>
          <a href="/admin/access-control" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700">
            <UserCheck className="h-5 w-5 mr-3" />
            Access Control
          </a>
          
          <div className="px-4 py-2 mt-6 text-sm text-gray-400 uppercase tracking-wider">Settings</div>
          <a href="#" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700">
            <TrendingUp className="h-5 w-5 mr-3" />
            Analytics
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700">
            <Zap className="h-5 w-5 mr-3" />
            Integrations
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button 
                className="lg:hidden mr-4"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Administrator Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  {currentTime.toLocaleTimeString()}
                </span>
              </div>
              
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;