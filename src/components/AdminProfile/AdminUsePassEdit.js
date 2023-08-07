import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from '../Login/AuthContext';

const AdminUsePassEdit = () => {
  const Auth = useContext(AuthContext);
  const User_API = "http://26.90.237.200:3000/admin/edit-user";
  const navigate = useNavigate();
  const { Uid } = useParams();  
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updateUser = async () => {
    const data = {
      id: Uid ,
      newUsername: newUsername ,
      newPassword: newPassword,
    };
console.log(data)
    const confirmUpdate = window.confirm("คุณต้องการทำการแก้ไขข้อมูลหรือไม่?");

    if (confirmUpdate) {
      try {
        const response = await axios.patch(User_API, data);
        console.log(response.data);

        // แจ้งเตือนเมื่อแก้ไขเสร็จสิ้น
        window.alert("แก้ไขข้อมูลสำเร็จ");
        localStorage.setItem('loggedIn', 'false');
        localStorage.removeItem('token');
        Auth.setIsLoggedIn(false);
        navigate('/');

      } catch (error) {
        console.error(error);

        // แจ้งเตือนเมื่อเกิดข้อผิดพลาดในการแก้ไขข้อมูล
        window.alert("เกิดข้อผิดพลาดในการแก้ไขข้อมูล");
        navigate("/error");
      }
    }
  };

  return (
    <div className="container">
      <h1>แก้ไขชื่อผู้ใช้และรหัสผ่าน</h1>
      <form>
            <div className="form-group">
              <label>ชื่อผู้ใช้</label>
              <input
                type="username"
                className="form-control"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>รหัสผ่าน</label>
              <input
                type="password"
                className="form-control"
                value={ newPassword }
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <br />
        <button type="button" className="btn btn-primary" onClick={updateUser}>
          แก้ไขข้อมูล
        </button>
        
      </form>
    </div>
  );
};

export default AdminUsePassEdit;