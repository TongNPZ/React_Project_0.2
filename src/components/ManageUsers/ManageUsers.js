import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Login/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const Auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://26.90.237.200:3000/user/read')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const statusUser = (status_authen) => {
    switch (status_authen) {
      case 2:
        return { message: ' ลูกค้า ', colorClass: 'text-primary' };
        case 3:
          return { message: ' ลูกบ้าน ', colorClass: 'text-success' };
      default:
        return { message: ' ไม่ทราบสถานะ', colorClass: '' };
    }
  };

  
  const EditUser = (UserID) => {
    navigate(`/EditUser/${UserID}`);
  };

  return (
    <div className="container">
        <h1>ข้อมูลผู้ลูกค้า</h1>
      <div>
        {users.map((user, idx) => (
          <div className="card" key={idx}>
              {Auth.isLoggedIn && (
                <div className="d-flex justify-content-end">

                  <button className="btn button" onClick={() => EditUser(user.user_id)}>
                      แก้ไข
                    </button>
                </div>
            )}
            <div className="content">
              <p>เลขบัตรประชาชน : {user.user_id}</p>
              <p>ชื่อ : {user.user_name} </p>
              <p>นามสกุล : {user.user_lastname}</p>
              <p>ที่อยู่: {user.user_address}</p>
              <p>อายุ : {user.user_age}</p>
              <p>เบอร์โทร : {user.user_phone}</p>
              <p>ที่อยู่อีเมล : {user.user_email}</p>
              <p>สัญชาติ : {user.nationality}</p>
              <p className="card-text">
                  สถานะ : <span className={`fw-bold ${statusUser(user.status_authen).colorClass}`}>
                    {statusUser(user.status_authen).message}
                  </span>
                </p>
            </div>
            <div className="content">
              <br />
              <br />
              <br />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;