import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const TransferEdit = () => {
  const User_API = "http://26.90.237.200:3000/contract/edit";
  const navigate = useNavigate();
  const { Bid } = useParams(); // รับค่าพารามิเตอร์ Bid จาก URL
  const [contracts, setContract] = useState([]);

  const [newNumBuySale, setNewNumBuySale] = useState("");
  const [newSubcontract, setNewSubcontract] = useState("");
  const [newPublicService, setNewPublicService] = useState("");

  useEffect(() => {
    contractData();
  }, [Bid]);

  const contractData = () => {
    axios.get('http://26.90.237.200:3000/contract/read')
      .then(response => {
        // const contract = response.data.find(contract => contract[0]?.b_id === Bid);
        setContract(response.data);
      //  console.log(response.data[0]?.b_id);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // const Bid = {
  //   id: 172
  // }
  const Edit = async () => {
    const data = {
      newBookFK: Bid,
      newNumBuySale: newNumBuySale,
      newSubcontract: newSubcontract,
      newPublicService: newPublicService,
    };
     console.log(data)

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
  console.log(contracts);
  return (
    <div className="container">
      <h1>แก้ไขสัญญา</h1>
      <form>

          <div>
            <div className="form-group">
              <label>เลขที่สัญญาจะซื้อจะขายที่ดิน</label>
              <input
                type="text"
                className="form-control"
                value={newNumBuySale}
                onChange={(e) => setNewNumBuySale(e.target.value)}
              />
            </div>
         
            <div className="form-group">
              <label>เลขที่สัญญาจ้างเหมา</label>
              <input
                type="text"
                className="form-control"
                value={newSubcontract }
                onChange={(e) => setNewSubcontract(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>เลขที่สัญญาสาธารณูปโภค</label>
              <input
                type="text"
                className="form-control"
                value={newPublicService }
                onChange={(e) => setNewPublicService(e.target.value)}
              />
            </div>
            
            <br />
          </div>

        <button type="button" className="btn btn-primary" onClick={Edit}>
          บันทึก
        </button>
      </form> 
    </div>
  );
};

export default TransferEdit;
