import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Clock, RefreshCw } from 'lucide-react';

const AdminPendingApproval = () => {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState<number>(30);
  const [checkingApproval, setCheckingApproval] = useState<boolean>(false);

  // Check approval status periodically
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Check approval status when timer reaches 0
          checkApprovalStatus();
          return 30; // Reset timer
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const checkApprovalStatus = () => {
    setCheckingApproval(true);
    
    // Simulate API call to check approval status
    setTimeout(() => {
      // In a real app, you would check with your backend
      // For demo, we'll check localStorage
      const user = localStorage.getItem('adminUser');
      if (user) {
        const userData = JSON.parse(user);
        if (userData.approved === true) {
          // User has been approved, redirect to admin dashboard
          navigate('/admin/dashboard');
        }
      }
      setCheckingApproval(false);
    }, 1000);
  };

  const handleLogout = () => {
    // Clear admin authentication data
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Pending Approval Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="mx-auto bg-gradient-to-br from-yellow-500 to-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Pending Approval</h2>
            <p className="text-gray-600">Your request for admin access is awaiting approval</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Shield className="h-5 w-5 text-yellow-500 mt-0.5" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Approval Required</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>Your admin access request has been submitted and is awaiting review by an administrator.</p>
                  <p className="mt-2">You will be automatically redirected to the admin dashboard once approved.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Checking for approval in</span>
              <span className="text-sm font-medium text-gray-700">{timeRemaining}s</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-linear" 
                style={{ width: `${((30 - timeRemaining) / 30) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={checkApprovalStatus}
              disabled={checkingApproval}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-800 transition-all disabled:opacity-70"
            >
              {checkingApproval ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Check Now
                </>
              )}
            </button>
            
            <button
              onClick={handleLogout}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all"
            >
              Cancel Request
            </button>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-white text-sm">
            Need help?{' '}
            <button 
              className="font-bold text-blue-300 hover:text-blue-200"
            >
              Contact Administrator
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPendingApproval;