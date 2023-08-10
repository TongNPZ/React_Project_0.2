import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Login/AuthContext';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

const ShowHousing = () => {
  const Auth = useContext(AuthContext);
  const [houses, setHouses] = useState([]);
  const [zones, setZones] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadHouses();
    loadHouseTypes();

  }, []);

  const loadHouses = () => {
    axios.get('http://26.90.237.200:3000/admin/house/read')
      .then(response => {
        setHouses(response.data);
        response.data.forEach(house => {
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const loadHouseTypes = () => {
    axios.get('http://26.90.237.200:3000/admin/house_zone/read')
      .then(response => {
        setZones(response.data);

      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleShowAllClick = () => {
    axios.get('http://26.90.237.200:3000/admin/house/read')
      .then(response => {
        setHouses(response.data);
        setSelectedType(null);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleZoneClick = (zone) => {
    const data = { id: zone.hz_id };
    setSelectedType(data);
    axios.post('http://26.90.237.200:3000/admin/house/read/zone', data)
      .then(response => {
        setHouses(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  console.log(selectedType)
  const handleDeleteClick = (house) => {
    const confirmDelete = window.confirm('คุณต้องการลบบ้านนี้หรือไม่?');
    if (confirmDelete) {
      const data = { id: house.h_id };
      axios.delete(`http://26.90.237.200:3000/admin/house/delete/`, {
        data: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          alert('ลบบ้านสำเร็จ');
          // toast.success("ลบบ้านสำเร็จ!")
          // ดำเนินการหลังจากลบบ้านสำเร็จ (เช่น อัปเดตรายการบ้าน)
          loadHouses(); // เรียกโหลดรายการบ้านอีกครั้งหลังจากลบ
        })
        .catch(error => {
          console.error(error);
          // toast.error("เกิดข้อผิดพลาดในการลบบ้าน!")
          alert('ผิดพลาด');
        });
    }
  };

  const detail = () => {
    navigate(`/Planner`);
  };

  const HousingAdd = () => {
    navigate(`/HousingAdd`);
  };

  const AddBooking = (houseID) => {
    navigate(`/AddBooking/${houseID}`);
  };

  const HousingEdit = (houseNo) => {
    navigate(`/HousingEdit/${houseNo}`);
  };

  const statusCancel = (status) => {
    switch (status) {
      case 0:
        return { message: ' ยังไม่ขาย ', colorClass: 'text-primary' };
      case 1:
        return { message: ' จองแล้ว ', colorClass: 'text-success' };
      case 2:
        return { message: ' ทำสัญญาแล้ว ', colorClass: 'text-success' };
      case 3:
        return { message: ' ขายแล้ว ', colorClass: 'text-danger' };
      default:
        return { message: ' ไม่ทราบสถานะ', colorClass: '' };
    }
  };

  const getZoneName = (hz_id) => {
    const matchedZone = zones.find(zone => zone.hz_id === hz_id);
    return matchedZone ? matchedZone.name : 'ไม่มีโซน';
  }
  

  return (
    <div className="container">
      <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" className="btn-check" name="btnradio" id="showAll" autoComplete="off" checked={!selectedType} onChange={handleShowAllClick} />
        <label className="btn button" style={{ backgroundColor: '#9847FF', color: '#FFFFFF' }} htmlFor="showAll">ทั้งหมด</label>&nbsp;

        {zones.map((zone, idx) => (
          <React.Fragment key={idx}>
            <input type="radio" className="btn-check" name="btnradio" id={`zone${zone.hz_id}`} autoComplete="off"
              checked={selectedType && selectedType.id === zone.hz_id} onChange={() => handleZoneClick(zone)} />
            &nbsp; <label className="btn button" style={{ backgroundColor: '#9847FF', color: '#FFFFFF' }} htmlFor={`zone${zone.hz_id}`}>{zone.name}</label>   &nbsp;
          </React.Fragment>
        ))}
      </div>

      <br />
      {
        Auth.isLoggedIn && Auth.status == 1 && (
          <div className="d-flex justify-content-end">
            <button className="btn button06 mr-2" onClick={() => HousingAdd()}>
            &nbsp;&nbsp; เพิ่ม  &nbsp;&nbsp;
            </button>
          </div>
        )
      }
      <br />

      <div className="row">
        {/* <button onClick={notify}>Click</button> */}

        {houses.map((house, idx) => (
          <div className="col-4 d-flex mb-4" key={idx}>
            <div className="card ">
              <img className="card-img-top" src={house.image} alt={`House ${house.h_id}`} />
              <div className="card-body">
                <h5 className="card-title">บ้านเลขที่ : {house.h_id}</h5>
                <div className='text-left'>
                  <p className="card-text">โซน : {getZoneName(house.hz_id)}</p>
                  <p className="card-text">แปลนบ้าน : {house.house_plan}</p>
                  <p className="card-text">ขนาดพื้นที่ดิน : {house.land_area} ตารางวา</p>
                  <p className="card-text">ขนาดพื้นที่ใช้สอย : {house.area} ตารางเมตร</p>
                  <p className="card-text">
                    สถานะ : <span className={`fw-bold ${statusCancel(house.status).colorClass}`}>
                      {statusCancel(house.status).message}
                    </span>
                  </p>

                  {Auth.isLoggedIn && (
                    <div>
                      <p className="card-text">เลขที่โฉนด : {house.num_deed}</p>
                      <p className="card-text">เลขที่หน้าสำรวจ : {house.num_survey}</p>
                      <p className="card-text">หมายเหตุ : {house.h_note}</p>
                    </div>
                  )}
                </div>
                <div className="mt-3 d-flex">

                  {house.status == 0 && (
                    <div className=''>
                      {Auth.isLoggedIn && Auth.status == 1 && (
                        <button className="btn button06 mr-2" onClick={() => AddBooking(house.no)} >
                          &nbsp;&nbsp;&nbsp;&nbsp;จอง&nbsp;&nbsp;&nbsp;&nbsp;</button>
                      )}
                    </div>
                  )}
                  <button className="btn button09 mr-2" onClick={() => detail()}> ดูรายละเอียด </button>

                  {Auth.isLoggedIn && Auth.status == 1 && (
                    <>
                      {house.status == 0 && (
                        <div>
                          <Dropdown >
                            <Dropdown.Toggle variant="" className="nav-link " style={{ color: '#1088d8' }} id="dropdown-basic">
                              <GiHamburgerMenu size={30} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <>
                                <Dropdown.Item onClick={() => HousingEdit(house.no)} >
                                  <AiFillEdit size={30} style={{ color: '#1088d8' }} />แก้ไข
                                </Dropdown.Item>
                              </>
                              <Dropdown.Item onClick={() => handleDeleteClick(house)} >
                                <MdDelete size={30} style={{ color: '#1088d8' }} /> ลบ
                              </Dropdown.Item>

                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      )}
                    </>
                  )}

                </div>
              </div>
            </div>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowHousing;