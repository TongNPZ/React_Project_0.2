import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Login/AuthContext';
import { NumericFormat } from 'react-number-format';
import dayjs from 'dayjs';

const UserHouse = () => {
  const Auth = useContext(AuthContext);
  const [houses, setHouses] = useState([]);
  const [zones, setZones] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    loadHouses();
    loadHouseTypes();
    handleZoneClick();
  }, []);

  const handleZoneClick = () => {
    const data = { id: houses.hz_id };
    setSelectedType(data);
    axios.post('http://26.90.237.200:3000/admin/house/read/zone', data)
      .then(response => {
        setHouses(response.data);
      })
      .catch(error => {
        console.error(error);
      });
      console.log(data)
  };

  console.log(houses)
  console.log(houses.map((item)=> item.hz_id))

  const loadHouses = () => {
    axios
      .get('http://26.90.237.200:3000/admin/house/read')
      .then(response => {
        setHouses(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const loadHouseTypes = () => {
    axios
      .get('http://26.90.237.200:3000/admin/house_zone/read')
      .then(response => {
        setZones(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="container">
        <h1> บ้านของคุณ !! </h1>
        <br />
      <br />
      <div className="row">
        {houses.map((house, idx) => (
          <div className="col-4" key={idx}>
            <div className="card " >
            <img className="card-img-top" src={ house.image} alt={`House ${house.h_id}`} />
              <div className="card-body">
                <h5 className="card-title">บ้านเลขที่ : {house.h_id}</h5>
                <p className="card-text">โซน : {house.hz_id}</p>
                <p className="card-text">แปลนบ้าน : {house.house_plan}</p>
                <p className="card-text">ขนาดพื้นที่ดิน : {house.land_area} ตารางวา</p>
                <p className="card-text">ขนาดพื้นที่ใช้สอย : {house.area} ตารางเมตร</p>
                <p className="card-text">เลขที่โฉนด : {house.num_deed}</p>
                <p className="card-text">เลขที่หน้าสำรวจ : {house.num_survey}</p>
              </div>
            </div>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserHouse;