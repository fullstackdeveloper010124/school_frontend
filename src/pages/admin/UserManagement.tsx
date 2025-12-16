import { useState, useEffect } from 'react';
import { Users, Plus, Search, Filter, Edit, Trash2, Eye, User, Mail, Phone, Calendar, Shield } from 'lucide-react';

// Define the User interface based on the backend model
interface IUser {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  role: "visitor" | "student" | "teacher" | "parent" | "admin";
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch users from the backend API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Assuming the backend is running on localhost:3000
        const response = await fetch('http://localhost:3000/api/admin/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // You'll need to include the admin JWT token here
            // 'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.statusText}`);
        }
        
        const data = await response.json();
        setUsers(data.data.users);
        setError(null);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role.toLowerCase() === filterRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:3000/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      
      // Remove the user from the state
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user. Please try again.');
    }
  };

  const handleEditUser = (userId: string) => {
    console.log(`Editing user with ID: ${userId}`);
    // In a real app, you would open a modal or navigate to an edit page
  };

  const handleViewUser = (userId: string) => {
    console.log(`Viewing user with ID: ${userId}`);
    // In a real app, you would open a detail view
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
        <p className="text-gray-600">Manage all users, roles, and permissions in the system.</p>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter(u => u.isApproved).length}
                </p>
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
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter(u => !u.isApproved).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg mr-4">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Admins</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter(u => u.role === 'admin').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Administrator</option>
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                  <option value="parent">Parent</option>
                  <option value="visitor">Visitor</option>
                </select>
              </div>
            </div>
            
            <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
              <Plus className="h-5 w-5" />
              Add New User
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <User className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Mail className="h-4 w-4 mr-1" />
                              {user.email}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Phone className="h-4 w-4 mr-1" />
                              {user.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === 'admin' ? 'bg-blue-100 text-blue-800' :
                          user.role === 'teacher' ? 'bg-green-100 text-green-800' :
                          user.role === 'student' ? 'bg-purple-100 text-purple-800' :
                          user.role === 'parent' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user.isApproved ? 'Active' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.updatedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleViewUser(user._id)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                            title="View"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleEditUser(user._id)}
                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50"
                            title="Edit"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      {searchTerm || filterRole !== 'all' 
                        ? 'No users found matching your criteria' 
                        : 'No users found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of{' '}
                  <span className="font-medium">{users.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default UserManagement;