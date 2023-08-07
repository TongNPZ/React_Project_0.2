import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const TransferUser = () => {
  const User_API = "http://26.90.237.200:3000/user/edit-user";
  const navigate = useNavigate();
  const { Uid } = useParams(); // รับค่าพารามิเตอร์ Bid จาก URL
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const account = async () => {
    const data = {
      id: Uid,
      newEmail: newEmail,
      newPassword: newPassword,
    };
console.log(Uid)
    // ถามผู้ใช้ก่อนทำการแก้ไข
    const confirmUpdate = window.confirm("คุณต้องการทำการเพิ่มข้อมูลหรือไม่?");
    if (confirmUpdate) {
      try {
        const response = await axios.patch(User_API, data);
        console.log(response.data);
        // แจ้งเตือนเมื่อแก้ไขเสร็จสิ้น
        window.alert("เพิ่มข้อมูลสำเร็จ");
        navigate("/Housing");
      } catch (error) {
        console.error(error);
        // แจ้งเตือนเมื่อเกิดข้อผิดพลาดในการแก้ไขข้อมูล
        window.alert("เกิดข้อผิดพลาดเพิ่มข้อมูล");
        navigate("/Error");
      }
    }
  };

  return (
    <div className="container">
      <h1>ลงทะเบียนลูกบ้าน</h1>
      <form>
          <div>

          <div className="form-group">
              <label>อีเมล : </label>
              <input
                type="text"
                className="form-control"
                value={ newEmail }
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>รหัสผ่าน :</label>
              <input
                type="password"
                className="form-control"
                value={ newPassword }
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            
            <br />
          </div>

        {/* <button type="button" className="btn btn-primary" onClick={Contract}>
          บันทึก
        </button> */}

        <button type="button" className="btn btn-primary" onClick={account}>
          บันทึก
        </button>
      </form> 
    </div>
  );
};

export default TransferUser;