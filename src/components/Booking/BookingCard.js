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
  const [zones, setZones] = useState([]);

  const User_API = "http://26.90.237.200:3000/transfer/add";
  const [addTitleHolder, setAddTitleHolder] = useState("");
  const [addNote, setAddNote] = useState("");
  const [show, setShow] = useState(false);
  const [tempBook, setTempBook] = useState(null);
  const [addDate, setAddDate] = useState(null);

  const navigate = useNavigate();
  const Auth = useContext(AuthContext);

  useEffect(() => {
    loadHouses();
    loadBooking();
    loadHouseTypes();
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
  const loadHouseTypes = () => {
    axios
      .get('http://26.90.237.200:3000/admin/house_zone/read')
      .then(response => {
        setZones(response.data);

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
    const confirmCancel = window.confirm('คุณต้องการยกเลิกจองนี้หรือไม่?');
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
      addTitleHolder: addTitleHolder,
      addDate: addDate
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

  const ReceiptRemain = (bookID) => {
    navigate(`/ReceiptRemain/${bookID}`);
  };

  const Receipt = (bookID) => {
    navigate(`/Receipt/${bookID}`);
  };

  const ContractDoc = (bookID) => {
    navigate(`/ContractDoc/${bookID}`);
  };

  const ContractAdd = (bookID) => {
    navigate(`/ContractAdd/${bookID}`);
  };

  const ContractEdit = (ConID) => {
    navigate(`/ContractEdit/${ConID}`);
  };

  const EditBooking = (bookID) => {
    navigate(`/EditBooking/${bookID}`);
  };

  const getZoneName = (hz_id) => {
    const matchedZone = zones.find(zone => zone.hz_id === hz_id);
    return matchedZone ? matchedZone.name : 'ไม่มีโซน';
  }

  return (
    <div className="container">
      <br />
      <div className="row">
        {books.map((book, idx) => {
          const house = houses.find(house => house.h_id === book.h_id); // == , === +++++++++++++ เผื่อบัค
          return (
            <div className="col-4 d-flex mb-4">
              <div className="card " key={idx}>
                <img className="card-img-top" src={house.image} alt={`House ${house.h_id}`} />

                <div className="card-body" >
                  <h5 className="card-title">เลขการจอง: {book.b_id}</h5>
                  <br />
                  <div className='text-left'>
                    <p className="card-text">โซน : {getZoneName(house.hz_id)}</p>

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
                  </div>

                  {Auth.isLoggedIn && Auth.status == 1 && (
                    <div className="mt-4 d-flex justify-content-between">

                      {book.status === 0 && (
                        <div className="d-flex justify-content-center mb-6" style={{ flexGrow: 1 }}>
                          <button className="btn button01" onClick={() => ContractAdd(book.b_id)}>
                            ทำสัญญา
                          </button>
                        </div>
                      )}

                      {book.status === 0 && (
                        <div className="d-flex justify-content-end">
                          <Dropdown>
                            <Dropdown.Toggle variant="" className="nav-link" id="dropdown-basic">
                              <GiHamburgerMenu size={30} style={{ color: '#1088d8' }} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => Receipt(book.b_id)}  >
                                <BsFiletypePdf size={30} style={{ color: '#1088d8' }} />พิมพ์ใบเสร็จจอง
                              </Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item onClick={() => EditBooking(book.b_id)}  >
                                <AiFillEdit size={30} style={{ color: '#1088d8' }} />แก้ไขการจอง
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => handleCancelClick(book)}  >
                                <MdDelete size={30} style={{ color: '#1088d8' }} /> ยกเลิกการจอง
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      )}
                    </div>
                  )}

                  {Auth.isLoggedIn && Auth.status == 1 && (
                    <div className="" >

                      {house.status !== 3 && (
                        <div className="mt-4 d-flex justify-content-between">
                          {book.status === 1 && (
                            <>
                              <div className="d-flex justify-content-center mb-6" style={{ flexGrow: 1 }}>
                                <button className="btn button01 mb-6" onClick={() => handleShow(book)}>
                                  โอนกรรมสิทธิ์
                                </button>
                              </div>
                              <div className="d-flex justify-content-end">
                                <Dropdown >
                                  <Dropdown.Toggle variant="" className="nav-link" id="dropdown-basic">
                                    <GiHamburgerMenu size={30} style={{ color: '#1088d8' }} />
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => ContractDoc(book.b_id)} >
                                      <BsFiletypePdf size={30} style={{ color: '#1088d8' }} />พิมพ์สัญญา
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => ReceiptCon(book.b_id)} >
                                      <BsFiletypePdf size={30} style={{ color: '#1088d8' }} /> พิมพ์ใบเสร็จสัญญา
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => ReceiptRemain(book.b_id)} >
                                      <BsFiletypePdf size={30} style={{ color: '#1088d8' }} /> พิมพ์ใบเสร็จเงินส่วนที่เหลือ
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={() => ContractEdit(book.b_id)}  >
                                      <AiFillEdit size={30} style={{ color: '#1088d8' }} />แก้ไขสัญญา
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>

                              <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                  <Modal.Title> โอนกรรมสิทธิ์ </Modal.Title>
                                </Modal.Header>
                                <br />
                                <Modal.Body>
                                  <Form.Group controlId="formTitleHolder">
                                    <Form.Label>&nbsp;&nbsp;ชื่อผู้ถือครองกรรมสิทธิ์</Form.Label>
                                    <Form.Control type="text" placeholder="ใส่ชื่อผู้ถือครองกรรมสิทธิ์" onChange={e => setAddTitleHolder(e.target.value)} />
                                  </Form.Group>
                                  <br />
                                  <Form.Group controlId="formDate">
                                    <Form.Label>&nbsp;&nbsp;วันที่โอนกรรมสิทธิ์</Form.Label>
                                    <Form.Control type="date" onChange={e => setAddDate(e.target.value)} />
                                  </Form.Group>
                                  <br />
                                  <Form.Group controlId="formAddNote">
                                    <Form.Label>&nbsp;&nbsp;หมายเหตุ</Form.Label>
                                    <Form.Control type="text" placeholder="ใส่ข้อความหมายเหตุ" onChange={e => setAddNote(e.target.value)} />
                                  </Form.Group>
                                </Modal.Body>
                                <br />
                                <Modal.Footer>
                                  <button className="btn button09" onClick={Contract}>
                                    บันทึก
                                  </button>
                                  <button className="btn button010" onClick={handleClose}>
                                    ปิด
                                  </button>
                                </Modal.Footer>
                              </Modal>

                            </>
                          )}
                        </div>
                      )}
                    </div>
                  )}

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



