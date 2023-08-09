import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBooking = () => {
  const User_API = "http://26.90.237.200:3000/book/edit";
  const navigate = useNavigate();
  const { Bid } = useParams(); // รับค่าพารามิเตอร์ Bid จาก URL
  // const [id, setId] = useState('');
  const [newHouseFK, setNewHouseFK] = useState("");
  const [newUserFK, setNewUserFK] = useState("");
  const [newDateContract, setNewDateContract] = useState("");
  const [newNote, setNewNote] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadBookingData();
  }, []);

  const data = { id: Bid };
  const loadBookingData = () => {
    axios.post(`http://26.90.237.200:3000/book/read/id`, data)
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const updateUser = async () => {

    const data = {
      id: Bid,
      // newAmount: newAmount,
      newHouseFK: newHouseFK || books[0]?.h_id,
      newUserFK: newUserFK || books[0]?.user_id,
      newDateContract: newDateContract || books[0]?.date_contract,
      newNote: newNote || books[0]?.note,
    };
    // console.log(data)
    // ถามผู้ใช้ก่อนทำการแก้ไข
    const confirmUpdate = window.confirm("คุณต้องการทำการแก้ไขข้อมูลหรือไม่?");

    if (confirmUpdate) {
      try {
        const response = await axios.patch(User_API, data);
        console.log(response.data);

        // แจ้งเตือนเมื่อแก้ไขเสร็จสิ้น
        window.alert("แก้ไขข้อมูลสำเร็จ");
        navigate("/Booking");
      } catch (error) {
        console.error(error);

        // แจ้งเตือนเมื่อเกิดข้อผิดพลาดในการแก้ไขข้อมูล
        window.alert("เกิดข้อผิดพลาดในการแก้ไขข้อมูล");
        navigate("/Error");
      }
    }
  };

  return (
    <div className="container">
      <div className="text-center">
        <h1>แก้ไขการจอง</h1>
      </div>

      <div className="row">
        <div className="col-lg-7 mx-auto text-center">
          <div className="card mt-2 mx-auto p-4 bg-light">
            <div className="card-body bg-light">
              <div className="container">
                <form id="contact-form" role="form">
                  {books.map((val, idx) => (
                    <div className="controls text-left" key={idx}>

                      <div className="form-group">
                        <label htmlFor="newHouseFK">&nbsp;&nbsp;บ้านเลขที่</label>
                        <input
                          type="text"
                          className="form-control"
                          id="newHouseFK"
                          value={newHouseFK || val.h_id}
                          onChange={(e) => setNewHouseFK(e.target.value)}
                        />
                      </div>
                      <br />

                      <div className="form-group">
                        <label htmlFor="newUserFK">&nbsp;&nbsp;เลขบัตรประชาชนผู้จอง</label>
                        <input
                          type="text"
                          className="form-control"
                          id="newUserFK"
                          value={newUserFK || val.user_id}
                          onChange={(e) => setNewUserFK(e.target.value)}
                        />
                      </div>
                      <br />

                      <div className="form-group">
                        <label htmlFor="newNote">&nbsp;&nbsp;หมายเหตุ</label>
                        <input
                          type="text"
                          className="form-control"
                          id="newNote"
                          value={newNote || val.note}
                          onChange={(e) => setNewNote(e.target.value)}
                        />
                      </div>
                      <br />

                      <div className="form-group">
                        <label htmlFor="newDateContract">&nbsp;&nbsp;วันที่ทำสัญญา</label>
                        <input
                          type="date"
                          className="form-control"
                          id="newDateContract"
                          value={newDateContract || val.date_contract}
                          onChange={(e) => setNewDateContract(e.target.value)}
                        />
                      </div>
                      <br />

                    </div>
                  ))}
                  <div className="row">
                    <div className="col-md-12">
                      <button type="button" className="btn button09 btn-send pt-2 btn-block" onClick={updateUser}>
                        แก้ไขข้อมูล
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBooking;