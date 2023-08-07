import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import fontkit from '@pdf-lib/fontkit';
import THSarabunBold from '../../fonts/THSarabunBold.ttf'; // ปรับปรุงพาธตามที่เหมาะสม
import PDF from './Quotation_Revised_Version.pdf'
import { PDFDocument, rgb } from 'pdf-lib';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';

dayjs.extend(customParseFormat);
dayjs.locale('th'); 

const PreReceipt = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [houses, setHouse] = useState([]);
  const [profile, setProfile] = useState([]);
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
          // console.log(response.data[0].h_id)
        }
      })
      .catch(error => {
        console.error(error);
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
      const relatedbook = books[0];
      const relatedUser = users[0];
      const relatedHouse = houses[0];
      const date = dayjs();
      const day = date.format('DD');
      const month = date.format('MMMM');
      const year = parseInt(date.format('YYYY')) + 543;
      const formattedDate = `${day}                        ${month}                     ${year}`;
      const bookingDate = relatedbook.date_book && dayjs(relatedbook.date_contract).add(543, 'year').format('DD MMMM YYYY');
      const ContractDate = relatedbook.date_contract && dayjs(relatedbook.date_contract).add(543, 'year').format('DD MMMM YYYY');
      page.drawText(formattedDate, { x: 325, y: y -158, size: 12, font, color: rgb(0, 0, 0), });
      page.drawText(` ${relatedUser.user_name}  ${relatedUser.user_lastname}`, { x: 140, y: y - 201, size: 13, font, color: rgb(0, 0, 0), });
      page.drawText(` ${relatedUser.user_age} `, { x: 325, y: y - 201, size: 13, font, color: rgb(0, 0, 0), });
      page.drawText(` ${relatedUser.user_phone}`, { x: 430, y: y - 201, size: 13, font, color: rgb(0, 0, 0), });
      page.drawText(` ${relatedHouse.h_id}`, { x: 142, y: y - 260, size: 13, font, color: rgb(0, 0, 0), });
      page.drawText(` ${relatedHouse.land_area} `, { x: 230, y: y - 260, size: 13, font, color: rgb(0, 0, 0), });
      page.drawText(` ${relatedHouse.house_plan} `, { x: 390, y: y - 260, size: 13, font, color: rgb(0, 0, 0), });
      page.drawText(` ${relatedHouse.book_price.toLocaleString()} `, { x: 452, y: y - 348, size: 13, font, color: rgb(0, 0, 0), });
      page.drawText(` ${relatedHouse.transfer_price.toLocaleString()} `, { x: 444, y: y - 407, size: 13, font, color: rgb(0, 0, 0), });
      page.drawText(` ${day}  ${month}  ${year}`, { x: 186, y: y -348, size: 12, font, color: rgb(0, 0, 0), });
      page.drawText(` ${bookingDate}`, { x: 186, y: y -377, size: 12, font, color: rgb(0, 0, 0), });
      page.drawText(` ${relatedbook.note} `, { x: 73, y: y - 465, size: 13, font, color: rgb(0, 0, 0), });
      page.drawText(` ${relatedHouse.h_price.toLocaleString()} `, { x: 445, y: y - 289, size: 13, font, color: rgb(0, 0, 0), });
      page.drawText(` ${profile[0].manager_name}  ${profile[0].manager_lastname}`, { x: 405, y: y - 601, size: 13, font, color: rgb(0, 0, 0), });
      page.drawText(` ${profile[0].address} `, { x: 135, y: y - 653, size: 13, font, color: rgb(0, 0, 0), });
      page.drawText(` ${profile[0].phone} `, { x: 245, y: y - 682, size: 13, font, color: rgb(0, 0, 0), });

      const pdfBytes = await pdfDoc.save();
      const pdfUrl = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
      
      window.open(pdfUrl, 'blank');
      navigate('/Booking');
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
      <h1> ใบจอง </h1>
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
      <button type="button" className="btn button" onClick={generatePdf}>
      บันทึกเป็น PDF
    </button>
    </div>
  );
};

export default PreReceipt;