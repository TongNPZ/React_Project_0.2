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

  const Cancel = () => {
    navigate(`/Zoneing`);
  };

  return (

    <div className="login-container">
      <div className='box'>
      <h1>เพิ่มโซนบ้าน</h1>
      <form className="login-form text-left">
        <br />
        <div className="form-group">
          <label>  &nbsp;&nbsp;ชื่อโซน </label>
          <input
            type="text"
            className="form-control"
            value={addName}
            onChange={(e) => setAddName(e.target.value)}
          />
        </div>
        <br />

        <div className="row">
          <div className="col-md-12">
            <br />
            <div className="row">
              <div className="col-md-6">
                <button type="button" className="btn button01 btn-send pt-2 btn-block" onClick={addZone}>
                  &nbsp;&nbsp;เพิ่ม&nbsp;&nbsp;
                </button>
              </div>
              <div className="col-md-6">
                <button type="button" className="btn button010 btn-send pt-2 btn-block" onClick={Cancel}>
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
    </div>
  );
};

export default ZoneAdd;