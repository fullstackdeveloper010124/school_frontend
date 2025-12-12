import { useState } from 'react';
import { Download, Filter, Calendar, BarChart3, TrendingUp, Users, BookOpen, Shield, Printer } from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('attendance');
  const [dateRange, setDateRange] = useState('monthly');
  
  // Mock data for charts
  const attendanceData = [
    { date: '2023-05-01', present: 85, absent: 15, late: 5 },
    { date: '2023-05-02', present: 92, absent: 8, late: 3 },
    { date: '2023-05-03', present: 78, absent: 22, late: 7 },
    { date: '2023-05-04', present: 88, absent: 12, late: 4 },
    { date: '2023-05-05', present: 95, absent: 5, late: 2 },
    { date: '2023-05-06', present: 76, absent: 24, late: 8 },
    { date: '2023-05-07', present: 89, absent: 11, late: 3 },
  ];

  const userData = [
    { name: 'Students', value: 1248 },
    { name: 'Teachers', value: 85 },
    { name: 'Parents', value: 980 },
    { name: 'Staff', value: 42 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];

  const incidentData = [
    { type: 'Minor', count: 42 },
    { type: 'Moderate', count: 18 },
    { type: 'Serious', count: 3 },
    { type: 'Critical', count: 1 },
  ];

  const reportTypes = [
    { id: 'attendance', name: 'Attendance Report', icon: Users, description: 'Daily, weekly, and monthly attendance statistics' },
    { id: 'academic', name: 'Academic Performance', icon: BookOpen, description: 'Student grades, test scores, and academic progress' },
    { id: 'security', name: 'Security Incidents', icon: Shield, description: 'Security events, violations, and response times' },
    { id: 'financial', name: 'Financial Summary', icon: TrendingUp, description: 'Budget, expenses, and financial performance' },
    { id: 'facility', name: 'Facility Usage', icon: BarChart3, description: 'Room utilization, maintenance, and equipment' },
    { id: 'user', name: 'User Activity', icon: PieChart, description: 'Login statistics, user engagement, and behavior' },
  ];

  const handleExport = (format: string) => {
    console.log(`Exporting ${selectedReport} report in ${format} format`);
    // In a real app, you would generate and download the report
  };

  const handlePrint = () => {
    console.log(`Printing ${selectedReport} report`);
    // In a real app, you would open the print dialog
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
        <p className="text-gray-600">Generate and analyze comprehensive reports for school management.</p>
      </div>

        {/* Report Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {reportTypes.map((report) => {
            const Icon = report.icon;
            return (
              <div 
                key={report.id}
                className={`bg-white rounded-xl shadow-sm p-6 border-2 cursor-pointer transition-all hover:shadow-md ${
                  selectedReport === report.id 
                    ? 'border-blue-500 ring-2 ring-blue-100' 
                    : 'border-gray-100 hover:border-gray-200'
                }`}
                onClick={() => setSelectedReport(report.id)}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg mr-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{report.name}</h3>
                </div>
                <p className="text-sm text-gray-600">{report.description}</p>
              </div>
            );
          })}
        </div>

        {/* Report Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Filter by department..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                onClick={() => handleExport('pdf')}
              >
                <Download className="h-5 w-5" />
                Export PDF
              </button>
              <button 
                className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                onClick={() => handleExport('excel')}
              >
                <Download className="h-5 w-5" />
                Export Excel
              </button>
              <button 
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                onClick={handlePrint}
              >
                <Printer className="h-5 w-5" />
                Print
              </button>
            </div>
          </div>
        </div>

        {/* Report Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Attendance Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Trends</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="present" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Present" />
                  <Area type="monotone" dataKey="absent" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Absent" />
                  <Area type="monotone" dataKey="late" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} name="Late" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* User Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name || ''}: ${percent ? (percent * 100).toFixed(0) : '0'}%`}
                  >
                    {userData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Incident Report */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Incidents</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incidentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Incident Count">
                  {incidentData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Report Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 text-blue-500 mr-2" />
                <h4 className="font-medium text-gray-900">Attendance Rate</h4>
              </div>
              <p className="text-2xl font-bold text-gray-900">87.4%</p>
              <p className="text-sm text-green-600 mt-1">↑ 2.3% from last period</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Shield className="h-5 w-5 text-red-500 mr-2" />
                <h4 className="font-medium text-gray-900">Security Incidents</h4>
              </div>
              <p className="text-2xl font-bold text-gray-900">64</p>
              <p className="text-sm text-red-600 mt-1">↑ 5 from last period</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                <h4 className="font-medium text-gray-900">Performance Index</h4>
              </div>
              <p className="text-2xl font-bold text-gray-900">84.2</p>
              <p className="text-sm text-green-600 mt-1">↑ 3.1 points from last period</p>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default Reports;