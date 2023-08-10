import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ContractAdd = () => {
  const User_API = "http://26.90.237.200:3000/contract/add";
  const navigate = useNavigate();
  const { Bid } = useParams(); // รับค่าพารามิเตอร์ Bid จาก URL
  const [addNumBuySale, setAddNumBuySale] = useState("");
  const [addWitnessOneName, setAddWitnessOneName] = useState("");
  const [addWitnessTwoName, setAddWitnessTwoName] = useState("");
  const [addLoanLimit, setAddLoanLimit] = useState("");

  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [houses, setHouse] = useState([]);
  const [profile, setProfile] = useState([]);
  // "addWitnessOneName": "นายใจดี ดีใจ",
  // "addWitnessTwoName": "นางงาม จุฬา"

  useEffect(() => {
    loadBookingData();
  }, []);

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

  const Contract = async () => {

    const data = {
      addBookFK: Bid,
      addNumBuySale: addNumBuySale,
      addWitnessOneName: addWitnessOneName,
      addWitnessTwoName: addWitnessTwoName,
      addLoanLimit: addLoanLimit,

    };
    // console.log(Bid)
    // ถามผู้ใช้ก่อนทำการแก้ไข
    const confirmUpdate = window.confirm("คุณต้องการทำการเพิ่มข้อมูลหรือไม่?");

    if (confirmUpdate) {
      try {
        const response = await axios.post(User_API, data);
        console.log(response.data);

        // แจ้งเตือนเมื่อแก้ไขเสร็จสิ้น
        window.alert("เพิ่มข้อมูลสำเร็จ");
        navigate("/Booking");
      } catch (error) {
        console.error(error);

        // แจ้งเตือนเมื่อเกิดข้อผิดพลาดในการแก้ไขข้อมูล
        window.alert("เกิดข้อผิดพลาดเพิ่มข้อมูล");
        navigate("/Booking");
      }
    }
  };

  return (
    <div className="row">
      <div className="col-lg-7 mx-auto tex">
        <div className="card mt-2 mx-auto p-4 bg-light">
          <div className="card-body bg-light">
            <div className="container">
              <h1>ทำสัญญา</h1>
              <form id="contract-form" role="form">
                <div className="controls text-left">

                  <div className="row">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="form-group">
                          <label htmlFor="addNumBuySale">เลขที่สัญญาจะซื้อจะขายที่ดิน</label>
                          <input
                            type="text"
                            className="form-control"
                            id="addNumBuySale"
                            maxLength="4"
                            value={addNumBuySale}
                            onChange={(e) => setAddNumBuySale(e.target.value)}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="addWitnessOneName">ชื่อพยานคนที่หนึ่ง</label>
                          <input
                            type="text"
                            className="form-control"
                            id="addWitnessOneName"
                            value={addWitnessOneName}
                            onChange={(e) => setAddWitnessOneName(e.target.value)}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="addWitnessTwoName">ชื่อพยานคนที่สอง</label>
                          <input
                            type="text"
                            className="form-control"
                            id="addWitnessTwoName"
                            value={addWitnessTwoName}
                            onChange={(e) => setAddWitnessTwoName(e.target.value)}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="addLoanLimit">จำนวนวงเงินกู้ธนาคาร</label>
                          <input
                            type="text"
                            className="form-control"
                            id="addLoanLimit"
                            value={addLoanLimit}
                            onChange={(e) => setAddLoanLimit(e.target.value)}
                          />
                        </div>
                  
                          <div className="col-md-12">
                          <div className="row">
                            <div className="card mt-2">
                              {books.map((book, idx) => (
                                <div key={idx}>
                                  <p>เลขการจอง : {book.b_id} </p>
                                </div>
                              ))}
                              {profile.map((val, idx) => (
                                <div key={idx}>
                                  <p>ชื่อเจ้าของโครงการ : {val.md_name}</p>
                                  <p>ที่อยู่โครงการ : {val.address}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-12">
                      <button type="button" className="btn button01 btn-send pt-2 btn-block" onClick={Contract}>
                        ยืนยันการทำสัญญา
                      </button>
                    </div>
                  </div>

                </div>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    

  );
};

export default ContractAdd;