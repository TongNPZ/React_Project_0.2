import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import fontkit from '@pdf-lib/fontkit';
import THSarabunBold from '../../fonts/THSarabunBold.ttf'; // ปรับปรุงพาธตามที่เหมาะสม
import PDF from './pdf3.pdf'
import { PDFDocument, rgb } from 'pdf-lib';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import img from './ex.png'

dayjs.extend(customParseFormat);
dayjs.locale('th'); 

const Receipt = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [houses, setHouse] = useState([]);
  const [profile, setProfile] = useState([]);
  const [contract, setContract] = useState([]);

  const { Bid } = useParams();

  useEffect(() => {
    loadBookingData();
  }, []);
  
  const navigate = useNavigate();
  const loadBookingData = () => {
    axios.post(`http://26.90.237.200:3000/book/read/id`, { id: Bid })
      .then(response => {
        setBooks(response.data);
        // เมื่อได้รับข้อมูลการจองแล้ว ให้โหลดข้อมูลผู้ใช้ที่เกี่ยวข้องกับข้อมูลการจอง
        if (response.data.length > 0) {
          loadUserData(response.data[0].user_id);
          loadHouse(response.data[0].h_id);
          loadContract(response.data[0].b_id);
          // console.log(response.data[0].h_id)
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const loadContract = (ContractId) => {
    axios.post(`http://26.90.237.200:3000/contract/read/id`, { id: ContractId })
      .then(response => {
        setContract(response.data);
        // console.log(response.data)
      })
      .catch(error => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
      });
  };
  
  const loadHouse = (houseId) => {
    axios.post(`http://26.90.237.200:3000/admin/house/read/id`, { id: houseId })
      .then(response => {
        setHouse(response.data);
        // console.log(response.data)
      })
      .catch(error => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
      });
  };
  
  useEffect(() => {
    axios.get('http://26.90.237.200:3000/admin/read')
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error(error);
      });

  }, []);

  const loadUserData = (userId) => {
    axios.post(`http://26.90.237.200:3000/user/read/id`, { id: userId })
      .then(response => {
        setUsers(response.data);
        // console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  };

  const generatePdf = async () => {
    try {
      const existingPdfBytes = await fetch(PDF).then(res => res.arrayBuffer())
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      pdfDoc.registerFontkit(fontkit);
      const fontBytes = await axios.get(THSarabunBold, { responseType: 'arraybuffer' }); 
      const font = await pdfDoc.embedFont(fontBytes.data); 
  
      const page = pdfDoc.getPages()[0];
      let y = 780;
      const relatedContract = contract[0];
      const relatedbook = books[0];
      const relatedUser = users[0];
      const relatedHouse = houses[0];
      const date = dayjs();
      const day = date.format('DD');
      const month = date.format('MMMM');
      const year = parseInt(date.format('YYYY')) + 543;
      let thaiBahtText = require('thai-baht-text');
      let priceInThai = thaiBahtText(relatedHouse.transfer_price);
      // const bookingDate = relatedbook.date_contract && dayjs(relatedbook.date_contract).add(543, 'year').format('DD MMMM YYYY');
      page.drawText(` ${relatedUser.user_name}  ${relatedUser.user_lastname}`, { x: 110, y: y - 589, size: 9, font, color: rgb(0, 0, 0), });
      page.drawText(` ${relatedHouse.h_id}`, { x: 348, y: y - 618, size: 9, font, color: rgb(0, 0, 0), });
      page.drawText(` ${relatedHouse.transfer_price.toLocaleString()} `, { x: 110, y: y - 676, size: 9, font, color: rgb(0, 0, 0), });
      page.drawText(` ${priceInThai} `, { x: 285, y: y - 677, size: 9, font, color: rgb(0, 0, 0), });
      page.drawText(` ${day}    ${month}    ${year}`, { x: 285, y: y - 574, size: 9, font, color: rgb(0, 0, 0), });
      page.drawText(` ${profile[0].manager_name}  ${profile[0].manager_lastname}`, { x: 100, y: y - 724, size: 9, font, color: rgb(0, 0, 0), });
      page.drawText(` ${profile[0].address} `, { x: 75, y: y - 603, size: 9, font, color: rgb(0, 0, 0), });
      page.drawText(` ${profile[0].phone} `, { x: 110, y: y - 617, size: 9, font, color: rgb(0, 0, 0), });
      page.drawText(` ${relatedContract.num_buySale} `, { x: 250, y: y - 617, size: 9, font, color: rgb(0, 0, 0), });

      page.drawText(` ${profile[0].name} `, { x: 180, y: y - 547, size: 9, font, color: rgb(0, 0, 0), });
      page.drawText(` ${profile[0].md_name} `, { x: 296, y: y - 724, size: 9, font, color: rgb(0, 0, 0), });
     // สร้าง checkbox
     // Draw the checkbox image at a desired x, y position on the first page relatedContract
     const imageBytes = await fetch(img).then((res) => res.arrayBuffer());
     // Embed รูปภาพลงในไฟล์ PDF
     const image = await pdfDoc.embedPng(imageBytes);
     // วาดรูปภาพลงในหน้า PDF
     page.drawImage(image, {x: 107,y: y - 636, width: 9,height: 9});
     page.drawImage(image, {x: 61,y: y - 653, width: 9,height: 9});
     
      const pdfBytes = await pdfDoc.save();
      const pdfUrl = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
      window.open(pdfUrl, 'blank');
      // navigate('/Booking');
    } catch (error) {
      console.error(error);
    }
  };

  const date = dayjs();
  const day = date.format('DD');
  const month = date.format('MMMM');
  const year = parseInt(date.format('YYYY')) + 543;
  const bookingDate = `${day} ${month} ${year}`;
  return (
    <div className="container">
      <br />
      <div>
      <h1> ใบเสร็จสัญญา </h1>
        {books.map((book) => (
          <div className="card" key={book.b_id}>
            <div className="content">
              <p>เลขการจอง : {book.b_id}</p>
              {/* แสดงข้อมูลผู้ใช้ที่เกี่ยวข้องกับข้อมูลการจอง */}
              {users.length > 0 ? (
                users.map((user) => (
                  // แสดงข้อมูลผู้ใช้ที่เกี่ยวข้องกับข้อมูลการจอง
                  <div key={user.id}>
                    <p>ชื่อ-สกุล : {user.user_name} {user.user_lastname}</p>
                    <p >เบอร์โทร : {user.user_phone}</p>
                    <p>อายุ : {user.user_age}</p>
                  </div>
                  ))) : (<p>ไม่พบข้อมูลผู้ใช้</p>)}
                  
              <p>วันที่จอง : { bookingDate }</p>
              <p>บ้านเลขที่ : {book.h_id}</p>
              {houses.length > 0 ? (
                houses.map((house) => (
                  // แสดงข้อมูลผู้ใช้ที่เกี่ยวข้องกับข้อมูลการจอง
                  <div key={house.id}>
                    <p>ขนาดพื้นที่ดิน : {house.land_area} ตารางวา </p>
                    <p>แปลนบ้าน : {house.house_plan} </p>
                    {/* <p>ยอดผ่อนดาว : {house.book_price} บาท</p> */}
                    <NumericFormat
                value={house.book_price}
                allowLeadingZeros
                thousandSeparator=","
                displayType="text"
                renderText={(value) => <p> รวมเงินทั้งสิ้น : {value} บาท</p>}
              />
                    <NumericFormat
                value={house.book_price}
                allowLeadingZeros
                thousandSeparator=","
                displayType="text"
                renderText={(value) => <p>ค่าจอง : {value} บาท</p>}
              />
                    {/* <p>ค่าจอง : {house.book_price} บาท</p> */}
                  </div>
                  ))) : (<p>ไม่พบข้อมูลผู้ใช้</p>)}
         
            </div>
          </div>
        ))}
      </div>
      <br />
      <button type="button" className="btn btn-primary" onClick={generatePdf}>
      บันทึกเป็น PDF
    </button>
    </div>
  );
};

export default Receipt;