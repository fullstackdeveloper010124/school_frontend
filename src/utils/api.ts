const API_BASE_URL = 'https://school-backend-wzms.onrender.com/api'; 

export const api = {
  // Auth endpoints
  signup: async (userData: any) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to signup');
    }
    
    return response.json();
  },
  
  login: async (credentials: { email: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to login');
    }
    
    return response.json();
  },
  
  forgotPassword: async (email: string, role: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, role }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to request password reset');
    }
    
    return response.json();
  },
  
  // Volunteer endpoints
  getVolunteers: async () => {
    const response = await fetch(`${API_BASE_URL}/volunteers`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch volunteers');
    }
    
    return response.json();
  },
  
  createVolunteer: async (volunteerData: any) => {
    const response = await fetch(`${API_BASE_URL}/volunteers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(volunteerData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create volunteer');
    }
    
    return response.json();
  },
  
  updateVolunteer: async (id: string, volunteerData: any) => {
    const response = await fetch(`${API_BASE_URL}/volunteers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(volunteerData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update volunteer');
    }
    
    return response.json();
  },
  
  deleteVolunteer: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/volunteers/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete volunteer');
    }
    
    return response.json();
  },
  
  checkInVolunteer: async (id: string, assignment: string) => {
    const response = await fetch(`${API_BASE_URL}/volunteers/${id}/checkin`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ assignment }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to check in volunteer');
    }
    
    return response.json();
  },
  
  checkOutVolunteer: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/volunteers/${id}/checkout`, {
      method: 'PUT',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to check out volunteer');
    }
    
    return response.json();
  }
};