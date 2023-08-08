import React, { useContext,useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Login/AuthContext';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const AdminProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const Auth = useContext(AuthContext);
//   const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://26.90.237.200:3000/admin/read')
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error(error);
      });

  }, []);

  return (
    <div className="container">
         <h1>ข้อมูลผู้จัดการ</h1>
      <div>
        {profile.map((val, idx) => (
          <div className="card" key={idx}>
             {Auth.isLoggedIn && (
        <div className="d-flex justify-content-end">
          
        </div>
      )}
            <div className="content">
            <img className="card-img-top" src={val.image} alt={`House ${val.he_id}`} style={{width: "400px", height: "200px"}}/>
            <br/>
            <br/>
              <h5>โครงการ {val.name}</h5>
              <p> ชื่อบริษัท : {val.company}</p>
              <p>ชื่อผู้จัดการ : {val.manager_name} {val.manager_lastname}</p>
              <p>ที่อยู่โครงการ : {val.address}</p>
              <p> เบอร์โทร : {val.phone}</p>
              {/* <p>ชื่อบัญชีผู้ใช้ : {val.he_username}</p> */}
              {/* <p type="password">รหัสผ่าน : {val.he_password}</p> */}
              <p> อัตตราผ่อน : {val.down_rate} %</p>
              <p> เงินส่วนกลาง : {val.common_money}</p>

              {Auth.isLoggedIn && Auth.status == 1 && (
                <div> 
                  <button className="btn button04" onClick={() => { navigate('/AdminProfileEdit'); }}> แก้ไขขอมูล</button>
                      &nbsp;
                  <button className="btn button04" onClick={() => { navigate(`/AdminUsePassEdit/${val.he_id}`); }}>แก้ไขรหัสผ่าน</button>
                </div>
              )}

            </div>
            <div className="content">
              <br />
              <br/>
              <br/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProfile;