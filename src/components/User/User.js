import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Login/AuthContext';
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';

const User = () => {
  const Auth = useContext(AuthContext);
  const [userData, setUserData] = useState([{}]);
  const { Uid } = useParams();
  const navigate = useNavigate();

  const data = {
    email: Uid
  };

  useEffect(() => {
    axios.post(`http://26.90.237.200:3000/user/read/email`, data)  // append userId to your API call
      .then(response => {
        setUserData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);  // add userId as a dependency so that the API call runs every time userId changes

  // console.log(userData[0].status_authen);

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
    <div className="container mt-4 d-flex justify-content-center align-items-center" >
      <div className="row w-100">
        <div className="col-12 text-center">
          <h1>ข้อมูลผู้ใช้</h1>
        </div>
        <br/> <br/> <br/>
        {userData.map((user, idx) => (
          <div className="col-12 d-flex justify-content-center">
            <div className="card box bg-light" key={idx} style={{ maxWidth: '600px' }}>
              <div className='card-body '>
                <div className="card text-left p-4">
                  <br />
                  <p>ชื่อผู้ใช้ : {user.user_email}</p>
                  <p>เลขบัตรประชาชน : {user.user_id}</p>
                  <div className='row'>
                    <div className='col-6'>
                      <p>ชื่อ : {user.user_name} {user.user_lastname}</p>
                    </div>
                  </div>
                  <p>ที่อยู่: {user.user_address}</p>
                  <p>อายุ : {user.user_age}</p>
                  <p>เบอร์โทร : {user.user_phone}</p>
                  <p>สัญชาติ : {user.nationality}</p>
                </div>
                <br />
                <br />
                {Auth.isLoggedIn && (
                  <div className="d-flex justify-content-center">
                    <button className="btn button09" onClick={() => { navigate(`/UsePassEdit/${user.user_id}`); }}>
                      แก้ไขรหัสผ่าน
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}

export default User;