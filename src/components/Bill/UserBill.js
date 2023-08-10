import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Login/AuthContext';
import { NumericFormat } from 'react-number-format';
import dayjs from 'dayjs';
import { useParams, useNavigate } from 'react-router-dom';

const UserBill = () => {
  const Auth = useContext(AuthContext);
  const [NCPs, setNCP] = useState([]);
  const [UNCP, setUNCP] = useState([]);
  const [userData, setUserData] = useState([{}]);
  const [userID, setUserID] = useState([{}]);
  const { Uid } = useParams();

  useEffect(() => {
    const data1 = {
      email: Uid
    };
    
    axios.post(`http://26.90.237.200:3000/user/read/email`, data1)
      .then(response => {
        setUserData(response.data);
        if (response.data[0] && response.data[0].user_id) {
          setUserID(response.data[0].user_id);
          const data = {
            userFK: response.data[0].user_id
          }
          return axios.post('http://26.90.237.200:3000/notice-common-payment/read/user/id/', data);
        }
      })
      .then(response => {
        if (response) {
          setUNCP(response.data);
        }
      })
      .catch(error => {
        console.error(error);
      });
}, []);

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

  const loadUserData = () => {
    const data = {
      userFK: userID
    }
    console.log(data)
    axios.post('http://26.90.237.200:3000/notice-common-payment/read/user/id/', data)
      .then(response => {
        setUNCP(response.data);
      })
      .catch(error => {
        console.error(error);
      });
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
          {Auth.isLoggedIn && Auth.status == 3 && (
            <tbody>
              {UNCP.map((NCP, idx) => (
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

export default UserBill;