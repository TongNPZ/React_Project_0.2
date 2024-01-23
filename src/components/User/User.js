import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetRequst from '../../ConfigApi';
import ModalUserEdit from './ModalUserEdit';

const User = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await GetRequst("http://26.90.237.200:3000/user", 'GET', null)
        setUserData(result.data)
      } catch (error) {
        console.log('Error Fecthing Data ', error)
      }
    }

    fetchUser();
  }, []);

  // const statusUser = (status_authen) => {
  //   switch (status_authen) {
  //     case 2:
  //       return { message: ' ลูกค้า ', colorClass: 'text-primary' };
  //     case 3:
  //       return { message: ' ลูกบ้าน ', colorClass: 'text-success' };
  //     default:
  //       return { message: ' ไม่ทราบสถานะ', colorClass: '' };
  //   }
  // };

  return (
    <div className="container" >
      <div className="text-center mt-5">
        <h1>ข้อมูลผู้ใช้</h1>
      </div>
      <div className='row'>
        <div className='card-group'>
          {userData.map((user) => (
            <div className="card box bg-light mt-5">
              <div className='card-body'>
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
                <div className="text-center">
                  <ModalUserEdit />
                  <button className="btn button09" onClick={() => { navigate(`/UsePassEdit/${user.user_id}`); }}>
                    แก้ไขรหัสผ่าน
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}

export default User;