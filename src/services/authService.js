import apiClient from './apiClient';

// Simulate user roles
const mockUsers = [
  {
    id: '1',
    name: "AymaneVV",
    email: "aymanevv@gmail.com",
    role: "user",
    token: "mock-user-token"
  },
  {
    id: '2',
    name: "Aymane Laffigh",
    email: "aymanelaffigh@gmail.com",
    role: "admin",
    token: "mock-admin-token"
  }
];

const authService = {
  // Login user
  login: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate backend validation
    const user = mockUsers.find(u => u.email === email);
    
    if (!user || password !== "password") {
      throw new Error("Invalid credentials");
    }
    
    // Save token to localStorage
    localStorage.setItem("token", user.token);
    localStorage.setItem("user", JSON.stringify(user));
    
    return { data: user };
  },

  // Register user
  register: async (name, email, password, role = "user") => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validate input
    if (!name || !email || !password) {
      throw new Error("Please fill in all fields");
    }
    
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      role,
      token: `mock-${role}-token-${Date.now()}`
    };
    
    // Save to localStorage
    localStorage.setItem("token", newUser.token);
    localStorage.setItem("user", JSON.stringify(newUser));
    
    return { data: newUser };
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // Check auth status
  checkAuth: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    
    return {
      isAuthenticated: !!token,
      user: user ? JSON.parse(user) : null
    };
  }
};

export default authService;