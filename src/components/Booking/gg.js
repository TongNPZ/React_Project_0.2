import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Login/AuthContext';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from 'react-bootstrap';
import { NumericFormat } from 'react-number-format';
import { BsFiletypePdf , LuEdit} from 'react-icons/bs';

const BookingCard = () => {
  const [books, setBooks] = useState([]);
  const [houses, setHouses] = useState([]);
  // const [selectedType, setSelectedType] = useState(null);
  
  const User_API = "http://26.90.237.200:3000/transfer/add";
  const [addNote, setAddNote] = useState("");
  const [show, setShow] = useState(false);
  const [tempBook, setTempBook] = useState(null);

  const navigate = useNavigate();
  const Auth = useContext(AuthContext);

  useEffect(() => {
    loadHouses();
    loadBooking();
  }, []);

  const loadHouses = () => {
    axios
      .get('http://26.90.237.200:3000/admin/house/read')
      .then(response => {
        setHouses(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const loadBooking = () => {
    axios.get('http://26.90.237.200:3000/book/read')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const statusCancel = (status) => {
    switch (status) {
      case 0:
        return { message: ' กำลังดำเนินการจอง ', colorClass: 'text-primary' };
      case 1:
        return { message: ' การจองเสร็จสิ้น ', colorClass: 'text-success' };
      case 2:
        return { message: ' ยกเลิกการจอง ', colorClass: 'text-danger' };
      default:
        return { message: ' ไม่ทราบสถานะ ', colorClass: '' };
    }
  };

  const handleCancelClick = (book) => {
    // console.log(book)
    const confirmCancel = window.confirm('คุณต้องการการจองนี้หรือไม่?');
    if (confirmCancel) {
      // const data = { id: book.b_id };
      // console.log(book.b_id)
      axios.patch(`http://26.90.237.200:3000/book/edit/status`,{
          data: { id: book.b_id },
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          alert('ยกเลิกการจองสำเร็จ');
          loadBooking(); 
          // console.log(data)
        })
        // console.log(data)
        .catch(error => {
          console.error(error);
          alert('เกิดข้อผิดพลาดในการยกเลิกการจอง');
        });
    }
  };

  const handleClose = () => setShow(false);
  
  const handleShow = (book) => {
  setTempBook(book);
  setShow(true);
}
//=======================================================================
  const Contract = async () => {
  const data = {
    addBookFK: tempBook.b_id,
    addNote: addNote,
  };
  const confirmUpdate = window.confirm("คุณต้องการทำการเพิ่มข้อมูลหรือไม่?");
  if (confirmUpdate) {
    try {
      const response = await axios.post(User_API, data);
      // console.log(response.data);
      window.alert("เพิ่มข้อมูลสำเร็จ");
      loadBooking();
      // navigate(`/TransferUser/${tempBook.user_id}`);
      navigate("/Housing");
    } catch (error) {
      console.error(error);
      window.alert("เกิดข้อผิดพลาดเพิ่มข้อมูล");
      navigate("/Error");
    }
  }
  handleClose();
};

  return (
    <div className="container">
    {/* {Auth.isLoggedIn && Auth.status == 1 && (
            <div className="d-flex justify-content-end">
              <Link to="/AddBooking" className="btn btn-primary">เพิ่มการจอง</Link>
            </div>
          )} */}
      <br />
      <div>
        {books.map((book, idx) => {
          const house = houses.find(house => house.h_id === book.h_id); // == , === +++++++++++++ เผื่อบัค
          
          return (

            
            <div className="card" key={idx}>
              {Auth.isLoggedIn && Auth.status == 1 && (
                <div className="d-flex justify-content-end">
                  {book.status === 0 && (
                    <div className="content">
                      <Link to={`/EditBooking/${book.b_id}`} className="btn btn-warning">แก้ไข</Link>
                      &nbsp;
                      <button className="btn btn-danger" onClick={() => handleCancelClick(book)}>
                        ยกเลิกการจอง
                      </button>
                    </div>
                  )}
                </div>
              )}
              <div className="content">
                <p>เลขการจอง: {book.b_id}</p>
                <p>บ้านเลขที่: {book.h_id}</p>
                {house && (
                  <NumericFormat
                  value={house.book_price}
                  allowLeadingZeros
                  thousandSeparator=","
                  displayType="text"
                  renderText={(value) => <p>ราคาที่จอง : {value} บาท</p>}
                />
                  // <p>ราคาที่จอง: {house.book_price}</p>
                )}

                <p>วันที่จอง: { dayjs(book.date).add(543, 'year').format('DD MMMM YYYY')} </p>
                <div>
                  
                  <div className="content">
                    <p>สถานะการจอง:
                      <span className={`fw-bold ${statusCancel(book.status).colorClass}`}>
                        {statusCancel(book.status).message}
                      </span>
                    </p>
                  </div>
                </div>
       
                <p>เลขบัตรประชาชนผู้จอง: {book.user_id}</p>
                <p>หมายเหตุ: {book.note}</p>
              </div>
              <div className="content">
              <div className="content">
              {Auth.isLoggedIn && Auth.status == 1 && (
                                <div>
                  {book.status === 0 && (
                    <div className="content">
                      &nbsp;
                      <Link to={`/Receipt/${book.b_id}`} className="btn btn-primary">
                          บันทึกใบเสร็จจอง <BsFiletypePdf size={30} />
                      </Link>
                      <br/>  
                      <br/>
                      <Link to={`/ContractAdd/${book.b_id}`} className="btn btn-success">ทำสัญญา</Link>
                    </div>
                  )}
                              </div>
                      )}
          {Auth.isLoggedIn && Auth.status == 1 && (
            <div>
        {house.status !== 3 && (
          <div>
            {book.status === 1 && (
              <div className="content">
                &nbsp;
                  <Link to={`/ContractDoc/${book.b_id}`} className="btn btn-primary">
                     บันทึกสัญญา   <BsFiletypePdf size={30} />
                  </Link>                
                &nbsp;
                <Link to={`/ReceiptCon/${book.b_id}`} className="btn btn-primary">
                  ใบเสร็จสัญญา    <BsFiletypePdf size={30} />
                </Link>
                <br/>
                <br/>
                <button className="btn btn-success" onClick={() => handleShow(book)}>
                    โอนกรรมสิทธิ์
                </button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>โอนกรรมสิทธิ์</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group controlId="formAddNote">
                  <Form.Label>หมายเหตุ</Form.Label>
                  <Form.Control type="text" placeholder="ใส่ข้อความหมายเหตุ" onChange={e => setAddNote(e.target.value)} />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
              <Button variant="primary" onClick={Contract}>
                  บันทึก
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  ปิด
                </Button>

              </Modal.Footer>
            </Modal>
        {/* <button className="btn btn-primary" onClick={() => Contract(book)}>
              โอนกรรมสิทธิ์
        </button> */}
      </div>
              )}
            </div>
            )}
            </div>
          )}
          </div>
                <br />
                <br />
                <br />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BookingCard;



