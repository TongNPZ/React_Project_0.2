import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';

const HousingAdd = () => {
  const navigate = useNavigate();
  const House_API = 'http://26.90.237.200:3000/admin/house/add';

  const [id, setId] = useState('');
  const [addHousePlan, setAddHousePlan] = useState('');
  const [addNumDeed, setAddNumDeed] = useState('');
  const [addNumsurvey, setAddNumsurvey] = useState('');
  const [addLandArea, setAddLandArea] = useState(0);
  const [addArea, setAddArea] = useState(0);
  const [addPrice, setAddPrice] = useState(0);
  const [addNote, setAddNote] = useState('');
  const [addBookingPrice, setAddBookingPrice] = useState(0);
  const [addImage, setAddImage] = useState(null);
  const [addidFK, setAddidFK] = useState(0);
  const [zones, setZones] = useState([]);

  useEffect(() => {
    loadHouseTypes();
  }, []);
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

  const addHouse = async () => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('addHousePlan', addHousePlan);
    formData.append('addNumDeed', addNumDeed);
    formData.append('addNumSurvey', addNumsurvey);
    formData.append('addLandArea', addLandArea);
    formData.append('addArea', addArea);
    formData.append('addPrice', addPrice);
    formData.append('addBookingPrice', addBookingPrice);
    formData.append('addNote', addNote);
    formData.append('addImage', addImage);
    formData.append('addidFK', addidFK);

    try {
      console.log(formData);
      const shouldAdd = window.confirm('คุณต้องการเพิ่มหรือไม่?');
      if (shouldAdd) {
        const response = await axios.post(House_API, formData, {
          headers: {  
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response.data);
        alert('เพิ่มสำเร็จ');
        navigate('/Housing');
      }
    } catch (error) {
      console.error(error);
      alert('เกิดข้อผิดพลาดในเพิ่มบ้าน');
      navigate('/Error');
    }
  };
  

  return (
    <div className="container">
         <h1>เพิ่มข้อมูลบ้าน</h1>
      <form>
        <div className="mb-3">
          <div>
            <label htmlFor="id" className="form-label">
              บ้านเลขที่
            </label>
            <input
              type="text"
              className="form-control"
              id="id"
              maxLength="6"
              value={id}
              onChange={e => setId(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="addHousePlan" className="form-label">
              แปลนบ้าน
            </label>
            <input
            maxLength="25"
              type="text"
              className="form-control"
              id="addHousePlan"
              value={addHousePlan}
              onChange={e => setAddHousePlan(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="addNumDeed" className="form-label">
              เลขที่โฉนด
            </label>
            <input
            maxLength="6"
              type="text"
              className="form-control"
              id="addNumDeed"
              value={addNumDeed}
              onChange={e => setAddNumDeed(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="addNumSurvey" className="form-label">
            เลขที่หน้าสำรวจ
            </label>
            <input
              type="text"
              className="form-control"
              id="addNumSurvey"
              maxLength="5"
              value={addNumsurvey}
              onChange={e => setAddNumsurvey(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="addLandArea" className="form-label">
              ขนาดพื้นที่ ตารางวา
            </label>
            <input
            maxLength="10"
              type="number"
              className="form-control"
              id="addLandArea"
              value={addLandArea}
              onChange={e => setAddLandArea(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="addArea" className="form-label">
              พื้นที่ใช้สอย ตารางเมตร
            </label>
            <input
            maxLength="10"
              type="number"
              className="form-control"
              id="addArea"
              value={addArea}
              onChange={e => setAddArea(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="addPrice" className="form-label">
              ราคา
            </label>
            <input
            maxLength="20"
              type="number"
              className="form-control"
              id="addPrice"
              value={addPrice}
              onChange={e => setAddPrice(parseInt(e.target.value))}
            />
          </div>

            <div>
            <label htmlFor="addBookingPrice" className="form-label">
            จำนวนเงินมัดจำ
            </label>
            <input
              maxLength="20"
              type="number"
              className="form-control"
              id="addBookingPrice"
              value={addBookingPrice}
              onChange={e => setAddBookingPrice(parseInt(e.target.value))}
            />
          </div>

          <div>
            <label htmlFor="addNote" className="form-label">
              หมายเหตุ
            </label>
            <input
              type="text"
              maxLength="250"
              className="form-control"
              id="addNote"
              value={addNote}
              onChange={e => setAddNote(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="addImage" className="form-label">
              รูปภาพ
            </label>
            <input
              type="file"
              className="form-control"
              id="addImage"
              onChange={e => setAddImage(e.target.files[0])}
            />
          </div>
          <div>
            <label htmlFor="addidFK" className="form-label">
              โซนบ้าน
            </label>
            <DropdownButton 
              id="addidFK"
              title={addidFK !== 0 ? zones.find(zone => zone.hz_id === addidFK)?.name : 'เลือกโซนบ้าน'}
              onSelect={e => setAddidFK(parseInt(e))} >
              {zones.map((zone, idx) => (
                <Dropdown.Item key={idx} eventKey={zone.hz_id} >
                  {zone.name } 
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
        </div>
        <button type="button" className="btn button" onClick={addHouse}>
          เพิ่มบ้าน
        </button>
      </form>
    </div>
  );
};

export default HousingAdd;