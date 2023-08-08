    import React, { useState,useEffect } from 'react';
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
              .post('http://26.90.237.200:3000/admin/house/read/number',{ number: Hid })
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
              addNationality:addNationality,
              addDateContract:addDateContract,
              addNote:addNote,
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
        <div className="container">
               <h1>เพิ่มการจอง</h1>
               <div className="form-group">
            <br/>

            {houses.map((house, idx) => (
                <div className="card container" >
                    <br/>
                    <h4>ข้อมูลบ้านที่จอง</h4>
                    <br/>
                    <p>บ้านเลขที่: { house.h_id }</p>
                    <p>แปลนบ้าน: { house.house_plan }</p>
                    <p>เลขที่โฉนด: { house.num_deed }</p>
                    <p>เลขที่หน้าสำรวจ: { house.num_survey }</p>
                    <p>ขนาดพื้นที่ดิน: { house.land_area } ตารางวา</p>
                    <p>ขนาดพื้นที่ใช้สอย: { house.area } ตารางเมตร</p>
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
                    <p>หมายเหตุ: { house.h_note }</p>
                </div>

            ))
        }
        
            </div>
        <form >
            <div className="mb-3">
                <br/>
            <div className="card container">
            <br/>
                <h4>ข้อมูลลูกค้า</h4>
                <br/>
            <div>
                <label htmlFor="id" className="form-label">
                เลขบัตรประชาชน
                </label>
                <input
                type="text"
                className="form-control"
                maxLength="13"
                id="id"
                value={addUserFK}
                onChange={(e) => setAddUserFK(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="addName" className="form-label">
                ชื่อ
                </label>
                <input
                type="text"
                maxLength="50"
                className="form-control"
                id="addName"
                value={addName}
                onChange={(e) => setAddName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="addLastname" className="form-label">
                นามสกุล
                </label>
                <input
                type="text"
                maxLength="50"
                className="form-control"
                id="addLastname"
                value={addLastname}
                onChange={(e) => setAddLastname(e.target.value)}
                />
            </div>
            <div >
                <label htmlFor="addAddress" className="form-label">
                ที่อยู่
                </label>
                <input
                type="text"
                maxLength="250"
                className="form-control"
                id="addAddress"
                value={addAddress}
                onChange={(e) => setAddAddress(e.target.value)}
                />
            </div>
            
            <div>
                <label htmlFor="addAge" className="form-label">
                อายุ
                </label>
                <input
                type="text"
                className="form-control"
                maxLength="3"
                id="addAge"
                value={addAge}
                onChange={(e) => setAddAge(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="addNationality" className="form-label">
                สัญชาติ
                </label>
                <input
                type="text"
                maxLength="10"
                className="form-control"
                id="addNationality"
                value={addNationality}
                onChange={(e) => setAddNationality(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="addPhone" className="form-label">
                เบอร์โทร
                </label>
                <input
                type="text"
                className="form-control"
                id="addPhone"
                maxLength="10"
                value={addPhone}
                onChange={(e) => setAddPhone(e.target.value)}
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

            <div>
                <label htmlFor="addPhone" className="form-label">
                กำหนดวันทำสัญญา
                </label>
                <input
                type="date"
                className="form-control"
                id="addPhone"
                value={addDateContract}
                onChange={(e) => setAddDateContract(e.target.value)}
                />
            </div>
            <br/>
            </div>
            </div>

            <br/>
                <div className="">
                {/* <button className="btn button "  onClick={ AddBook}> จอง </button> */}

                    <Link  onClick={AddBook} className="btn button">  จอง </Link>
                </div>
            <br/>
        </form>
        </div>

    );
    };
    export default AddBooking;