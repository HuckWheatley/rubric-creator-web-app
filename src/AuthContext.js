import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        if (currentUser.email && currentUser.email.endsWith('@hkis.edu.hk')) {
          setUser(currentUser);
          setError(null);
        } else {
          signOut(auth);
          setUser(null);
          setError('Only HKIS emails (@hkis.edu.hk) are allowed');
        }
      } else {
        setUser(null);
        setError(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setError(null);
    } catch (err) {
      setError('Logout failed: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
