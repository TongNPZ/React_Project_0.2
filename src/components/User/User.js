import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Login/AuthContext';
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const User = () => {
  const Auth = useContext(AuthContext);
  const [userData, setUserData] = useState([{}]);
  const { Uid } = useParams();

const data = {
    email: Uid
  };

  useEffect(() => {
    axios.post(`http://26.90.237.200:3000/user/read/email`, data)  // append userId to your API call
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);  // add userId as a dependency so that the API call runs every time userId changes

console.log(userData[0].status_authen);

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

  return (
    <div className="container">
        <h1>ข้อมูลผู้ลูกค้า</h1>
      <div>
        {userData.map((user, idx) => (
          <div className="card" key={idx}>
            <div className="content">
            <br/>
            <p>ชื่อผู้ใช้ : {user.user_email}</p>
              <p>เลขบัตรประชาชน : {user.user_id}</p>
              <p>ชื่อ : {user.user_name} </p>
              <p>นามสกุล : {user.user_lastname}</p>
              <p>ที่อยู่: {user.user_address}</p>
              <p>อายุ : {user.user_age}</p>
              <p>เบอร์โทร : {user.user_phone}</p>
              <p>สัญชาติ : {user.nationality}</p>
             
              {/* <p className="card-text">
                  สถานะ : <span className={`fw-bold ${statusUser(user.status_authen).colorClass}`}>
                    {statusUser(user.status_authen).message}
                  </span>
                </p> */}
            </div>
            <br/>
            {Auth.isLoggedIn && (
                <div className="d-flex justify-content-center">
                    <Link to={`/UsePassEdit/${user.user_id}`} className="btn button">
                    แก้ไขรหัสผ่าน
                  </Link>
                </div>
            )}
          <br/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;