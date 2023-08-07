import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [status, setStatus] = useState(localStorage.getItem('userStatus') || false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
  const [user, setUser] = useState(localStorage.getItem('user') || '');

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('loggedIn') === 'true';
    const userStatus = localStorage.getItem('userStatus');
    const storedUser = localStorage.getItem('user');
    setIsLoggedIn(loggedInStatus);
    setStatus(userStatus);
    setUser(storedUser);
  }, []);


  useEffect(() => {
    localStorage.setItem('user', user);
  }, [user]);


  return (
    <AuthContext.Provider value={{ status, isLoggedIn, setIsLoggedIn, setStatus, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
