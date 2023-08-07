import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const [profile, setProfile] = useState([]);
//   const navigate = useNavigate();

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
    <div className="container">
      <div>
        {profile.map((house, idx) => (
          <div className="" key={idx}>
            <div className="content">
              <h1>โครงการ {house.name}</h1>
              <br/>
              <p>ที่อยู่ {house.address}</p>
            
            </div>
            <div className="content">
              <br />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutUs;