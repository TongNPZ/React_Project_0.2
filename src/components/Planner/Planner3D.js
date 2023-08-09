import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Planner.css";

const Planner3D = () => {
  const navigate = useNavigate();
    return (

      <div className="" >

<iframe src="https://planner5d.com/v?key=79e530c1a779b82338bbd76fe5467b5e&viewMode=2d"  allowfullscreen></iframe>
        <br/>
        <br/>
        <button className="btn  button010" onClick={() => {navigate('/Housing');}}> กลับ </button>
    </div>

    );
  }
  export default Planner3D;