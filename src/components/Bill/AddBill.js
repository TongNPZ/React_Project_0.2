import React, { useState,useEffect } from 'react';
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
        
        if (!addHouseFK || !addNote || !addDate) {
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
          addNote:addNote,
          addDate:addDate
        };
        try {
            const response = await axios.post(House_API, data);
            alert('ส่งสำเร็จแล้ว');
      
            // ทำการ navigate ไปยังหน้า Receipt พร้อมกับส่งค่า addedBookData ไปด้วย
            navigate(`/Bill`); //ใบเสนอราคา
          } catch (error) {
            console.error(error);
            alert('ผิดพลาด');
          }
          console.log(data)

        };



      return (
    
    <div className="container">
           <h1>ส่งการแจ้งชำระ</h1>
           <div className="form-group">
        <label>เลือกบ้าน</label>
        <select className="form-control"value= {addHouseFK} onChange={(e) => setAddHouseFK(e.target.value)}>
    <option value="">-- บ้านเลขที่ --</option>
    {houses.filter(house => ![1,2,0].includes(house.status)).map((house) => (
        <option key={house.id} value={house.id}>
            {house.h_id}
        </option>
    ))}
        </select>
        <br/>
       { selectedHouse && (
            <div className="card container" >
                <br/>
                <h4>การแจ้งชำระ</h4>
                <br/>
                <p>บ้านเลขที่: { selectedHouse.h_id }</p>
                <p>แปลนบ้าน: { selectedHouse.house_plan }</p>
            </div>
        )}
        </div>

    <form >
        <div className="mb-3">
            <br/>
            <br/>
        <div className="card container">
        <div>
            <label htmlFor="setAddDate" className="form-label">
            ลงวันที่แจ้งชำระ
            </label>
            <input
            type="date"
            className="form-control"
            id="setAddDate"
            value={addDate}
            onChange={(e) => setAddDate(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="addNote" className="form-label">
            หมายเหตุ
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
        <br/>
        </div>
        </div>

            <button className="btn button" onClick={() => AddBook()}>
                      แก้ไข
            </button>
        <br/>
    </form>
    </div>
);
};
export default AddBill;