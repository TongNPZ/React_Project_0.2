import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Login/AuthContext';
import { Dropdown } from 'react-bootstrap';
import { FaUser, FaHome } from 'react-icons/fa';
import axios from 'axios';


const NavBar = () => {
  const navigate = useNavigate();
  const Auth = useContext(AuthContext);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    axios.get('http://26.90.237.200:3000/admin/read')
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error(error);

      });

  }, []);

  const handleLogout = () => {
    localStorage.setItem('loggedIn', 'false');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userStatus');
    Auth.setIsLoggedIn(false);
    navigate('/');
  };

  const ManageUsers = () => {
    navigate('/ManageUsers');
  };

  const AdminProfile = () => {
    navigate('/AdminProfile');
  };

  const LoginForm = () => {
    navigate('/LoginForm');
  };
  const UserHouse = (UserId) => {
    navigate(`/UserHouse/${UserId}`);
  };

  return (
    <header>

      <nav className="navbar navbar-expand-lg navbar-dark " style={{ backgroundColor: '#47345F' }}>
        <div className="container-fluid">
          {profile.map((val, idx) => (
            <Link className="navbar-brand" to="/">
              <img src={val.image} alt={`Logo ${val.he_id}`} width="88" height="49" />
            </Link>
          ))}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item me-3">
                <Link className="nav-link" to="/">หน้าหลัก</Link>
              </li>

              <Dropdown >
                <Dropdown.Toggle variant="" className="nav-link" id="dropdown-basic">
                  ข้อมูลบ้าน
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {Auth.status == 1 ? (
                    <>
                      <Dropdown.Item as={Link} to="/Zoneing">โซนบ้าน</Dropdown.Item>
                      <Dropdown.Item as={Link} to="/Housing">บ้าน</Dropdown.Item>
                    </>
                  ) : (
                    <Dropdown.Item as={Link} to="/Housing">บ้าน</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
              {Auth.isLoggedIn ? (
                // ส่วนของโค้ดสำหรับผู้ใช้ที่เข้าสู่ระบบแล้ว
                <ul className="navbar-nav mx-auto">
                  {Auth.status == 1 && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/Booking">การจอง</Link>
                    </li>
                  )}
                </ul>
              ) : null}

              {Auth.isLoggedIn && (Auth.status == 3 || Auth.status == 1) && (
                <Dropdown >
                  <Dropdown.Toggle variant="" className="nav-link" id="dropdown-basic">
                    ข้อมูลค่าส่วนกลาง
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {Auth.status == 1 && (
                      <Dropdown.Item as={Link} to="/AddBill">เพิ่มข้อมูลค่าส่วนกลาง</Dropdown.Item>
                    )}

                    {Auth.status == 1 && (
                      <Dropdown.Item as={Link} to="/AllBill" >ดูข้อมูลค่าส่วนกลาง</Dropdown.Item>
                    )}

                    {Auth.status == 3 && (
                      <Dropdown.Item as={Link} to={`/UserBill/${Auth.user}`} >ดูข้อมูลค่าส่วนกลาง</Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              )}

              {Auth.isLoggedIn && (Auth.status == 1 || Auth.status == 3) && (
                <li className="nav-item">
                  {/* <Link className="nav-link" to="/Bill"> แจ้งปัณหา </Link> */}
                </li>
              )}
              <li className="nav-item">
                {/* <Link className="nav-link" to="/AboutUs">เกี่ยวกับเรา</Link> */}
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item me-3">

                {Auth.isLoggedIn ? (
                  <Dropdown align="end ">
                    <Dropdown.Toggle variant="" id="profile-dropdown" className="custom-icon">
                      {/* <FaHome/> */}
                      <FaUser className="nested-icon button" size={35} />
                      {Auth.status == 1 && (
                        <span className="text-white"> ผู้จัดการ </span>
                      )}
                      <span className="text-white"> {Auth.user} </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {Auth.isLoggedIn && Auth.status == 1 && (
                        <div>
                          <Dropdown.Item onClick={ManageUsers}>ข้อมูลลูกค้า</Dropdown.Item>
                          <Dropdown.Item onClick={AdminProfile}>ข้อมูลผู้จัดการ</Dropdown.Item>
                        </div>
                      )}
                      {Auth.isLoggedIn && (Auth.status == 3 || Auth.status == 2) && (
                        <div>
                          <Dropdown.Item as={Link} to={`/User/${Auth.user}`}> ข้อมูลผู้ใช้ </Dropdown.Item>
                          <Dropdown.Item onClick={() => UserHouse(Auth.user)}> บ้านของคุณ </Dropdown.Item>
                        </div>
                      )}
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogout}>ออกจากระบบ</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <>
                    <button className="btn button" onClick={() => LoginForm()}> เข้าสู่ระบบ </button>

                  </>
                )}

              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
