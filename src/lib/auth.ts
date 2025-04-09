
import { User, mockUsers } from "./mockData";

interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
  error: string | null;
}

let authState: AuthState = {
  isAuthenticated: false,
  currentUser: null,
  error: null,
};

// Function to handle login
export const login = async (username: string, password: string): Promise<AuthState> => {
  // Check if the user exists in the mock data first (for frontend testing)
  const user = mockUsers.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    authState = {
      isAuthenticated: true,
      currentUser: user,
      error: null,
    };
    
    // Store user data in localStorage for persistence
    localStorage.setItem("authUser", JSON.stringify(user));
    return authState;
  }

  // If not found in mock data, would typically check with the backend
  // For now, just return an error
  authState = {
    isAuthenticated: false,
    currentUser: null,
    error: "Invalid username or password",
  };
  return authState;
};

// Function to handle logout
export const logout = (): AuthState => {
  localStorage.removeItem("authUser");
  
  authState = {
    isAuthenticated: false,
    currentUser: null,
    error: null,
  };
  
  return authState;
};

// Function to check if a user is already authenticated (e.g., on page refresh)
export const checkAuth = (): AuthState => {
  const storedUser = localStorage.getItem("authUser");
  
  if (storedUser) {
    const user = JSON.parse(storedUser) as User;
    authState = {
      isAuthenticated: true,
      currentUser: user,
      error: null,
    };
    return authState;
  }
  
  return authState;
};

// Function to register a new user (would typically connect to backend)
export const register = async (
  username: string,
  password: string,
  email: string,
  firstName: string,
  lastName: string
): Promise<AuthState> => {
  // Check if username already exists
  const existingUser = mockUsers.find((u) => u.username === username);
  
  if (existingUser) {
    authState = {
      isAuthenticated: false,
      currentUser: null,
      error: "Username already exists",
    };
    return authState;
  }

  // For the mock frontend version, we don't actually add to the mockUsers array
  // But we can still pretend the registration worked
  const newUser: User = {
    id: String(mockUsers.length + 1),
    username,
    password,
    email,
    firstName,
    lastName,
    role: 'user'
  };
  
  authState = {
    isAuthenticated: true,
    currentUser: newUser,
    error: null,
  };
  
  localStorage.setItem("authUser", JSON.stringify(newUser));
  return authState;
};
