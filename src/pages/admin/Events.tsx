import { useState } from 'react';
import { Calendar, Plus, Search, Filter, Edit, Trash2, Eye, Clock, MapPin, Users, Bell, CheckCircle } from 'lucide-react';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Mock event data
  const events = [
    { 
      id: 1, 
      title: 'Annual Science Fair', 
      date: '2023-05-25', 
      time: '09:00 AM - 04:00 PM', 
      location: 'Science Building, Room 101', 
      type: 'Academic', 
      status: 'Confirmed', 
      attendees: 120,
      description: 'Showcase of student science projects and experiments'
    },
    { 
      id: 2, 
      title: 'Parent-Teacher Conference', 
      date: '2023-06-02', 
      time: '03:00 PM - 07:00 PM', 
      location: 'Main Auditorium', 
      type: 'Meeting', 
      status: 'Scheduled', 
      attendees: 85,
      description: 'Discuss student progress and academic goals'
    },
    { 
      id: 3, 
      title: 'Sports Day', 
      date: '2023-06-10', 
      time: '08:00 AM - 05:00 PM', 
      location: 'School Grounds', 
      type: 'Extracurricular', 
      status: 'Confirmed', 
      attendees: 350,
      description: 'Inter-school athletic competition'
    },
    { 
      id: 4, 
      title: 'Graduation Ceremony', 
      date: '2023-06-15', 
      time: '02:00 PM - 05:00 PM', 
      location: 'Main Auditorium', 
      type: 'Ceremony', 
      status: 'Planned', 
      attendees: 200,
      description: 'Commencement ceremony for graduating class'
    },
    { 
      id: 5, 
      title: 'Faculty Workshop', 
      date: '2023-05-20', 
      time: '10:00 AM - 01:00 PM', 
      location: 'Conference Room B', 
      type: 'Professional Development', 
      status: 'Completed', 
      attendees: 42,
      description: 'Training on new educational technologies'
    },
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || event.type.toLowerCase() === filterType.toLowerCase();
    const matchesStatus = filterStatus === 'all' || event.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleDeleteEvent = (eventId: number) => {
    console.log(`Deleting event with ID: ${eventId}`);
    // In a real app, you would make an API call to delete the event
  };

  const handleEditEvent = (eventId: number) => {
    console.log(`Editing event with ID: ${eventId}`);
    // In a real app, you would open a modal or navigate to an edit page
  };

  const handleViewEvent = (eventId: number) => {
    console.log(`Viewing event with ID: ${eventId}`);
    // In a real app, you would open a detail view
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Confirmed</span>;
      case 'scheduled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Scheduled</span>;
      case 'planned':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Planned</span>;
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Completed</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Unknown</span>;
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Events Management</h1>
        <p className="text-gray-600">Plan, organize, and manage all school events and activities.</p>
      </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">42</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Confirmed</p>
                <p className="text-2xl font-bold text-gray-900">28</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">14</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg mr-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Attendees</p>
                <p className="text-2xl font-bold text-gray-900">1,847</p>
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
                  placeholder="Search events..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="academic">Academic</option>
                  <option value="meeting">Meeting</option>
                  <option value="extracurricular">Extracurricular</option>
                  <option value="ceremony">Ceremony</option>
                  <option value="professional development">Professional Development</option>
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
                  <option value="planned">Planned</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            
            <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
              <Plus className="h-5 w-5" />
              Create New Event
            </button>
          </div>
        </div>

        {/* Events List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewEvent(event.id)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                      title="View"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleEditEvent(event.id)}
                      className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50"
                      title="Edit"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{event.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{event.date}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-500">{event.attendees} attendees</span>
                    </div>
                    {getStatusBadge(event.status)}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {event.type}
                  </span>
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
                    <Bell className="h-4 w-4 mr-1" />
                    Send Reminder
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Calendar View Toggle */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Calendar View</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Switch to Monthly View
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {[...Array(35)].map((_, i) => {
                const day = i - 4; // Adjust for starting day
                const isCurrentMonth = day > 0 && day <= 31;
                const isToday = day === 19; // Today is May 19th in our mock data
                const hasEvent = day === 20 || day === 25; // Mock event days
                
                return (
                  <div 
                    key={i} 
                    className={`h-24 p-1 border rounded-lg ${
                      isCurrentMonth 
                        ? 'bg-white border-gray-200' 
                        : 'bg-gray-100 border-gray-100 text-gray-400'
                    } ${isToday ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    {isCurrentMonth && (
                      <>
                        <div className={`text-sm font-medium text-center ${
                          isToday ? 'text-blue-600' : 'text-gray-900'
                        }`}>
                          {day}
                        </div>
                        {hasEvent && (
                          <div className="mt-1 space-y-1">
                            <div className="h-1.5 bg-blue-500 rounded-full"></div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      
    </>
  );
};

export default Events;