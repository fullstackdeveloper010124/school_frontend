import { useState } from 'react';
import { Save, Shield, Bell, Mail, Database } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: 'School Safety System',
    adminEmail: 'admin@school.edu',
    notifications: true,
    autoApproval: false,
    retentionPeriod: '12 months'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving settings:', settings);
    // In a real app, you would send these settings to your backend
    alert('Settings saved successfully!');
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage system configuration and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">General Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                        Site Name
                      </label>
                      <input
                        type="text"
                        name="siteName"
                        id="siteName"
                        value={settings.siteName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700 mb-1">
                        Administrator Email
                      </label>
                      <input
                        type="email"
                        name="adminEmail"
                        id="adminEmail"
                        value={settings.adminEmail}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Approval Settings</h2>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="autoApproval"
                        id="autoApproval"
                        checked={settings.autoApproval}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="autoApproval" className="ml-2 block text-sm text-gray-700">
                        Auto-approve new user registrations
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Data Retention</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="retentionPeriod" className="block text-sm font-medium text-gray-700 mb-1">
                        Retention Period
                      </label>
                      <select
                        name="retentionPeriod"
                        id="retentionPeriod"
                        value={settings.retentionPeriod}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="6 months">6 months</option>
                        <option value="12 months">12 months</option>
                        <option value="2 years">2 years</option>
                        <option value="5 years">5 years</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        {/* Settings Navigation */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Settings Categories</h2>
            <nav className="space-y-2">
              <a href="#" className="flex items-center px-3 py-2 text-blue-600 bg-blue-50 rounded-md">
                <Shield className="h-5 w-5 mr-3" />
                <span>General</span>
              </a>
              <a href="#" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
                <Bell className="h-5 w-5 mr-3" />
                <span>Notifications</span>
              </a>
              <a href="#" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
                <Mail className="h-5 w-5 mr-3" />
                <span>Email</span>
              </a>
              <a href="#" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
                <Database className="h-5 w-5 mr-3" />
                <span>Data Management</span>
              </a>
            </nav>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-medium text-gray-900 mb-4">System Information</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Version</span>
                <span className="text-sm font-medium text-gray-900">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Last Updated</span>
                <span className="text-sm font-medium text-gray-900">Dec 15, 2023</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Database</span>
                <span className="text-sm font-medium text-gray-900">MongoDB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;