import create from 'zustand';
import { AuthState, User } from '../types'; // Import the types
import { mockUsers } from '../data/mockData';

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  // Login function that simulates an API call to authenticate the user
  login: async (email: string, password: string) => {
    // Find the user in mock data that matches both email and password
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      set({ user, isAuthenticated: true });
    } else {
      throw new Error('Invalid credentials');
    }
  },

  // Logout function to clear the user state and set isAuthenticated to false
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  // Signup function that simulates a user signup and OTP generation
  signup: async (userData: Partial<User>, password: string) => {
    console.log('Signup data:', { userData, password });
    // Here, you would typically send the OTP to the user's email and validate the password if necessary
  },

  // OTP verification function, checks if the entered OTP matches '123456'
  verifyOTP: async (email: string, otp: string) => {
    if (otp === '123456') {
      // Find the user by email in the mock data
      const user = mockUsers.find(u => u.email === email);
      if (user) {
        // Set the user as verified and authenticated
        set({ user: { ...user, verified: true }, isAuthenticated: true });
      }
    } else {
      throw new Error('Invalid OTP');
    }
  },
}));

export default useAuthStore;
