import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ZoneEdit = () => {
  const House_API = "http://26.90.237.200:3000/admin/house_zone/edit";
  const navigate = useNavigate();
  
  // const [id, setId] = useState("");
  const [newName, setNewName] = useState("");
  const { Zid } = useParams();
  const [zones, setZones] = useState([]);

  useEffect(() => {
    loadBookingData();
  }, []);

  const data = { id: Zid };
// console.log(data);
  const loadBookingData = () => {
    axios.post(`http://26.90.237.200:3000/admin/house_zone/read/id`,data)
      .then(response => {
        setZones(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const updateEmp = async () => {
    const data = {
      id: Zid,
      newName: newName  || zones.name,
    };
    try {
      const shouldEdit = window.confirm('คุณต้องการแก้ไขหรือไม่?');
      if (shouldEdit) {
        const response = await axios.patch(House_API, data);
        console.log(response.data);
        alert('แก้ไขสำเร็จ');
        navigate('/Zoneing');
      }
    } catch (error) {
      console.error(error);
      alert('เกิดข้อผิดพลาดในการแก้ไข');
      navigate('/Error');
    }
  };
  
// console.log(data)
  return (
    <div className="container">
    <h1>แก้ไขโซน</h1>

    <form>
      {zones.map((val, idx) => (
        <div key={idx}>
          <div className="form-group">
            <label> ชื่อใหม่ </label>
            <input
              type="text"
              className="form-control"
              value={newName || val.name}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>

          <br />
        </div>
      ))}
      <button type="button" className="btn btn-primary" onClick={updateEmp}>
        แก้ไขข้อมูล
      </button>
    </form> 
  </div>
  );
};

export default ZoneEdit;