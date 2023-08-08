import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ContractEdit = () => {
  const User_API = "http://26.90.237.200:3000/contract/edit";
  const navigate = useNavigate();
  const { Bid } = useParams(); // รับค่าพารามิเตอร์ Bid จาก URL
  const [contracts, setContract] = useState([]);

  const [newNumBuySale, setNewNumBuySale] = useState("");
  const [newWitnessOneName, setNewWitnessOneName] = useState("");
  const [newWitnessTwoName, setNewWitnessTwoName] = useState("");

  useEffect(() => {
    contractData();
  }, []);


  const contractData = () => {
    const data = {
      id: Bid
    }
    axios.post('http://26.90.237.200:3000/contract/read/id', data)
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
      id: Bid,
      newNumBuySale: newNumBuySale || contracts[0]?.num_buySale,
      newWitnessOneName: newWitnessOneName || contracts[0]?.witnessone_name,
      newWitnessTwoName: newWitnessTwoName || contracts[0]?.witnesstwo_name,
    };

    // ถามผู้ใช้ก่อนทำการแก้ไข
    const confirmUpdate = window.confirm("คุณต้องการทำการเพิ่มข้อมูลหรือไม่?");

    if (confirmUpdate) {
      try {
        const response = await axios.patch(User_API, data);
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
                value={newNumBuySale || contracts[0]?.num_buySale}
                onChange={(e) => setNewNumBuySale(e.target.value)}
              />
            </div>
         
            <div className="form-group">
              <label>ชื่อพยานคนที่หนึ่ง</label>
              <input
                type="text"
                className="form-control"
                value={newWitnessOneName  || contracts[0]?.witnessone_name}
                onChange={(e) => setNewWitnessOneName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>ชื่อพยานคนที่สอง</label>
              <input
                type="text"
                className="form-control"
                value={newWitnessTwoName || contracts[0]?.witnesstwo_name}
                onChange={(e) => setNewWitnessTwoName(e.target.value)}
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

export default ContractEdit;
