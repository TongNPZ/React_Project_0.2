import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import GetRequst from '../../ConfigApi';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const LoginForm = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const StatusRedirects = (status) => {
    if (status === 1) {
      navigate('/');
    } else if (status === 2) {
      navigate('/');
    } else if (status === 3) {
      navigate('/');
    } else {
      MySwal.fire({
        icon: "error",
        title: "ปฏิเสธการเข้าถึง",
        text: "คุณไม่มีสิทธิ์เข้าใช้งานระบบ",
      }).then(() => {
        navigate('/login');
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var raw = {
        "userEmail": email,
        "userPassword": password
      };

      const result = await GetRequst('http://26.90.237.200:3000/login', 'POST', raw);
      
      if (result.message === 'login success') {
        const { id, statusAuth, token } = result;
        localStorage.setItem('id', id);
        localStorage.setItem('statusAuth', statusAuth);
        localStorage.setItem('token', token);

        StatusRedirects(statusAuth);

        MySwal.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      console.log(error);

      MySwal.fire({
        icon: "error",
        title: "เข้าสู่ระบบล้มเหลว",
        text: "กรุณาตรวจสอบข้อมูลและเข้าสู่ระบบใหม่อีกครั้ง",
      });
    }
  };

  return (
    <div className=" login-container">
      <div className="box">
        <h2 className="text-center">เข้าสู่ระบบ</h2>
        <form onSubmit={handleSubmit} className="login-form text-left">
          <div className="mb-4">
            <label htmlFor="email" className="form-label">อีเมล</label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
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
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn button">เข้าสู่ระบบ</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
