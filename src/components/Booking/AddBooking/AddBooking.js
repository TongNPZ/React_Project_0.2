import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';

const AddBooking = () => {
  const navigate = useNavigate();
  const House_API = 'http://26.90.237.200:3000/book/add';
  const { Hid } = useParams();

  const [addName, setAddName] = useState('');
  const [addLastname, setAddLastname] = useState('');
  const [addAddress, setAddAddress] = useState('');
  const [addAge, setAddAge] = useState('');
  const [addPhone, setAddPhone] = useState('');
  const [addHouseFK, setAddHouseFK] = useState('');
  const [addUserFK, setAddUserFK] = useState('');
  const [addNationality, setAddNationality] = useState('');
  const [addDateContract, setAddDateContract] = useState('');
  const [addNote, setAddNote] = useState('');

  const [houses, setHouses] = useState([]);

  useEffect(() => {
    loadHouse();
  }, []);

  const loadHouse = () => {
    axios
      .post('http://26.90.237.200:3000/admin/house/read/number', { number: Hid })
      .then(response => {
        setHouses(response.data);
        setAddHouseFK(response.data[0].h_id);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const AddBook = async () => {

    if (!addName || !addLastname || !addAddress || !addAge || !addPhone || !addHouseFK || !addUserFK || !addNationality || !addDateContract) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    // ตรวจสอบเบอร์โทรศัพท์ที่กรอกเป็นตัวเลขทั้งหมด
    if (isNaN(addPhone)) {
      alert('กรุณากรอกเบอร์โทรศัพท์เป็นตัวเลขเท่านั้น');
      return;
    }

    // แสดงข้อความยืนยันการจอง
    const confirmBooking = window.confirm('คุณต้องการทำการจองใช่หรือไม่?');
    if (!confirmBooking) {
      return;
    }

    const data = {
      addName: addName,
      addLastname: addLastname,
      addAddress: addAddress,
      addAge: addAge,
      addPhone: addPhone,
      addHouseFK: addHouseFK,
      addUserFK: addUserFK,
      addNationality: addNationality,
      addDateContract: addDateContract,
      addNote: addNote,
    };

    try {
      const response = await axios.post(House_API, data);
      alert('ทำการจองสำเร็จแล้ว');

      // ทำการ navigate ไปยังหน้า Receipt พร้อมกับส่งค่า addedBookData ไปด้วย
      navigate(`/PreReceipt/${response.data.id}`); //ใบเสนอราคา
    } catch (error) {
      console.error(error);
      alert('ทำการจองผิดพลาด');
    }
  };

  return (

    <div className="container mt-4">
      <h1 className="text-center mb-4">เพิ่มการจอง</h1>

      <div className="row d-flex">

        <div className="col-lg-6">
          <div className="card">
            <div className="card-header bg-success text-white">ข้อมูลลูกค้า</div>
            <div className="card-body text-left">
              <div className="mb-3">
                <label htmlFor="id" className="form-label">&nbsp;&nbsp;เลขบัตรประชาชน</label>
                <input type="text" className="form-control" maxLength="13" id="id" value={addUserFK} onChange={(e) => setAddUserFK(e.target.value)} />
              </div>
              <div className='row'>
                <div className='col-md-6'>
                  <div className="mb-3">
                    <label htmlFor="addName" className="form-label">&nbsp;&nbsp;ชื่อ</label>
                    <input type="text" className="form-control" maxLength="50" id="addName" value={addName} onChange={(e) => setAddName(e.target.value)} />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className="mb-3">
                    <label htmlFor="addLastname" className="form-label">&nbsp;&nbsp;นามสกุล</label>
                    <input type="text" className="form-control" maxLength="50" id="addLastname" value={addLastname} onChange={(e) => setAddLastname(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="addAddress" className="form-label">&nbsp;&nbsp;ที่อยู่</label>
                <input type="text" className="form-control" maxLength="250" id="addAddress" value={addAddress} onChange={(e) => setAddAddress(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="addAge" className="form-label">&nbsp;&nbsp;อายุ</label>
                <input type="text" className="form-control" maxLength="3" id="addAge" value={addAge} onChange={(e) => setAddAge(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="addNationality" className="form-label">&nbsp;&nbsp;สัญชาติ</label>
                <input type="text" className="form-control" maxLength="10" id="addNationality" value={addNationality} onChange={(e) => setAddNationality(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="addPhone" className="form-label">&nbsp;&nbsp;เบอร์โทร</label>
                <input type="text" className="form-control" id="addPhone" maxLength="10" value={addPhone} onChange={(e) => setAddPhone(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="addNote" className="form-label">&nbsp;&nbsp;หมายเหตุ</label>
                <input type="text" className="form-control" id="addNote" maxLength="250" value={addNote} onChange={(e) => setAddNote(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="addDateContract" className="form-label">&nbsp;&nbsp;กำหนดวันทำสัญญา</label>
                <input type="date" className="form-control" id="addDateContract" value={addDateContract} onChange={(e) => setAddDateContract(e.target.value)} />
              </div>
              <br />
              <div className="text-center mt-3">
                {/* <Link onClick={AddBook} className="btn button01">จอง</Link> */}
                <button type="button" className="btn button01 btn-send pt-2 btn-block" onClick={AddBook}>
                &nbsp;&nbsp;&nbsp;&nbsp;จอง&nbsp;&nbsp;&nbsp;&nbsp;
                </button>
              </div>
              <br />
            </div>
            
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card">
            <div className="card-header bg-primary text-white">ข้อมูลบ้านที่จอง</div>
            {houses.map((house, idx) => (
              <div>
                <img className="card-img-top" src={house.image} alt={`House ${house.h_id}`} />
                <div className="card-body text-left">
                  <div className='row'>
                    <div className='col-6' key={idx}>
                      <p>บ้านเลขที่: </p>{house.h_id}
                      <p>แปลนบ้าน: {house.house_plan}</p>
                      <p>เลขที่โฉนด: {house.num_deed}</p>
                      <p>เลขที่หน้าสำรวจ: {house.num_survey}</p>
                      <p>ขนาดพื้นที่ดิน: {house.land_area} ตารางวา</p>
                      <p>ขนาดพื้นที่ใช้สอย: {house.area} ตารางเมตร</p>
                      <NumericFormat
                        value={house.h_price}
                        allowLeadingZeros
                        thousandSeparator=","
                        displayType="text"
                        renderText={(value) => <p>ราคาบ้าน {value} บาท</p>}
                      />
                      <NumericFormat
                        value={house.book_price}
                        allowLeadingZeros
                        thousandSeparator=","
                        displayType="text"
                        renderText={(value) => <p> ราคาจอง {value} บาท</p>}
                      />
                      <p>หมายเหตุ: {house.h_note}</p>
                    </div>
                    <div className='col-6' key={idx}>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>


  );
};
export default AddBooking;