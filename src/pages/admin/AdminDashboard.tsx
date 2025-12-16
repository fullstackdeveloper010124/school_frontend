import { Users, User, Shield, Calendar } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to the administration panel. Manage users, volunteers, and system settings.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">1,248</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <User className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">1,187</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg mr-4">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-gray-900">32</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg mr-4">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Volunteers</p>
              <p className="text-2xl font-bold text-gray-900">142</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">New user registered</p>
              <p className="text-sm text-gray-500">John Doe registered as a teacher</p>
              <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">Volunteer approved</p>
              <p className="text-sm text-gray-500">Jane Smith was approved as a volunteer</p>
              <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">Role change requested</p>
              <p className="text-sm text-gray-500">Robert Johnson requested role change to parent</p>
              <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex flex-col items-center justify-center p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <User className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Manage Users</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <Users className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Manage Volunteers</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <Shield className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">System Settings</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;