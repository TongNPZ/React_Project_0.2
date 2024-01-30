import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GetRequst from '../../ConfigApi';
import { Dropdown } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';

const NavBar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const auth = localStorage.getItem('statusAuth');

  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetRequst(`http://26.90.237.200:3000/admin/house_estate`, 'GET', null);
        setProfile(result);
      } catch (error) {
        console.log('Error feching data: ', error);
      }
    }

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('statusAuth');
    localStorage.removeItem('token');

    navigate('/');
  };

  const LoginForm = () => {
    navigate('/login');
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark " style={{ backgroundColor: '#47345F' }}>

        {profile.map((item) => (
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src={`http://26.90.237.200:3000${item.image}`} alt="logo" width="100px" />
            </Link>
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

                    {auth === '1' ? (
                      <>
                        <Dropdown.Item as={Link} to="/">โซนบ้าน</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/">บ้าน</Dropdown.Item>
                      </>
                    ) : (
                      <Dropdown.Item as={Link} to="/">บ้าน</Dropdown.Item>
                    )}

                  </Dropdown.Menu>
                </Dropdown>

                {auth === '1' ? (
                  <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to="/">การจอง</Link>
                    </li>
                  </ul>
                ) : null}

                {(auth === '1' || auth === '3') && (
                  <Dropdown >
                    <Dropdown.Toggle variant="" className="nav-link" id="dropdown-basic">
                      ข้อมูลค่าส่วนกลาง
                    </Dropdown.Toggle>

                    <Dropdown.Menu>

                      {auth === '1' && (
                        <Dropdown.Item as={Link} to="/">เพิ่มข้อมูลค่าส่วนกลาง</Dropdown.Item>
                      )}

                      {auth === '1' && (
                        <Dropdown.Item as={Link} to="/" >ดูข้อมูลค่าส่วนกลาง</Dropdown.Item>
                      )}

                      {auth === '3' && (
                        <Dropdown.Item as={Link} to={`/`} >ดูข้อมูลค่าส่วนกลาง</Dropdown.Item>
                      )}

                    </Dropdown.Menu>
                  </Dropdown>
                )}

                {(auth === '1' || auth === '3') && (
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

                  {token ? (
                    <Dropdown align="end ">
                      <Dropdown.Toggle variant="" id="profile-dropdown" className="custom-icon">
                        {/* <FaHome/> */}
                        <FaUser className="nested-icon button" size={35} />

                        {auth === '1' && (
                          <span className="text-white"> ผู้จัดการ </span>
                        )}

                        <span className="text-white"> {item.user_email} </span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <div>

                          {auth === '1' ? (
                            <>
                              <Dropdown.Item as={Link} to="/"> ข้อมูลโครงการ </Dropdown.Item>
                              <Dropdown.Item as={Link} to="/profile"> ข้อมูลส่วนตัว </Dropdown.Item>
                            </>
                          ) : (
                            <>
                              <Dropdown.Item> บ้านของฉัน </Dropdown.Item>
                              <Dropdown.Item> ข้อมูลส่วนตัว </Dropdown.Item>
                            </>
                          )}

                        </div>
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
        ))}

      </nav>
    </header>
  );
};

export default NavBar;
