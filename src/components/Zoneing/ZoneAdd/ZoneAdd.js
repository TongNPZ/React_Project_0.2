import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ZoneAdd = () => {
  const navigate = useNavigate();
  const House_API = 'http://26.90.237.200:3000/admin/house_zone/add';

  const [addName, setAddName] = useState('');

  const addZone = async () => {
    const data = {
      addName: addName,
    };
  
    try {
      const shouldAdd = window.confirm('คุณต้องการทำเพิ่มโซน?');
      if (shouldAdd) {
        const response = await axios.post(House_API, data);
        console.log(response.data);
        alert('เพิ่มสำเร็จ');
        navigate('/Zoneing');
      }
    } catch (error) {
      console.error(error);
      alert('เกิดข้อผิดพลาดในการเพิ่มโซน');
      navigate('/Error');
    }
  };

  return (
    <div className="container">
       <h1>เพิ่มโซนที่ดิน</h1>
      <form>
        <div className="mb-3">
   
          <div>
            <label htmlFor="addName" className="form-label">
              โซน
            </label>
            <input
              type="text"
              className="form-control"
              id="addName"
              value={addName}
              onChange={(e) => setAddName(e.target.value)}
            />
          </div>
         
        </div>
        <button type="button" className="btn btn-primary" onClick={addZone}>
          เพิ่มโซน
        </button>
      </form>
    </div>
  );
};

export default ZoneAdd;