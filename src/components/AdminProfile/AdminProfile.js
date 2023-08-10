import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Login/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState([]);
    const Auth = useContext(AuthContext);

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
        <div className="container mt-4">
            <h1 className="text-center mb-4">ข้อมูลโครงการ</h1>
            <div className="row d-flex justify-content-center">
                {profile.map((val, idx) => (
                    <div className="col-lg-8">
                        <div className="card mb-4 box02" key={idx}>
                            <div className="card-body text-center">
                                <div className="d-flex justify-content-end">
                                    {/* Insert any content you want to display in this section */}
                                </div>
                                <img
                                    className="card-img-top mb-3"
                                    src={val.image}
                                    alt={`House ${val.he_id}`}
                                    style={{ width: "400px", height: "200px" }}
                                />
                                  <h5>โครงการ {val.name}</h5>
                                <div className='card text-left p-4'>
                                   
                                    <p>ชื่อบริษัท : {val.company}</p>
                                    <p>ชื่อผู้จัดการ : {val.manager_name} {val.manager_lastname}</p>
                                    <p>ที่อยู่โครงการ : {val.address}</p>
                                    <p>เบอร์โทร : {val.phone}</p>
                                    <p>อัตตราผ่อน : {val.down_rate} %</p>
                                    {/* <p>เงินส่วนกลาง : {val.common_money}</p> */}
                                </div>
                                <br/>
                                {Auth.isLoggedIn && Auth.status == 1 && (
                                    <div className='row mt-3'>
                                        <div className='col-6'>
                                            <button className="btn button09" onClick={() => { navigate('/AdminProfileEdit'); }}>
                                                แก้ไขข้อมูล
                                            </button>
                                        </div>
                                        <div className='col-6'>
                                            <button className="btn button09" onClick={() => { navigate(`/AdminUsePassEdit/${val.he_id}`); }}>
                                                แก้ไขรหัสผ่าน
                                            </button>
                                        </div>
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

export default AdminProfile;
