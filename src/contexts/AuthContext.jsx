import React, { createContext, useContext, useEffect, useState } from 'react';
import { readJSON, writeJSON } from '../utils/localStorageHelpers';
import { apiService } from '../services/api';
const KEY_CURRENT = 'wc_currentUser';
const KEY_TOKENS = 'wc_tokens';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const saved = readJSON(KEY_CURRENT);
    if (saved) setCurrentUser(saved);}, []);
  useEffect(() => {
    if (currentUser) writeJSON(KEY_CURRENT, currentUser);
    else localStorage.removeItem(KEY_CURRENT);}, [currentUser]);
  async function signup(userData) {
    try 
    {
      const result = await apiService.createUser(userData);
      if (result._id || result.id) {
        const newUser = {
          id: result._id || result.id,
          name: result.name,
          email: result.email,
          avatar: result.avatar};
        setCurrentUser(newUser);
        return { success: true };
      } 
      else 
      {
        return { success: false, message: 'Signup failed' };
      }
    } 
    catch (error) 
    {
      console.error('Signup error:', error);
      return { 
        success: false, 
        message: error.message.includes('Email already exists') 
          ? 'Email already exists' 
          : 'Signup failed' 
      };
    }
  }
  function login(user) 
  {
    setCurrentUser(user);
    return { success: true };
  }

  function logout() 
  {
    setCurrentUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}