import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import AuthProvider from './components/Login/AuthContext';
import LoginForm from './components/Login/LoginForm';
import Homepage from './components/Homepage/Homepage';
import Profile from './components/User/Profile';
import User from './components/User/User';
import '../src/components/Css/All.css';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/login' element={
          <AuthProvider>
            <LoginForm />
          </AuthProvider>
        } />

        <Route
          path='/*'
          element={
            <>
              <NavBar />

              {/* Home Page */}
              <Routes>
                <Route path='/' element={
                  <AuthProvider>
                    <Homepage />
                  </AuthProvider>
                } />
              </Routes>
              {/*  */}

              {/* User */}
              <Routes>
                <Route path='/profile' element={
                  <AuthProvider requireStatus={['1']}>
                    <Profile />
                  </AuthProvider>
                } />
              </Routes>

              <Routes>
                <Route path='/user' element={
                  <AuthProvider requireStatus={['1']}>
                    <User />
                  </AuthProvider>
                } />
              </Routes>
              {/*  */}
              
            </>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;