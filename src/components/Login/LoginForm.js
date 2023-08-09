import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import loginUser from './Login';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { status, isLoggedIn, setIsLoggedIn, setStatus, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await loginUser(username, password, setStatus, setIsLoggedIn);
    // console.log(response)
    if (response.auth) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('user', username);
      setUser(username)

      if ([1, 2, 3].includes(response.status)) {
        navigate('/Housing');

      } else {
        navigate('/'); // เปลี่ยน '/SomeOtherPage' ไปยัง path ที่คุณต้องการให้ผู้ใช้ไปถ้า status ไม่ใช่ 1, 2, 3
      }
    } else {
      localStorage.setItem('loggedIn', 'false');
      navigate('/');
    }
  };

  return (

    <div className=" login-container">
      <div className="box">
        <h2 className="text-center">เข้าสู่ระบบ</h2>
        <form onSubmit={handleSubmit} className="login-form text-left">
          <br/>
          <div className="mb-4">
            <label htmlFor="username" className="form-label">&nbsp;&nbsp;ชื่อบัญชีผู้ใช้</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">&nbsp;&nbsp;รหัสผ่าน</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn button09">เข้าสู่ระบบ</button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default LoginForm;
