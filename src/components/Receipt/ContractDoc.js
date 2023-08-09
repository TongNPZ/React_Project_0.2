import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import fontkit from '@pdf-lib/fontkit';
import THSarabunBold from '../../fonts/THSarabunBold.ttf'; // ปรับปรุงพาธตามที่เหมาะสม
import PDF from './Contract.pdf'
import { PDFDocument, rgb } from 'pdf-lib';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import customParseFormat from 'dayjs/plugin/customParseFormat';
// import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
// import img from './ex.png'

dayjs.extend(customParseFormat);
dayjs.locale('th'); 

const ContractDoc = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [houses, setHouse] = useState([]);
  const [profile, setProfile] = useState([]);
  const [contract, setContract] = useState([]);
  const { Bid } = useParams();

  useEffect(() => {
    loadBookingData();
  }, []);
  
  // const navigate = useNavigate();
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
// console.log(contract);

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
      const page2 = pdfDoc.getPages()[1];
      const page4 = pdfDoc.getPages()[3];
      const page5 = pdfDoc.getPages()[4];
      let y = 780;
      const relatedbook = books[0];
      const relatedUser = users[0];
      const relatedHouse = houses[0];
      const relatedCon = contract[0];
      const date = dayjs();
      const day = date.format('DD');
      const month = date.format('MMMM');
      const year = parseInt(date.format('YYYY')) + 543;
      let thaiBahtText = require('thai-baht-text');
      const priceInThai_1 = thaiBahtText(relatedHouse.book_price);
      const priceInThai_2 = thaiBahtText(relatedHouse.h_price);
      const priceInThai_3 = thaiBahtText(relatedCon.remaining_amount);
      const bookingDate = relatedCon.date && dayjs(relatedbook.date).add(543, 'year').format('DD MMMM YYYY');
      const bookingDate1 = relatedCon.date && dayjs(relatedbook.date).add(543, 'year').format('DD/MM/YYYY');

      page.drawText(` ${bookingDate} `, { x: 265, y: y - 54, size: 15, font, color: rgb(0, 0, 0), });

      page.drawText(` ${profile[0].company} `, { x: 100, y: y - 94, size: 15, font, color: rgb(0, 0, 0), });
      page.drawText(` ${relatedCon.b_id} `, { x: 500, y: y - -23, size: 15, font, color: rgb(0, 0, 0), });
      page.drawText(` ${profile[0].md_name} `, { x: 265, y: y - 94, size: 15, font, color: rgb(0, 0, 0), });
      page.drawText(` ${profile[0].md_nationality} `, { x: 469, y: y - 94, size: 15, font, color: rgb(0, 0, 0), });
      page.drawText(` ${profile[0].md_address} `, { x: 50, y: y - 114, size: 15, font, color: rgb(0, 0, 0), });
      page.drawText(` ${profile[0].phone} `, { x: 420, y: y - 114, size: 15, font, color: rgb(0, 0, 0), });

      const modifiedAddress = profile[0].md_address.replace("อำเภอเมือง", "\nอำเภอเมือง");
      const addressLines = modifiedAddress.split('\n');
      let currentY = y - 20;
      addressLines.forEach((line) => {
        const lineWidth = font.widthOfTextAtSize(line, 15); // calculate the width of the text
        page.drawText(line, { x: 534 - lineWidth, y: currentY, size: 15, font, color: rgb(0, 0, 0) });
        currentY -= 20;
      });

      page.drawText(` ${relatedUser.user_name}  ${relatedUser.user_lastname}`, { x: 96, y: y - 154, size: 15, font, color: rgb(0, 0, 0), });
      page.drawText(` ${relatedUser.user_age}`, { x: 203, y: y - 154, size: 15, font, color: rgb(0, 0, 0), });
      page.drawText(` ${relatedUser.nationality}`, { x: 260, y: y - 154, size: 15, font, color: rgb(0, 0, 0), });
      page.drawText(` ${relatedUser.user_address}`, { x: 325, y: y - 154, size: 15, font, color: rgb(0, 0, 0), });
      page.drawText(` ${relatedUser.user_phone}`, { x: 163, y: y - 174, size: 15, font, color: rgb(0, 0, 0), });
      page.drawText(` ${relatedUser.user_id}`, { x: 320, y: y - 174, size: 15, font, color: rgb(0, 0, 0), });

      page.drawText(` ${relatedHouse.num_deed}`, { x: 368, y: y - 234, size: 15, font, color: rgb(0, 0, 0), });
      page.drawText(` ${relatedHouse.num_survey}`, { x: 451, y: y - 234, size: 15, font, color: rgb(0, 0, 0), });
      page.drawText(` ${profile[0].address} `, { x: 50, y: y - 254, size: 15, font, color: rgb(0, 0, 0), });
      page.drawText(` ${relatedHouse.h_id}`, { x: 409, y: y - 254, size: 15, font, color: rgb(0, 0, 0), });
      page.drawText(` ${relatedHouse.land_area}`, { x: 55, y: y - 274, size: 15, font, color: rgb(0, 0, 0), });
      page.drawText(` ${relatedHouse.h_price.toLocaleString()}`, { x: 155, y: y - 274, size: 15, font, color: rgb(0, 0, 0), });
      page.drawText(` ${priceInThai_2}`, { x: 290, y: y - 274, size: 15, font, color: rgb(0, 0, 0), });
 
      page.drawText(` ${relatedHouse.book_price.toLocaleString()}`, { x: 498, y: y - 333, size: 15, font, color: rgb(0, 0, 0), });
      page.drawText(` ${priceInThai_1}`, { x: 85, y: y - 354, size: 15, font, color: rgb(0, 0, 0), });
      page.drawText(` ${relatedCon.down_amount.toLocaleString()}`, { x: 365, y: y - 354, size: 15, font, color: rgb(0, 0, 0), });
      page.drawText(` ${relatedCon.remaining_amount.toLocaleString()}`, { x: 50, y: y - 374, size: 15, font, color: rgb(0, 0, 0), });
      page.drawText(` ${priceInThai_3}`, { x: 150, y: y - 374, size: 15, font, color: rgb(0, 0, 0), });
 
      // page.drawText(` ${relatedCon.remaining_amount}`, { x: 55, y: y - 374, size: 15, font, color: rgb(1, 0, 0), });
      page2.drawText(` ${profile[0].company} `, { x: 223, y: y - 298, size: 15, font, color: rgb(0, 0, 0), });
      page2.drawText(` ${bookingDate1} `, { x: 411, y: y - 318, size: 15, font, color: rgb(0, 0, 0), });
      page2.drawText(` ${profile[0].company} `, { x: 50, y: y - 337, size: 15, font, color: rgb(0, 0, 0), });

      page4.drawText(` ${profile[0].company} `, { x: 213, y: y - 120, size: 15, font, color: rgb(0, 0, 0), });
      page4.drawText(` ${profile[0].md_name} `, { x: 253, y: y - 138, size: 12, font, color: rgb(0, 0, 0), });
      page4.drawText(` ${relatedUser.user_name}  ${relatedUser.user_lastname}`, { x: 265, y: y - 218, size: 12, font, color: rgb(0, 0, 0), });
      page4.drawText(` ${relatedCon.witnessone_name} `, { x: 258, y: y - 297, size: 12, font, color: rgb(0, 0, 0), });
      page4.drawText(` ${relatedCon.witnesstwo_name} `, { x: 260, y: y - 378, size: 12, font, color: rgb(0, 0, 0), });

      page5.drawText(` ${profile[0].company} `, { x: 213, y: y - 383, size: 15, font, color: rgb(0, 0, 0), });
      page5.drawText(` ${profile[0].md_name} `, { x: 253, y: y - 405, size: 12, font, color: rgb(0, 0, 0), });
      page5.drawText(` ${relatedUser.user_name}  ${relatedUser.user_lastname}`, { x: 265, y: y - 483, size: 12, font, color: rgb(0, 0, 0), });
      page5.drawText(` ${relatedCon.witnessone_name} `, { x: 258, y: y - 565, size: 12, font, color: rgb(0, 0, 0), });
      page5.drawText(` ${relatedCon.witnesstwo_name} `, { x: 260, y: y - 645, size: 12, font, color: rgb(0, 0, 0), });


      const pdfBytes = await pdfDoc.save();
      const pdfUrl = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
      window.open(pdfUrl, 'blank');
      // navigate('/Booking');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <button type="button" className="btn btn-primary" onClick={generatePdf}>
      บันทึกเป็น PDF
    </button>
    </div>
  );
};

export default ContractDoc;