import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true
};

// Dummy roles: 'user' or 'admin'
const dummyUser = {
  id: 1,
  name: "Jane Doe",
  email: "jane@example.com",
  role: "user"
};

// Auth reducer
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false
      };
    case 'FINISH_LOADING':
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Simulate initial auth check
  React.useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'FINISH_LOADING' });
    }, 1000);
  }, []);

  // Login function
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          dispatch({ type: 'LOGIN', payload: dummyUser });
          resolve(true);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  };

  // Logout function
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Register function
  const register = (name, email, password, role) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dummyUser.role = role;
        dummyUser.name = name;
        dummyUser.email = email;
        dispatch({ type: 'LOGIN', payload: dummyUser });
        resolve(true);
      }, 800);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};