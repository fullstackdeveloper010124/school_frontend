import { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, User, Users, Shield, Clock, CheckCircle, XCircle } from 'lucide-react';

const AccessControl = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Mock access control data
  const accessRules = [
    { 
      id: 1, 
      name: 'Student Portal Access', 
      role: 'Student', 
      status: 'Active', 
      resources: ['Grades', 'Assignments', 'Schedule'], 
      permissions: ['Read', 'Submit'],
      lastModified: '2023-05-15',
      createdBy: 'Admin User'
    },
    { 
      id: 2, 
      name: 'Teacher Dashboard', 
      role: 'Teacher', 
      status: 'Active', 
      resources: ['Student Records', 'Grades', 'Attendance'], 
      permissions: ['Read', 'Write', 'Modify'],
      lastModified: '2023-05-10',
      createdBy: 'Admin User'
    },
    { 
      id: 3, 
      name: 'Parent Access', 
      role: 'Parent', 
      status: 'Active', 
      resources: ['Child Grades', 'Attendance', 'Announcements'], 
      permissions: ['Read'],
      lastModified: '2023-05-12',
      createdBy: 'Admin User'
    },
    { 
      id: 4, 
      name: 'Admin Panel', 
      role: 'Administrator', 
      status: 'Active', 
      resources: ['All System Resources'], 
      permissions: ['Full Access'],
      lastModified: '2023-05-01',
      createdBy: 'System'
    },
    { 
      id: 5, 
      name: 'Guest Access', 
      role: 'Visitor', 
      status: 'Inactive', 
      resources: ['Public Areas', 'Announcements'], 
      permissions: ['Read'],
      lastModified: '2023-04-28',
      createdBy: 'Admin User'
    },
  ];

  const filteredRules = accessRules.filter(rule => {
    const matchesSearch = rule.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          rule.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || rule.role.toLowerCase() === filterRole.toLowerCase();
    const matchesStatus = filterStatus === 'all' || rule.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleDeleteRule = (ruleId: number) => {
    console.log(`Deleting access rule with ID: ${ruleId}`);
    // In a real app, you would make an API call to delete the rule
  };

  const handleEditRule = (ruleId: number) => {
    console.log(`Editing access rule with ID: ${ruleId}`);
    // In a real app, you would open a modal or navigate to an edit page
  };

  const handleViewRule = (ruleId: number) => {
    console.log(`Viewing access rule with ID: ${ruleId}`);
    // In a real app, you would open a detail view
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>;
      case 'inactive':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Inactive</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Unknown</span>;
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Control</h1>
        <p className="text-gray-600">Manage user roles, permissions, and access policies for the system.</p>
      </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Access Rules</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Rules</p>
                <p className="text-2xl font-bold text-gray-900">21</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg mr-4">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Inactive Rules</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg mr-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">User Roles</p>
                <p className="text-2xl font-bold text-gray-900">6</p>
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
                  placeholder="Search access rules..."
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
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="parent">Parent</option>
                  <option value="administrator">Administrator</option>
                  <option value="visitor">Visitor</option>
                </select>
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
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
              <Plus className="h-5 w-5" />
              Create Access Rule
            </button>
          </div>
        </div>

        {/* Access Rules Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rule Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resources</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{rule.name}</div>
                      <div className="text-sm text-gray-500">by {rule.createdBy}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        rule.role === 'Administrator' ? 'bg-blue-100 text-blue-800' :
                        rule.role === 'Teacher' ? 'bg-green-100 text-green-800' :
                        rule.role === 'Student' ? 'bg-purple-100 text-purple-800' :
                        rule.role === 'Parent' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {rule.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {rule.resources.slice(0, 2).join(', ')}
                        {rule.resources.length > 2 && (
                          <span className="text-gray-500"> +{rule.resources.length - 2} more</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {rule.permissions.slice(0, 2).join(', ')}
                        {rule.permissions.length > 2 && (
                          <span className="text-gray-500"> +{rule.permissions.length - 2} more</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(rule.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {rule.lastModified}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleViewRule(rule.id)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                          title="View"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEditRule(rule.id)}
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50"
                          title="Edit"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteRule(rule.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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
                  Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
                  <span className="font-medium">24</span> results
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
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    2
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Role-Based Access Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Role-Based Access Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { role: 'Administrator', access: 'Full System Access', color: 'blue' },
              { role: 'Teacher', access: 'Student Records, Grades, Attendance', color: 'green' },
              { role: 'Student', access: 'Personal Records, Assignments', color: 'purple' },
              { role: 'Parent', access: 'Child Information, Announcements', color: 'yellow' },
              { role: 'Staff', access: 'Department Resources', color: 'indigo' },
              { role: 'Visitor', access: 'Public Areas Only', color: 'gray' },
            ].map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className={`p-2 bg-${item.color}-100 rounded-lg mr-3`}>
                    <User className={`h-5 w-5 text-${item.color}-600`} />
                  </div>
                  <h4 className="font-medium text-gray-900">{item.role}</h4>
                </div>
                <p className="text-sm text-gray-600">{item.access}</p>
              </div>
            ))}
          </div>
        </div>
      
    </>
  );
};

export default AccessControl;