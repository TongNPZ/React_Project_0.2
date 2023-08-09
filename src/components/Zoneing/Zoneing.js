import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Login/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

const Zoneing = () => {
  const Auth = useContext(AuthContext);
  const [zones, setZone] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadHouseTypes();
  }, []);

  const loadHouseTypes = () => {
    axios.get('http://26.90.237.200:3000/admin/house_zone/read')
      .then(response => {
        setZone(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDeleteClick = (house) => {
    const confirmDelete = window.confirm('คุณต้องการลบโซนนี้หรือไม่?');
    if (confirmDelete) {
      const data = { id: house.hz_id };
      console.log(data);
      axios.delete('http://26.90.237.200:3000/admin/house_zone/delete/', {
          data: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          alert('ลบโซนสำเร็จ');
          loadHouseTypes();
        })
        .catch(error => {
          console.error(error);
          alert('เกิดข้อผิดพลาดในการลบโซน');
        });
    }
  };

  const ZoneEdit = (zoneID) => {
    navigate(`/ZoneEdit/${zoneID}`);
  };

  return (
    <div className="container">
      <h1>โซน</h1>
      
      {Auth.isLoggedIn && Auth.status == 1 && (
        <div className="d-flex justify-content-end">
          <button className="btn button06" onClick={() => { navigate('/ZoneAdd'); }}>เพิ่ม</button>
        </div>
      )}

      <br/>
      <div className="row">
        {zones.map((zone, idx) => (
          <div className="col-4" key={idx}>
            <div className="card" >
              <div className="card-body">
                <h5 className="card-title">โซน {zone.name}</h5>
                
                {Auth.isLoggedIn && Auth.status == 1 && (
                  <div className="mt-3 d-flex">
                   
                  
                    <button className="btn button010" onClick={() => handleDeleteClick(zone)}>
                     <MdDelete size={30} /> ลบ
                    </button>

                    <button className="btn button09" onClick={() => ZoneEdit(zone.hz_id)}>
                    <AiFillEdit size={30}  /> แก้ไข
                    </button>

                  </div>
                )}
              </div>
            </div>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Zoneing;
