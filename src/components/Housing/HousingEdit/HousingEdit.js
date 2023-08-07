import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';

const HousingEdit = () => {
  const navigate = useNavigate();
  const { Eid } = useParams();
  const [id, setId] = useState('');
  const [housePlan, setHousePlan] = useState('');
  const [numDeed, setNumDeed] = useState('');
  const [numSurvey, setNewNumSurvey] = useState('');
  const [landArea, setLandArea] = useState('');
  const [area, setArea] = useState('');
  const [price, setPrice] = useState('');
  const [note, setNote] = useState('');
  const [BookingPrice, setBookingPrice] = useState('');
  const [image, setImage] = useState('');
  const [zoneId, setZoneId] = useState('');

  const [houseData, setHouseData] = useState([]);
  const [zones, setZones] = useState([]);

  useEffect(() => {
    loadHouseData();
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

  const loadHouseData = () => {
    const data = { number: Eid };
    axios.post('http://26.90.237.200:3000/admin/house/read/number', data)
      .then(response => {
        setHouseData(response.data);
        // console.log(response.data[0].h_id);
        // console.log(response.data[0].house_plan);
            })
      .catch(error => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
      });
  };
  // console.log(houseData);
  const EditHouse = async () => {
    const formData = new FormData();
    formData.append("id", id || houseData[0]?.h_id);
    formData.append("newHousePlan", housePlan || houseData[0]?.house_plan);
    formData.append("newNumDeed", numDeed || houseData[0]?.num_deed);
    formData.append("newNumSurvey", numSurvey || houseData[0]?.num_survey);
    formData.append("newLandArea", landArea || houseData[0]?.land_area);
    formData.append("newArea", area || houseData[0]?.area);
    formData.append("newPrice", price || houseData[0]?.h_price);
    formData.append("newBookingPrice", BookingPrice || houseData[0]?.book_price);
    formData.append("newNote", note || houseData[0]?.h_note);
    formData.append("newImage", image); // ต้องแน่ใจว่าตัวแปร image เก็บค่าไฟล์รูปภาพจาก input file
    formData.append("newidFK", zoneId || houseData[0]?.hz_id); // สระงสามารถเปลี่ยนชื่อ key นี้ให้ตรงกับความต้องการของเซิร์ฟเวอร์
  
    try {
      const shouldEdit = window.confirm('คุณต้องการทำการแก้ไขหรือไม่?');
      if (shouldEdit) {
        const response = await axios.patch(
          'http://26.90.237.200:3000/admin/house/edit',
          formData, // ใช้ formData แทน data
          {
            headers: {
              'Content-Type': 'multipart/form-data', // ตั้งค่า Content-Type เป็น multipart/form-data
            }
          }
        );
        console.log(response.data);
        navigate('/Housing');
      }
    } catch (error) {
      console.error(error);
      navigate('/Error');
    }
  };

  return (
    <div className="container">
         <h1>แก้ไขข้อมูลบ้าน</h1>
      <form>
      {houseData.map((val, idx) => (
        <div key={idx} className="mb-3">
          <div>
            <label htmlFor="id" className="form-label">
              บ้านเลขที่
            </label>
            <input
               maxLength="6"
              type="text"
              className="form-control"
              id="id"
              value={id || val.h_id}
              onChange={e => setId(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="housePlan" className="form-label">
              แปลนบ้าน
            </label>
            <input
             maxLength="25"
              type="text"
              className="form-control"
              id="housePlan"
              value={housePlan || val.house_plan}
              onChange={e => setHousePlan(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="numDeed" className="form-label">
              เลขที่โฉนด
            </label>
            <input
             maxLength="6"
              type="text"
              className="form-control"
              id="numDeed"
              value={numDeed || val.num_deed}
              onChange={e => setNumDeed(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="numSurvey" className="form-label">
            เลขที่หน้าสำรวจ
            </label>
            <input
              maxLength="5"
              type="text"
              className="form-control"
              id="numSurvey"
              value={numSurvey || val.h_id}
              onChange={e => setNewNumSurvey(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="landArea" className="form-label">
              ขนาดพื้นที่ ตารางวา
            </label>
            <input
              maxLength="10"
              type="number"
              className="form-control"
              id="landArea"
              value={landArea || val.land_area}
              onChange={e => setLandArea(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="area" className="form-label">
              พื้นที่ใช้สอย ตารางเมตร
            </label>
            <input
              maxLength="10"
              type="number"
              className="form-control"
              id="area"
              value={area || val.area}
              onChange={e => setArea(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="price" className="form-label">
              ราคา
            </label>
            <input
            maxLength="20"
              type="number"
              className="form-control"
              id="price"
              value={price || val.h_price}
              onChange={e => setPrice(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="newBookingPrice" className="form-label">
            จำนวนเงินมัดจำ
            </label>
            <input
            maxLength="20"
              type="number"
              className="form-control"
              id="newBookingPrice"
              value={BookingPrice || val.book_price}
              onChange={e => setBookingPrice(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="note" className="form-label">
              หมายเหตุ
            </label>
            <input
             maxLength="250"
              type="text"
              className="form-control"
              id="note"
              value={note || val.h_note}
              onChange={e => setNote(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="image" className="form-label">
              รูปภาพ
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              onChange={e => setImage(e.target.files[0])}
            />
          </div>
          <div>
            <label htmlFor="zoneId" className="form-label">
              โซนบ้าน
            </label>
            <DropdownButton
              id="zoneId"
              title={
                zoneId !== ''
                  ? zones.find(zone => zone.hz_id === zoneId)?.name
                  : 'เลือกโซนบ้าน'
              }
              onSelect={e => setZoneId(parseInt(e))}
            >
              {zones.map((zone, idx) => (
                <Dropdown.Item key={idx} eventKey={zone.hz_id}>
                  {zone.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
        </div>
        ))}
        <button type="button" className="btn btn-primary" onClick={EditHouse}>
          แก้ไข
        </button>
      </form>
    </div>
  );
};

export default HousingEdit;