import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import NavBar from './components/NavBar/NavBar';
import LoginForm from './components/Login/LoginForm';
import Homepage from './components/Homepage/Homepage';
import User from './components/User/User';
import '../src/components/Css/All.css';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={
          <LoginForm />
        } />

        <Route
          path='/*'
          element={
            <>
              {/* <NavBar /> */}

              <Routes>
                <Route path='/home-page' element={
                  <Homepage />
                } />
              </Routes>

              <Routes>
                <Route path='/user' element={
                  <User />
                } />
              </Routes>
            </>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;