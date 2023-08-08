import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import NumberFormat from 'react-number-format';

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
        alert('แก้ไขสำเร็จ');
        navigate('/Housing');
      }
    } catch (error) {
      console.error(error);
      alert('แก้ไขไม่สำเร็จ');

      navigate('/Housing');
    }
  };

  return (
    <div className="container">
      <h1>แก้ไขข้อมูลบ้าน</h1>
      <form>
        {houseData.map((val, idx) => (
          <div className="row ">
            <div className="col-lg-7 mx-auto tex">
              <div className="card mt-2 mx-auto p-4 bg-light">
                <div className="card-body bg-light">
                  <div className="container">
                    <form id="contact-form " role="form">
                      <div className="controls text-left">

                        <div className="row">
                          <div className="col-md-12">

                            <div className="form-group">
                              <label htmlFor="id">&nbsp;&nbsp;บ้านเลขที่</label>
                              <input
                                type="text"
                                className="form-control"
                                id="id"
                                maxLength="6"
                                value={id || houseData[0]?.h_id}
                                onChange={e => setId(e.target.value)}
                              />
                            </div>
                            <br />
                            <div className="form-group">
                              <label htmlFor="newHousePlan">&nbsp;&nbsp;แปลนบ้าน</label>
                              <input
                                type="text"
                                className="form-control"
                                id="newHousePlan"
                                maxLength="25"
                                value={housePlan || houseData[0]?.house_plan}
                                onChange={e => setHousePlan(e.target.value)}
                              />
                            </div>
                            <br />
                            <div className='row'>
                              <div className='col-md-6'>
                                <div className="form-group">
                                  <label htmlFor="newNumDeed">&nbsp;&nbsp;เลขที่โฉนด</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="newNumDeed"
                                    maxLength="6"
                                    value={numDeed || houseData[0]?.num_deed }
                                    onChange={e => setNumDeed(e.target.value)}
                                  />
                                </div>
                              </div>

                              <div className='col-md-6'>
                                <div className="form-group">
                                  <label htmlFor="newNumSurvey">&nbsp;&nbsp;เลขที่หน้าสำรวจ</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="newNumSurvey"
                                    maxLength="5"
                                    value={numSurvey || houseData[0]?.num_survey }
                                    onChange={e => setNewNumSurvey(e.target.value)}
                                  />
                                </div>
                              </div>

                            </div>
                            <br />
                            <div className='row'>
                              <div className='col-md-6'>
                                <div className="form-group">
                                  <label htmlFor="newLandArea"> &nbsp;&nbsp;ขนาดพื้นที่ ตารางวา </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="newLandArea"
                                    maxLength="11"
                                    value={landArea || houseData[0]?.land_area}
                                    onChange={e => setLandArea(parseInt(e.target.value))}
                                  />
                                </div>
                              </div>
                              <div className='col-md-6'>
                                <div className="form-group">
                                  <label htmlFor="newArea"> &nbsp;&nbsp;พื้นที่ใช้สอย ตารางเมตร </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="newArea"
                                    maxLength="11"
                                    value={area || houseData[0]?.area }
                                    onChange={e => setArea(parseInt(e.target.value))}
                                  />
                                </div>
                              </div>
                            </div>
                            <br />
                            <div className='row'>
                              <div className='col-md-6'>
                                <div className="form-group">
                                  <label htmlFor="newPrice"> &nbsp;&nbsp;ราคาบ้าน </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="newPrice"
                                    maxLength="15"
                                    value={price || houseData[0]?.h_price }
                                    onChange={e => setPrice(parseInt(e.target.value))}
                                  />
                                </div>

                              </div>
                              <div className='col-md-6'>
                                <div className="form-group">
                                  <label htmlFor="newBookingPrice"> &nbsp;&nbsp;จำนวนเงินมัดจำ </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="newBookingPrice"
                                    maxLength="15"
                                    value={BookingPrice || houseData[0]?.book_price }
                                    onChange={e => setBookingPrice(parseInt(e.target.value))}
                                  />
                                </div>
                              </div>
                            </div>
                            <br />
                            <div className="form-group">
                              <label htmlFor="newNote" > &nbsp;&nbsp;หมายเหตุ <p className='text-danger'>* ไม่จำเป็นต้องใส่ก็ได้  </p></label>
                              <input
                                type="text"
                                className="form-control"
                                id="newNote"
                                maxLength="25"
                                value={note || houseData[0]?.h_note }
                                onChange={e => setNote(e.target.value)}
                              />
                            </div>

                            <br />
                            <div className="form-group">
                              <label htmlFor="newImage" > &nbsp;&nbsp;รูปภาพ </label>
                              <input
                                type="file"
                                className="form-control"
                                id="newImage"
                                onChange={e => setImage(e.target.files[0])}
                              />
                            </div>
                            <br />
                            <div className="form-group">
                              <label htmlFor="newidFK" className="form-label " >&nbsp;&nbsp;โซนบ้าน</label>
                              <select
                                id="newidFK"
                                className="form-control"
                                value={zoneId}
                                onChange={e => setZoneId(parseInt(e.target.value))}
                              >
                                <option value="0">เลือกโซนบ้าน</option>
                                {zones.map((zone, idx) => (
                                  <option key={idx} value={zone.hz_id}>{zone.name}</option>
                                ))}
                              </select>
                            </div>

                          </div>
                        </div>

                        <div className="row">

                          <div className="col-md-12">
                            <br />
                            <button type="button" className="btn button09 btn-send pt-2 btn-block" onClick={EditHouse}>
                            &nbsp;&nbsp;&nbsp;&nbsp;แก้ไข&nbsp;&nbsp;&nbsp;&nbsp;
                            </button>
                          </div>
                        </div>

                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div >
        ))}
      </form>
    </div>
  );
};

export default HousingEdit;