import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';

const AddBill = () => {
  const navigate = useNavigate();
  const House_API = 'http://26.90.237.200:3000/notice-common-payment/add';

  const [addHouseFK, setAddHouseFK] = useState('');
  const [addNote, setAddNote] = useState('');
  const [addDate, setAddDate] = useState('');

  const [houses, setHouses] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);

  useEffect(() => {
    loadHouses();
  }, []);

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

  console.log(selectedHouse);

  useEffect(() => {
    if (addHouseFK) {
      const house = houses.find(house => house.h_id === addHouseFK);
      setSelectedHouse(house);
    } else {
      setSelectedHouse(null);
    }
  }, [addHouseFK, houses]);

  const AddBook = async () => {

    if (!addHouseFK || !addDate) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    // แสดงข้อความยืนยันการจอง
    const confirmBooking = window.confirm('คุณต้องการทำการจองใช่หรือไม่?');
    if (!confirmBooking) {
      return;
    }

    const data = {
      addHouseFK: addHouseFK,
      addNote: addNote,
      addDate: addDate
    };
    try {
      const response = await axios.post(House_API, data);
      alert('ส่งสำเร็จแล้ว');
      navigate(`/Bill`);
    } catch (error) {
      console.error(error);
      alert('ผิดพลาด');
    }

  };
  const inSevenDays = new Date();
  inSevenDays.setDate(inSevenDays.getDate() + 7);
  // const maxDate = inSevenDays.toISOString().split('T')[0];
  const today = new Date().toISOString().split('T')[0];

  return (

    <div className="container mt-4">
      <h1 className="text-center mb-4">ส่งการแจ้งชำระ</h1>

      <div className='row d-flex justify-content-center'>
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body text-left ">
              <div className="form-group mb-4 ">
                <label htmlFor="houseSelection">&nbsp;&nbsp;&nbsp;&nbsp;เลือกบ้าน</label>
                <select
                  id="houseSelection"
                  className="form-control"
                  value={addHouseFK}
                  onChange={(e) => setAddHouseFK(e.target.value)}
                >
                  <option value="">-- บ้านเลขที่ --</option>
                  {houses.filter(house => ![1, 2, 0].includes(house.status)).map((house) => (
                    <option key={house.id} value={house.id}>
                      {house.h_id}
                    </option>
                  ))}
                </select>
              </div>

              {selectedHouse && (
                <div className="card mb-4">
                  <h4 className=" text-center">การแจ้งชำระ</h4>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;บ้านเลขที่: {selectedHouse.h_id}</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;แปลนบ้าน: {selectedHouse.house_plan}</p>
                </div>
              )}

              <form>
                <div className="card mb-4 container">
                  <div className="mb-3">
                    <label htmlFor="setAddDate" className="form-label">
                      <br />
                      &nbsp;&nbsp;ลงวันที่แจ้งชำระ
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="setAddDate"
                      value={addDate}
                      min={today}
                      onChange={(e) => setAddDate(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="addNote" className="form-label">
                      &nbsp;&nbsp;หมายเหตุ
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="addNote"
                      maxLength="250"
                      value={addNote}
                      onChange={(e) => setAddNote(e.target.value)}
                    />
                  </div>
                </div>

                <div className="text-center">
                  <button className="btn button09" onClick={() => AddBook()}>
                    &nbsp;&nbsp;ส่ง&nbsp;&nbsp;
                  </button>
                </div>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddBill;