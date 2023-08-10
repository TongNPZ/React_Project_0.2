import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Login/AuthContext';
import { NumericFormat } from 'react-number-format';
import dayjs from 'dayjs';

const Bill = () => {
  const Auth = useContext(AuthContext);
  const [NCPs, setNCP] = useState([]);

  useEffect(() => {

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
      <h1>ข้อมูลค่าส่วนกลาง</h1>
      <br />

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>เลขที่บิล</th>
              <th>บ้านเลขที่</th>
              <th>ค่าส่วนกลาง</th>
              <th>วันที่แจ้งชำระ</th>
              <th>หมายเหตุ</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          {Auth.isLoggedIn && Auth.status == 1 && (
            <tbody>
              {NCPs.map((NCP, idx) => (
                <tr key={idx}>
                  <td>{NCP.ncp_id}</td>
                  <td>{NCP.h_id}</td>
                  <td>
                    <NumericFormat
                      value={NCP.amount}
                      allowLeadingZeros
                      thousandSeparator=","
                      displayType="text"
                      renderText={(value) => <span>{value} บาท</span>}
                    />
                  </td>
                  <td>{dayjs(NCP.date).add(543, 'year').format('D MMMM YYYY')}</td>
                  <td>
                    {Auth.isLoggedIn ? NCP.note : '-'}
                  </td>
                  <td>
                    <span className={`fw-bold ${statusBill(NCP.status).colorClass}`}>
                      {statusBill(NCP.status).message}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          )}

        </table>
      </div>
    </div>
  );
}

export default Bill;