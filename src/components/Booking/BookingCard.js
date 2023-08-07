import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Login/AuthContext';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from 'react-bootstrap';
import { NumericFormat } from 'react-number-format';
import { BsFiletypePdf, LuEdit } from 'react-icons/bs';
import { Dropdown } from 'react-bootstrap';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
const BookingCard = () => {
  const [books, setBooks] = useState([]);
  const [houses, setHouses] = useState([]);
  // const [selectedType, setSelectedType] = useState(null);

  const User_API = "http://26.90.237.200:3000/transfer/add";
  const [addTitleHolder, setAddTitleHolder] = useState("");
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
      axios.patch(`http://26.90.237.200:3000/book/edit/status`, {
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
      addTitleHolder:addTitleHolder
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

  const ReceiptCon = (bookID) => {
    navigate(`/ReceiptCon/${bookID}`);
  };
  const ContractDoc = (bookID) => {
    navigate(`/ContractDoc/${bookID}`);
  };
  
  return (
    <div className="container">
      <br />
      <div className="row">
        {books.map((book, idx) => {
          const house = houses.find(house => house.h_id === book.h_id); // == , === +++++++++++++ เผื่อบัค
          return (
            <div className="col-4 ">
              <div className="card" key={idx}>
                <img className="card-img-top" src={house.image} alt={`House ${house.h_id}`} />
                <div className="card-body" >
               
                  <h5 className="card-title">เลขการจอง: {book.b_id}</h5>
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
                  <p>วันที่จอง: {dayjs(book.date).add(543, 'year').format('DD MMMM YYYY')} </p>
                  <p>สถานะการจอง:
                    <span className={`fw-bold ${statusCancel(book.status).colorClass}`}>
                      {statusCancel(book.status).message}
                    </span>
                  </p>
                  <p>เลขบัตรประชาชนผู้จอง: {book.user_id}</p>
                  
                  <p>หมายเหตุ: {book.note}</p>
                  
                  {/* {Auth.isLoggedIn && Auth.status == 1 && (
                    <div className="mt-3">
                      {book.status === 0 && (
                        <div className="d-flex">
                          <Link to={`/EditBooking/${book.b_id}`} className="btn button">แก้ไข</Link>
                          <button className="btn button" onClick={() => handleCancelClick(book)}>
                            ยกเลิกการจอง
                          </button>
                        </div>
                      )}
                    </div>
                  )} */}

                  {Auth.isLoggedIn && Auth.status == 1 && (
                    <div className="mt-3 d-flex justify-content-between">
                    {book.status === 0 && (
                      <div className="d-flex align-items-center">
                        <Link to={`/ContractAdd/${book.b_id}`} className="btn button"> ทำสัญญา </Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={`/Receipt/${book.b_id}`} className="btn button02"> บันทึกใบเสร็จจอง </Link>
                      </div>
                    )}
                  
                    {book.status === 0 && (
                      <Dropdown>
                        <Dropdown.Toggle variant="" className="nav-link" id="dropdown-basic">
                          <GiHamburgerMenu size={30} style={{ color: '#9847FF' }} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <AiFillEdit size={30} style={{ color: '#9847FF' }} />แก้ไขการจอง 
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <MdDelete size={30}  style={{ color: '#9847FF' }}/> ลบการจอง 
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </div>                  
                  )}

                    {Auth.isLoggedIn && Auth.status == 1 && (
                      <div>
                        {house.status !== 3 && (
                          <div className="mt-3 d-flex flex-column align-items-center">
                            {book.status === 1 && (
                              <>
                                <div className="d-flex align-items-center mb-3">
                                  
                                  <button className="btn button02" onClick={() => ContractDoc(book.b_id)}>
                                    <BsFiletypePdf size={20} />พิมพ์สัญญา
                                  </button>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <button className="btn button02 " onClick={() => ReceiptCon(book.b_id)}>
                                    <BsFiletypePdf size={20} />พิมพ์ใบเสร็จสัญญา
                                  </button>
                                  
                                </div>
                                <button className="btn button mb-3" onClick={() => handleShow(book)}>
                                  โอนกรรมสิทธิ์
                                </button>

                                <Modal show={show} onHide={handleClose}>
                                  <Modal.Header closeButton>
                                    <Modal.Title>โอนกรรมสิทธิ์</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <Form.Group controlId="formAddNote">
                                      <Form.Label>ชื่อผู้ถือครองกรรมสิทธิ์</Form.Label>
                                      <Form.Control type="text" placeholder="ใส่ชื่อผู้ถือครองกรรมสิทธิ์" onChange={e => setAddTitleHolder(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group controlId="formAddNote">
                                      <Form.Label>หมายเหตุ</Form.Label>
                                      <Form.Control type="text" placeholder="ใส่ข้อความหมายเหตุ" onChange={e => setAddNote(e.target.value)} />
                                    </Form.Group>
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button className="btn button" onClick={Contract}>
                                      บันทึก
                                    </Button>
                                    <Button className="btn button02" onClick={handleClose}>
                                      ปิด
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  <br />
              

                </div>
              </div>
              <br />
            </div>

          );
        })}

      </div>
    </div>
  );
}

export default BookingCard;



