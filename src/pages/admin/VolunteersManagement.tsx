import { useState, useEffect } from 'react';
import { Users, Plus, Search, Filter, Edit, Trash2, Eye, User, Mail, Phone, Calendar, CheckCircle, XCircle } from 'lucide-react';

// Define the Volunteer interface based on the backend model
interface IVolunteer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'active' | 'pending_approval' | 'inactive';
  backgroundCheck: 'completed' | 'pending' | 'expired';
  backgroundCheckDate: string | null;
  hoursThisMonth: number;
  totalHours: number;
  joinDate: string;
  lastVisit: string | null;
  schedule: string;
  emergencyContact: string;
  skills: string[];
  isCheckedIn: boolean;
  checkInTime: string | null;
  currentAssignment: string | null;
  createdAt: string;
  updatedAt: string;
}

const VolunteersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [volunteers, setVolunteers] = useState<IVolunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch volunteers from the backend API
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        setLoading(true);
        // Fixed to use the correct backend URL (port 3000) and include authorization header
        const response = await fetch('http://localhost:3000/api/volunteers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch volunteers: ${response.statusText}`);
        }
        
        const data = await response.json();
        // Extract volunteers from the response object
        setVolunteers(data.volunteers || data);
        setError(null);
      } catch (err) {
        console.error('Error fetching volunteers:', err);
        setError('Failed to load volunteers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchVolunteers();
  }, []);
  
  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         volunteer.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || volunteer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteVolunteer = async (volunteerId: string) => {
    if (!window.confirm('Are you sure you want to delete this volunteer?')) {
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:3000/api/volunteers/${volunteerId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete volunteer');
      }
      
      // Remove the volunteer from the state
      setVolunteers(volunteers.filter(volunteer => volunteer._id !== volunteerId));
    } catch (err) {
      console.error('Error deleting volunteer:', err);
      alert('Failed to delete volunteer. Please try again.');
    }
  };

  const handleEditVolunteer = (volunteerId: string) => {
    console.log(`Editing volunteer with ID: ${volunteerId}`);
    // In a real app, you would open a modal or navigate to an edit page
  };

  const handleViewVolunteer = (volunteerId: string) => {
    console.log(`Viewing volunteer with ID: ${volunteerId}`);
    // In a real app, you would open a detail view
  };
  
  const handleCheckIn = async (volunteerId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/volunteers/${volunteerId}/checkin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ assignment: 'General Assistance' }) // You might want to prompt for assignment
      });
      
      if (!response.ok) {
        throw new Error('Failed to check in volunteer');
      }
      
      // Update the volunteer in the state
      setVolunteers(volunteers.map(v => 
        v._id === volunteerId ? {...v, isCheckedIn: true, checkInTime: new Date().toISOString()} : v
      ));
    } catch (err) {
      console.error('Error checking in volunteer:', err);
      alert('Failed to check in volunteer. Please try again.');
    }
  };
  
  const handleCheckOut = async (volunteerId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/volunteers/${volunteerId}/checkout`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to check out volunteer');
      }
      
      // Update the volunteer in the state
      setVolunteers(volunteers.map(v => 
        v._id === volunteerId ? {...v, isCheckedIn: false, checkInTime: null, currentAssignment: null} : v
      ));
    } catch (err) {
      console.error('Error checking out volunteer:', err);
      alert('Failed to check out volunteer. Please try again.');
    }
  };
  
  // Format status badge
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending_approval':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Format background check badge
  const getBackgroundCheckBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Volunteer Management</h1>
        <p className="text-gray-600">Manage all volunteers, check-ins, and permissions in the system.</p>
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
                <p className="text-sm text-gray-500">Total Volunteers</p>
                <p className="text-2xl font-bold text-gray-900">{volunteers.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Volunteers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {volunteers.filter(v => v.status === 'active').length}
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
                <p className="text-sm text-gray-500">Checked In</p>
                <p className="text-2xl font-bold text-gray-900">
                  {volunteers.filter(v => v.isCheckedIn).length}
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
                <p className="text-sm text-gray-500">Pending Approval</p>
                <p className="text-2xl font-bold text-gray-900">
                  {volunteers.filter(v => v.status === 'pending_approval').length}
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
                  placeholder="Search volunteers..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="pending_approval">Pending Approval</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
              <Plus className="h-5 w-5" />
              Add New Volunteer
            </button>
          </div>
        </div>

        {/* Volunteers Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volunteer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Background Check</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-In Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVolunteers.length > 0 ? (
                  filteredVolunteers.map((volunteer) => (
                    <tr key={volunteer._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <User className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{volunteer.name}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Mail className="h-4 w-4 mr-1" />
                              {volunteer.email}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Phone className="h-4 w-4 mr-1" />
                              {volunteer.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{volunteer.role}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(volunteer.status)}`}>
                          {volunteer.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBackgroundCheckBadgeClass(volunteer.backgroundCheck)}`}>
                          {volunteer.backgroundCheck}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{volunteer.hoursThisMonth} this month</div>
                        <div className="text-sm text-gray-500">{volunteer.totalHours} total</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {volunteer.isCheckedIn ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Checked In
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Checked Out
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          {!volunteer.isCheckedIn ? (
                            <button
                              onClick={() => handleCheckIn(volunteer._id)}
                              className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-50"
                              title="Check In"
                            >
                              <CheckCircle className="h-5 w-5" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleCheckOut(volunteer._id)}
                              className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                              title="Check Out"
                            >
                              <XCircle className="h-5 w-5" />
                            </button>
                          )}
                          <button
                            onClick={() => handleViewVolunteer(volunteer._id)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                            title="View"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleEditVolunteer(volunteer._id)}
                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50"
                            title="Edit"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteVolunteer(volunteer._id)}
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
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      {searchTerm || filterStatus !== 'all' 
                        ? 'No volunteers found matching your criteria' 
                        : 'No volunteers found'}
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
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredVolunteers.length}</span> of{' '}
                  <span className="font-medium">{volunteers.length}</span> results
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

export default VolunteersManagement;