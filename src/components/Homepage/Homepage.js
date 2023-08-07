import React from 'react';

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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
    <div className="container" style={divStyle}>
      <h1>พวงเพชร 4</h1>
      <h2>“พวกเพชร บ้านเลอค่าดุจอัญมณี”</h2>

      <div style={homeTableStyle}>
        {/* <h3>เยี่ยมชมหมู่บ้าน</h3> */}
        <table>
          {/* <thead>
            <tr>
              <th>โซน A</th>
              <th>โซน B</th>
            </tr>
          </thead> */}
          <tbody>
            {/* Add more rows as needed */}
          </tbody>
        </table>
        {/* <button style={buttonStyle}>เข้าเยี่ยมชม</button> */}
      </div>
    </div>
  );
};

export default Homepage;
