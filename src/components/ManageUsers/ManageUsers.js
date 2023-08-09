import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Login/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';

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
        return { message: ' ลูกค้า', colorClass: '' };
    }
  };

  const EditUser = (UserID) => {
    navigate(`/EditUser/${UserID}`);
  };

  return (
    <div className="container">
      <h1>ข้อมูลลูกค้า</h1>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>เลขบัตรประชาชน</th>
              <th>ชื่อ</th>
              <th>นามสกุล</th>
              <th>ที่อยู่</th>
              <th>อายุ</th>
              <th>เบอร์โทร</th>
              <th>ชื่่อผู้ใช้</th>
              <th>สัญชาติ</th>
              <th>สถานะ</th>
              {Auth.isLoggedIn && (
                <th>
                  <AiFillEdit size={30} style={{ color: '#2E3136' }} />
                  แก้ไข
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>{user.user_id}</td>
                <td>{user.user_name}</td>
                <td>{user.user_lastname}</td>
                <td>{user.user_address}</td>
                <td>{user.user_age}</td>
                <td>{user.user_phone}</td>
                <td>{user.user_email}</td>
                <td>{user.nationality}</td>
                <td>
                  <span className={`fw-bold ${statusUser(user.status_authen).colorClass}`}>
                    {statusUser(user.status_authen).message}
                  </span>
                </td>
                {Auth.isLoggedIn && (
                  <td>
                    <button className="btn button09" onClick={() => EditUser(user.user_id)}>
                      แก้ไข
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
