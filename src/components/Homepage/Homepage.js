import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';



const Homepage = () => {
  const divStyle = {
    backgroundImage: 'url(/image/Life-Box-320-1.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '100vh',
    color: 'white',
    textAlign: 'center',
    paddingTop: '20vh',
    position: 'relative',
  };

  const homeTableStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    padding: '20px',
    borderRadius: '20px',
    color: 'white',
    textAlign: 'left',
    width: '80%',
    margin: '0 auto',
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
  };

  const buttonStyle = {
    backgroundColor: '#957DAD',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div className="container">
      <div className="container" style={divStyle}>
        {/* ส่วนของหัวเรื่อง */}
        <h1>พวงเพชร 4</h1>
        <h2>“พวกเพชร บ้านเลอค่าดุจอัญมณี”</h2>
      </div>
      <div id="demo" className="carousel slide" data-bs-ride="carousel">
<div className="carousel-indicators">
  <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
  <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
  <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
</div>
<br></br>
<br></br>
<br></br>
<br></br>
<h2 className="ssr-section-header text-center">ตัวอย่างบ้าน</h2>
<br></br>
<Carousel>
  <Carousel.Item>
    <img src="/image/home3.png" alt="รูปภาพ" className="d-block"  />
  </Carousel.Item>
  <Carousel.Item>
    <img src="/image/home3.png" alt="รูปภาพ" className="d-block" />
  </Carousel.Item>
  <Carousel.Item>
    <img src="/image/home3.png" alt="รูปภาพ" className="d-block"  />
  </Carousel.Item>
</Carousel>

</div>



      {/* ส่วนของแนวคิดโครงการ */}
      <div className="ssr-header">
        <br></br>
        <br></br>
        <br></br>
        <h2 className="ssr-section-header text-center">แนวคิดโครงการ</h2>
        <br></br>
      </div>
      <div className="ssr-imgtxt-container imgtxt-1col" style={{ display: 'grid', placeItems: 'center' }}>
        <div className="container">
          <div className="row">
            <div className="ssr-box-imgtxt col-lg-30 ssr-box-imgtxt-custom-ab5a4c49-4f15-4371-894e-964f20773205">
              {/* ส่วนของรูปภาพ */}
              <img src="/image/homepag.png" alt="รูปภาพ" />
            </div>
            <div className="ssr-txt-body text-center">
              <div className="ssr-body-inner">
                <br></br>
                <h2>
                  หมู่บ้านพวกเพชร 4
                  <p></p>
                  <span style={{ fontFamily: 'GraphikTH-SemiBold', fontSize: '20px', color: '#009ede' }}>
                    สีสันของความพอดี ในสไตล์เมดิเตอร์เรเนียน
                  </span>
                </h2>
                <p>"ครั้งแรกบนทำเลใหม่ กับบ้านแฝดและทาวน์โฮมดีไซน์เมดิเตอร์เรเนียน"</p>
                <p>"ให้คุณใช้ชีวิตอย่างมีสีสันในบ้านที่พอดีกับทุกไลฟ์สไตล์ ด้วยพื้นที่ใช้สอยที่ลงตัวกับทุกคนในครอบครัว"</p>
                <p>"ต้อนรับด้วยบรรยากาศแสนอบอุ่นและสดใสในพื้นที่ส่วนกลาง ที่ถูกถ่ายทอดผ่านดีไซน์"</p>

                <div className="row clearfix">
                  <div className="col-md-12 column">
                    <div className="container">
                      <div className="ssr-header">
                        <h2 className="ssr-section-header text-center">ที่ตั้งโครงการ</h2>

                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.4706591337053!2d102.79484677514411!3d16.451688884284618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x312261dc935121f9%3A0xc255b3873a211c67!2z4Lir4Lih4Li54LmI4Lia4LmJ4Liy4LiZ4Lie4Lin4LiH4LmA4Lie4LiK4LijIDQ!5e0!3m2!1sth!2sth!4v1691449052568!5m2!1sth!2sth"
                          width="600"
                          height="450"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerpolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ส่วนของ card */}
      <div style={homeTableStyle}>
        <table>
          {/* ... (ตัวอย่างเพิ่มตารางหรือส่วนอื่นๆที่คุณต้องการ) */}
        </table>
        {/* <button style={buttonStyle}>เข้าเยี่ยมชม</button> */}
      </div>
      </div>


  );
};

export default Homepage;