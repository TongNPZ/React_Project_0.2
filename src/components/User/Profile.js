import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetRequst from '../../ConfigApi';

const Profile = () => {
    const navigate = useNavigate();

    const [profile, setProfile] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem('id');

        const fetchData = async () => {
            try {
                const result = await GetRequst(`http://26.90.237.200:3000/user/${userId}`, 'GET', null);
                setProfile(result);
            } catch (error) {
                console.log('Error feching data: ', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">ข้อมูลส่วนตัว</h1>
            <div className="row d-flex justify-content-center">

                {profile.map((item) => (
                    <div className="col-lg-8">
                        <div className="card mb-4 box02">
                            <div className="card-body text-center">
                                <h5>{item.status_authen === 1 ? "ผู้จัดการ" : item.status_authen === 2 ? "ลูกค้า" : item.status_authen === 3 ? "ลูกบ้าน" : "ไม่มีสิทธิ์ใช้งานระบบ"}</h5>
                                <div className='card text-left p-4'>
                                    <p>บัตรประชาชน : {item.user_id}</p>
                                    <p>ชื่อ : {item.user_name} {item.user_lastname}</p>
                                    <p>ที่อยู่ : {item.user_address}</p>
                                    <p>อายุ : {item.user_age}</p>
                                    <p>สัญชาติ : {item.nationality}</p>
                                    <p>เบอร์โทรศัพท์ : {item.user_phone}</p>
                                    <p>อีเมล : {item.user_email}</p>
                                </div>
                                <br />
                                <div className='row mt-3'>
                                    <div className='col-6'>
                                        <button className="btn button09">
                                            แก้ไขข้อมูล
                                        </button>
                                    </div>
                                    <div className='col-6'>
                                        <button className="btn button09">
                                            แก้ไขรหัสผ่าน
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default Profile;
