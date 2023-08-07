import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import loginUser from './Login';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { status, isLoggedIn, setIsLoggedIn, setStatus,setUser } = useContext(AuthContext);
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
    <div className="container">
      <h1>เข้าสู่ระบบ</h1>
      <br/>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">ชื่อบัญชีผู้ใช้</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">รหัสผ่าน</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn button">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
