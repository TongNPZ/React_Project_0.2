import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from '../Login/AuthContext';

const EditUser = () => {
  const Auth = useContext(AuthContext);
  const User_API = "http://26.90.237.200:3000/user/edit-user";
  const navigate = useNavigate();
  const { Uid } = useParams();
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updateUser = async () => {
    const data = {
      id: Uid,
      newUsername: newUsername,
      newPassword: newPassword,
    };
    // console.log(data)
    // ถามผู้ใช้ก่อนทำการแก้ไข
    const confirmUpdate = window.confirm("คุณต้องการทำการแก้ไขข้อมูลหรือไม่?");

    if (confirmUpdate) {
      try {
        const response = await axios.patch(User_API, data);
        console.log(response.data);

        // แจ้งเตือนเมื่อแก้ไขเสร็จสิ้น
        window.alert("แก้ไขข้อมูลสำเร็จ");
        // navigate("/User/:Uid");
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
    <div className="login-container">
      <div className="box ">
        <h2>แก้ไขชื่อผู้ใช้และรหัสผ่าน</h2>
        <br />
        <form>
          <div className="form-group text-left">
            <label>&nbsp;&nbsp;ชื่อผู้ใช้</label>
            <input
              type="username"
              className="form-control"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </div>
          <br />
          <div className="form-group text-left">
            <label>&nbsp;&nbsp;รหัสผ่าน</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <br />

          <div className="row">
            <div className="col-md-12">
              <br />
              <div className="row">
                <div className="col-md-6">
                  <button type="button" className="btn button09 btn-send pt-2 btn-block" onClick={updateUser}>
                    แก้ไขข้อมูล
                  </button>
                </div>
                <div className="col-md-6">
                  <button className="btn button010" onClick={() => { navigate(`/User/${Uid}`); }}>
                    ยกเลิก
                  </button>
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditUser;