import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircle } from "react-icons/io";

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
      <div className="text-center">
        <h1>เพิ่มข้อมูลบ้าน</h1>
      </div>
      
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
                            value={id}
                            onChange={e => setId(e.target.value)}
                          />
                        </div>
                        <br/>
                        <div className="form-group">
                          <label htmlFor="addHousePlan">&nbsp;&nbsp;แปลนบ้าน</label>
                          <input
                            type="text"
                            className="form-control"
                            id="addHousePlan"
                            maxLength="25"
                            value={addHousePlan}
                            onChange={e => setAddHousePlan(e.target.value)}
                          />
                        </div>
                        <br/>
                        <div className='row'>
                          <div className='col-md-6'>
                            <div className="form-group">
                              <label htmlFor="addNumDeed">&nbsp;&nbsp;เลขที่โฉนด</label>
                              <input
                                type="text"
                                className="form-control"
                                id="addNumDeed"
                                maxLength="6"
                                value={addNumDeed}
                                onChange={e => setAddNumDeed(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className='col-md-6'>
                            <div className="form-group">
                              <label htmlFor="addNumsurvey">&nbsp;&nbsp;เลขที่หน้าสำรวจ</label>
                              <input
                                type="number"
                                className="form-control"
                                id="addNumsurvey"
                                maxLength="5"
                                value={addNumsurvey}
                                onChange={e => setAddNumsurvey(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <br/>
                        <div className='row'>
                          <div className='col-md-6'>
                            <div className="form-group">
                              <label htmlFor="addLandArea"> &nbsp;&nbsp;ขนาดพื้นที่ ตารางวา </label>
                              <input
                                type="number"
                                className="form-control"
                                id="addLandArea"
                                maxLength="25"
                                value={addLandArea}
                                onChange={e => setAddLandArea(parseInt(e.target.value))}
                              />
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className="form-group">
                              <label htmlFor="addArea"> &nbsp;&nbsp;พื้นที่ใช้สอย ตารางเมตร </label>
                              <input
                                type="number"
                                className="form-control"
                                id="addArea"
                                maxLength="25"
                                value={addArea}
                                onChange={e => setAddArea(parseInt(e.target.value))}
                              />
                            </div>
                          </div>
                        </div>
                        <br/>
                        <div className="form-group">
                          <label htmlFor="addBookingPrice"> &nbsp;&nbsp;จำนวนเงินมัดจำ </label>
                          <input
                            type="number"
                            className="form-control"
                            id="addBookingPrice"
                            maxLength="25"
                            value={addBookingPrice}
                            onChange={e => setAddBookingPrice(parseInt(e.target.value))}
                          />
                        </div>
                        <br/>
                        <div className="form-group">
                          <label htmlFor="addNote" > &nbsp;&nbsp;หมายเหตุ <p className='text-danger'>* ไม่จำเป็นต้องใส่ก็ได้  </p></label>
                          <input
                            type="text"
                            className="form-control"
                            id="addNote"
                            maxLength="25"
                            value={addNote}
                            onChange={e => setAddNote(e.target.value)}
                          />
                        </div>
                 
                        <br/>
                            <div className="form-group">
                              <label htmlFor="addImage" > &nbsp;&nbsp;รูปภาพ </label>
                              <input
                                type="file"
                                className="form-control"
                                id="addImage"
                                onChange={e => setAddImage(e.target.files[0])}
                              />
                            </div>
                            <br/>
                            <div className="form-group">
                              <label htmlFor="addidFK" className="form-label " >&nbsp;&nbsp;โซนบ้าน</label>
                              <select
                                id="addidFK"
                                className="form-control"
                                value={addidFK}
                                onChange={e => setAddidFK(parseInt(e.target.value))}
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
                        <button type="button" className="btn button01 btn-send pt-2 btn-block" onClick={addHouse}>
                           เพิ่ม
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
    </div >
  );
};

export default HousingAdd;