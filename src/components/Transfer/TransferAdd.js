import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const TransferAdd = () => {
  const User_API = "http://26.90.237.200:3000/transfer/add";
  const navigate = useNavigate();
  const { Bid } = useParams(); // รับค่าพารามิเตอร์ Bid จาก URL
  const [addNote, setAddNote] = useState("");

  const Contract = async () => {

    const data = {
      addBookFK: Bid,
      addNote: addNote,
    };
console.log(Bid)
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
        navigate("/Error");
      }
    }
  };

  return (
    <div className="container">
      <h1>โอนกรรมสิทธิ์</h1>
      <form>

          <div>
            <div className="form-group">
              <h4>เลขการจอง : {Bid}</h4>
            </div>

            <div className="form-group">
              <label>หมายเหตุ (ไม่ต้องใส่ก็ได้)</label>
              <input
                type="text"
                className="form-control"
                value={ addNote }
                onChange={(e) => setAddNote(e.target.value)}
              />
            </div>
            
            <br />
          </div>

        {/* <button type="button" className="btn btn-primary" onClick={Contract}>
          บันทึก
        </button> */}

        <button type="button" className="btn btn-primary" onClick={Contract}>
          บันทึก
        </button>
      </form> 
    </div>
  );
};

export default TransferAdd;