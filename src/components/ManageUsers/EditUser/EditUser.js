import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const User_API = "http://26.90.237.200:3000/user/edit";
  const navigate = useNavigate();
  const { Uid } = useParams();
  const [user, setUser] = useState([]);

  const [id, setId] = useState("");
  const [newName, setNewName] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newPhone, setNewPhone] = useState("");
  const [newNationality, setNewNationality] = useState("");

  useEffect(() => {
    loadUserData();
  }, []);

  const userData = { id: Uid };
// console.log(data);
  const loadUserData = () => {
    axios.post(`http://26.90.237.200:3000/user/read/id`,userData)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // "id": "1234567895423",
  // "newName": "testt",
  // "newLastname": "testt",
  // "newAddress": "testt",
  // "newAge": 30,
  // "newNationality": "อังกฤษ",
  // "newPhone": "0958456458"

  const updateUser = async () => {
    const data = {
      id: id || user[0]?.user_id,
      newName: newName || user[0]?.user_name,
      newLastname: newLastname || user[0]?.user_lastname,
      newAddress: newAddress || user[0]?.user_address ,
      newAge: newAge || user[0]?.user_age ,
      newPhone: newPhone || user[0]?.user_phone,
      newNationality: newNationality || user[0]?.nationality,
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
        navigate("/ManageUsers");
      } catch (error) {
        console.error(error);

        // แจ้งเตือนเมื่อเกิดข้อผิดพลาดในการแก้ไขข้อมูล
        window.alert("เกิดข้อผิดพลาดในการแก้ไขข้อมูล");
        navigate("/ManageUsers");
      }
    }
  };

  return (
    <div className="container">
      <h1>แก้ไขข้อมูลผู้ลูกค้า</h1>
      <form>
        {user.map((val, idx) => (
          <div key={idx}>
            <div className="form-group">
              <label>เลขบัตรประชาชน</label>
              <input
                type="text"
                className="form-control"
                value={id || val.user_id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>ชื่อใหม่</label>
              <input
                type="text"
                className="form-control"
                value={newName || val.user_name}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>นามสกุลใหม่</label>
              <input
                type="text"
                className="form-control"
                value={newLastname || val.user_lastname}
                onChange={(e) => setNewLastname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>ที่อยู่ใหม่</label>
              <input
                type="text"
                className="form-control"
                value={newAddress || val.user_address}
                onChange={(e) => setNewAddress(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>อายุใหม่</label>
              <input
                type="number"
                className="form-control"
                value={newAge || val.user_age}
                onChange={(e) => setNewAge(parseInt(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label>สัญชาติ</label>
              <input
                type="text"
                className="form-control"
                value={newNationality || val.nationality}
                onChange={(e) => setNewNationality(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>เบอร์โทรศัพท์ใหม่</label>
              <input
                type="text"
                className="form-control"
                value={newPhone || val.user_phone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
            </div>
            <br />
          </div>
        ))}
        <button type="button" className="btn btn-primary" onClick={updateUser}>
          แก้ไขข้อมูล
        </button>
        
      </form>
    </div>
  );
};

export default EditUser;