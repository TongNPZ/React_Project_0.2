import React, { useState, useEffect } from "react";
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
  const [newLoanLimit, setNewLoanLimit] = useState("");

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
      newLoanLimit: newLoanLimit || contracts[0]?.loan_limit,
    };

    // ถามผู้ใช้ก่อนทำการแก้ไข
    const confirmUpdate = window.confirm("คุณต้องการทำการเพิ่มข้อมูลหรือไม่?");

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
        window.alert("เกิดข้อผิดพลาดเพิ่มข้อมูล");
        navigate("/Booking");
      }
    }
  };

  const Cancel = () => {
    navigate(`/Booking`);
  };

  return (
    <div className="container">
      <div className="text-center">
        <h1>แก้ไขสัญญา</h1>
      </div>

      <div className="row">
        <div className="col-lg-7 mx-auto tex">
          <div className="card mt-2 mx-auto p-4 bg-light">
            <div className="card-body bg-light">
              <div className="container">
                <form id="contact-form" role="form">
                  <div className="controls text-left">

                    <div className="row">
                      <div className="col-md-12">

                        <div className="form-group">
                          <label htmlFor="newNumBuySale">&nbsp;&nbsp;เลขที่สัญญาจะซื้อจะขายที่ดิน</label>
                          <input
                            type="text"
                            className="form-control"
                            id="newNumBuySale"
                            value={newNumBuySale || contracts[0]?.num_buySale}
                            onChange={(e) => setNewNumBuySale(e.target.value)}
                          />
                        </div>
                        <br />

                        <div className="form-group">
                          <label htmlFor="newWitnessOneName">&nbsp;&nbsp;ชื่อพยานคนที่หนึ่ง</label>
                          <input
                            type="text"
                            className="form-control"
                            id="newWitnessOneName"
                            value={newWitnessOneName || contracts[0]?.witnessone_name}
                            onChange={(e) => setNewWitnessOneName(e.target.value)}
                          />
                        </div>
                        <br />

                        <div className="form-group">
                          <label htmlFor="newWitnessTwoName">&nbsp;&nbsp;ชื่อพยานคนที่สอง</label>
                          <input
                            type="text"
                            className="form-control"
                            id="newWitnessTwoName"
                            value={newWitnessTwoName || contracts[0]?.witnesstwo_name}
                            onChange={(e) => setNewWitnessTwoName(e.target.value)}
                          />
                        </div>
                        <br />

                        <div className="form-group">
                          <label htmlFor="newLoanLimit">&nbsp;&nbsp;จำนวนวงเงินกู้ธนาคาร</label>
                          <input
                            type="text"
                            className="form-control"
                            id="newLoanLimit"
                            value={newLoanLimit || contracts[0]?.loan_limit}
                            onChange={(e) => setNewLoanLimit(e.target.value)}
                          />
                        </div>
                        <br />

                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <br />
                        <div className="row">
                          <div className="col-md-6">
                            <button type="button" className="btn button09 btn-send pt-2 btn-block" onClick={Edit}>
                              &nbsp;&nbsp;บันทึก&nbsp;&nbsp;
                            </button>
                          </div>
                          <div className="col-md-6">
                            <button type="button" className="btn button010 btn-send pt-2 btn-block" onClick={Cancel}>
                              ยกเลิก
                            </button>
                          </div>
                        </div>
                      </div>
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

export default ContractEdit;
