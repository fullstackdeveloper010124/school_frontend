import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Shield, Bell, Calendar, 
  UserPlus } from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { logoutAdmin, isAdminApproved } from '../../utils/adminAuth';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  
  // Check if user is approved admin
  useEffect(() => {
    const approved = isAdminApproved();
    setIsAdmin(approved);
  }, []);

  // Mock data for charts
  const visitorTrendData = [
    { time: '8:00', visitors: 12, volunteers: 8, staff: 15 },
    { time: '9:00', visitors: 28, volunteers: 12, staff: 20 },
    { time: '10:00', visitors: 45, volunteers: 15, staff: 22 },
    { time: '11:00', visitors: 58, volunteers: 18, staff: 25 },
    { time: '12:00', visitors: 72, volunteers: 20, staff: 28 },
    { time: '1:00', visitors: 65, volunteers: 22, staff: 26 },
    { time: '2:00', visitors: 52, volunteers: 19, staff: 24 },
    { time: 'Now', visitors: 42, volunteers: 16, staff: 23 }
  ];

  const securityData = [
    { name: 'Approved', value: 847, color: '#10b981' },
    { name: 'Pending', value: 23, color: '#f59e0b' },
    { name: 'Flagged', value: 8, color: '#ef4444' }
  ];

  const weeklyData = [
    { day: 'Mon', visitors: 234, events: 2 },
    { day: 'Tue', visitors: 189, events: 1 },
    { day: 'Wed', visitors: 312, events: 4 },
    { day: 'Thu', visitors: 267, events: 2 },
    { day: 'Fri', visitors: 298, events: 3 },
    { day: 'Sat', visitors: 145, events: 1 },
    { day: 'Today', visitors: 42, events: 3 }
  ];

  const handleLogout = () => {
    // Clear admin authentication data
    logoutAdmin();
    navigate('/admin/login');
  };

  if (!isAdmin) {
    // Limited view for non-approved users
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mx-auto bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Shield className="h-8 w-8 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Pending Approval</h2>
          <p className="text-gray-600 mb-6">
            Your admin access request is pending approval from an administrator. 
            You will gain full access once approved.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-700">
              <strong>Note:</strong> Some features are restricted until your access is approved.
            </p>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 rounded-xl font-bold hover:from-gray-700 hover:to-gray-800 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  // Full admin view for approved users
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Dashboard Content */}
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-bold">1,248</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-500 text-sm font-medium">↑ 12%</span>
              <span className="text-gray-500 text-sm ml-2">from last month</span>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Security Incidents</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-red-500 text-sm font-medium">↓ 42%</span>
              <span className="text-gray-500 text-sm ml-2">from last month</span>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Bell className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Active Alerts</p>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-gray-500 text-sm">No change</span>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Today's Events</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-blue-500 text-sm font-medium">2 pending</span>
            </div>
          </div>
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Visitor Trend Chart */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Visitor Trends</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitorTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="visitors" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="volunteers" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="staff" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Weekly Activity Chart */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Weekly Activity</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="visitors" fill="#3b82f6" name="Visitors" />
                  <Bar dataKey="events" fill="#10b981" name="Events" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Security Status */}
          <div className="bg-white rounded-2xl shadow-md p-6 lg:col-span-1">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Security Status</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={securityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                  >
                    {securityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {securityData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-md p-6 lg:col-span-2">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-start border-b pb-4 last:border-0 last:pb-0">
                  <div className="p-2 bg-gray-100 rounded-lg mr-3">
                    <UserPlus className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">New user registered</p>
                    <p className="text-sm text-gray-600">John Doe registered as a teacher</p>
                  </div>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;