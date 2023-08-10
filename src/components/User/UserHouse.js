import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Login/AuthContext';
import { NumericFormat } from 'react-number-format';
import dayjs from 'dayjs';
import { useParams, useNavigate } from 'react-router-dom';

const UserHouse = () => {
  const Auth = useContext(AuthContext);
  const [houses, setHouses] = useState([]);
  const [zones, setZones] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  const [userData, setUserData] = useState([{}]);
  const [userID, setUserID] = useState([{}]);
  const { Uid } = useParams();

  useEffect(() => {
    const data1 = {
      email: Uid
    };

    // Load user data
    axios.post(`http://26.90.237.200:3000/user/read/email`, data1)
      .then(response => {
        setUserData(response.data);
        if (response.data[0] && response.data[0].user_id) {
          setUserID(response.data[0].user_id);
          const data = {
            userFK: response.data[0].user_id
          }
          return axios.post('http://26.90.237.200:3000/user/read/house/id', data);
        }
      })
      .then(response => {
        if (response) {
          setHouses(response.data);
        }
      })
      .catch(error => {
        console.error(error);
      });

    // Load house types
    loadHouseTypes();
  }, []);

  const loadHouseTypes = () => {
    axios.get('http://26.90.237.200:3000/admin/house_zone/read')
      .then(response => {
        setZones(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const getZoneName = (hz_id) => {
    const matchedZone = zones.find(zone => zone.hz_id === hz_id);
    return matchedZone ? matchedZone.name : 'ไม่มีโซน';
  };


  return (
    <div className="container">
      <h1> บ้านของคุณ </h1>
      <br />
      <br />
      <div className="row">
        {houses.map((house, idx) => (
          <div className="col-4 d-flex mb-4" key={idx}>
            <div className="card " >
              <img className="card-img-top" src={house.image} alt={`House ${house.h_id}`} />
              <div className="card-body">
                <h5 className="card-title">บ้านเลขที่ : {house.h_id}</h5>
                <div className = "text-left"> 
                <p className="card-text">โซน : {getZoneName(house.hz_id)}</p>
                <p className="card-text">แปลนบ้าน : {house.house_plan}</p>
                <p className="card-text">ขนาดพื้นที่ดิน : {house.land_area} ตารางวา</p>
                <p className="card-text">ขนาดพื้นที่ใช้สอย : {house.area} ตารางเมตร</p>
                <p className="card-text">เลขที่โฉนด : {house.num_deed}</p>
                <p className="card-text">เลขที่หน้าสำรวจ : {house.num_survey}</p>
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

export default UserHouse;