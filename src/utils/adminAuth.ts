// Admin authentication utility with approval workflow
export const isAdminAuthenticated = (): boolean => {
  const token = localStorage.getItem('adminToken');
  return !!token;
};

export const isAdminApproved = (): boolean => {
  const user = localStorage.getItem('adminUser');
  if (user) {
    const userData = JSON.parse(user);
    return userData.approved === true;
  }
  return false;
};

export const requestAdminAccess = (email: string, password: string, userRole: string): { success: boolean; pendingApproval: boolean } => {
  // For demo purposes, allow any user with a valid email to request admin access
  // In a real application, you would check against your user database
  if (email && password) {
    // Check if this is a super admin (pre-approved)
    if (email === 'admin@school.edu' && password === 'admin123') {
      localStorage.setItem('adminToken', 'admin_token_12345');
      localStorage.setItem('adminUser', JSON.stringify({ email, role: 'administrator', approved: true }));
      return { success: true, pendingApproval: false };
    }
    
    // For regular users, store pending approval status
    localStorage.setItem('adminToken', 'admin_token_12345');
    localStorage.setItem('adminUser', JSON.stringify({ email, role: userRole, approved: false }));
    return { success: true, pendingApproval: true };
  }
  return { success: false, pendingApproval: false };
};

export const logoutAdmin = (): void => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
};