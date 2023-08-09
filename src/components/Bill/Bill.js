import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Login/AuthContext';
import { NumericFormat } from 'react-number-format';
import dayjs from 'dayjs';

const Bill = () => {
  const Auth = useContext(AuthContext);
  // const [houses, setHouses] = useState([]);
  const [NCPs, setNCP] = useState([]);

  // const [zones, setZones] = useState([]);
  // const [selectedType, setSelectedType] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    // loadHouses();
    // loadHouseTypes();
    loadNCP();
  }, []);

 
  const loadNCP = () => {
    axios
      .get(' http://26.90.237.200:3000/notice-common-payment/read')
      .then(response => {
        setNCP(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const statusBill = (status) => {
    switch (status) {
      case 0:
        return { message: ' ยังไม่ชำระ ', colorClass: 'text-danger' };
        case 1:
          return { message: ' จ่ายแล้ว ', colorClass: 'text-success' };
      default:
        return { message: ' ไม่ทราบสถานะ', colorClass: '' };
    }
  };

  return (
    <div className="container">
        <h1> ข้อมูลค่าส่วนกลาง </h1>
  <br />
      <br />
      <div className="row">
        {NCPs.map((NCP, idx) => (
          <div className="col-4" key={idx}>
            <div className="card " >
           
              <div className="card-body">
                <h5 className="card-title">เลขที่บิล {NCP.ncp_id}</h5>
                  <p>บ้านเลขที่ {NCP.h_id} </p>
                <NumericFormat
                  value={NCP.amount}
                  allowLeadingZeros
                  thousandSeparator=","
                  displayType="text"
                  renderText={(value) => <p>ค่าส่วนกลาง : {value} บาท</p>}
                />
                <p>วันที่แจ้งชำระ: { dayjs(NCP.date).add(543, 'year').format('D MMMM YYYY')} </p>
                {Auth.isLoggedIn && (
                  <div> 
                    <p className="card-text">หมายเหตุ: {NCP.note}</p>
                  </div>
                )}
                      <br/>
                <p className="card-text">
                  สถานะ : <span className={`fw-bold ${statusBill(NCP.status).colorClass}`}>
                    {statusBill(NCP.status).message}
                  </span>
                </p>

               
              </div>
            </div>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bill;