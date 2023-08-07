import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminProfileEdit = () => {
  const API_URL = "http://26.90.237.200:3000/admin/edit";
  const navigate = useNavigate();

  const [profile, setProfile] = useState([]);
  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newManagerName, setNewManagerName] = useState("");
  const [newManagerLastname, setNewManagerLastname] = useState("");
  const [newDownRate, setNewDownRate] = useState(0);
  const [newCompany, setNewCompany] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newMDName, setNewMDName] = useState('');
  const [newMDNationality, setNewMDNationality] = useState('');
  const [newMDAddress, setNewMDAddress] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    axios
      .get('http://26.90.237.200:3000/admin/read')
      .then(response => {
        setProfile(response.data);
        setNewDownRate(response.data[0]?.down_rate || 0);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const updateProfile = async () => {
    const formData = new FormData();
    formData.append('id', profile[0].he_id);
    formData.append('newName', newName || profile[0]?.name);
    formData.append('newAddress', newAddress || profile[0]?.address);
    formData.append('newMName', newManagerName || profile[0]?.manager_name);
    formData.append('newMLname', newManagerLastname || profile[0]?.manager_lastname);
    formData.append('newDownRate', newDownRate || profile[0]?.down_rate);
    formData.append('newCompany', newCompany || profile[0]?.company);
    formData.append('newPhone', newPhone || profile[0]?.phone);
    formData.append('newMDName', newMDName || profile[0]?.md_name);
    formData.append('newMDNationality', newMDNationality || profile[0]?.md_nationality);
    formData.append('newMDAddress', newMDAddress || profile[0]?.md_address);
    formData.append('newImages', image);

console.log(formData.image)
console.log(formData)
console.log(profile[0].he_id)

    try {
      const shouldEdit = window.confirm('คุณต้องการทำการแก้ไขหรือไม่?');
      if (shouldEdit) {
        const response = await axios.patch(API_URL, formData,  {
          headers: {
            'Content-Type': 'multipart/form-data', // ตั้งค่า Content-Type เป็น multipart/form-data
          }
        });

        console.log(response.data);
        navigate('/AdminProfile');
      }
    } catch (error) {
      console.error(error);
      navigate('/Error');
    }
  };

  return (
    <div className="container">
       <h1>แก้ไขข้อมูลผู้จัดการ</h1>
      <form>
        {profile.map((val, idx) => (
          <div key={idx}>
             <div>
            <label htmlFor="newName" className="form-label">
            ชื่อโครงการ
            </label>
            <input
               maxLength="20"
              type="text"
              className="form-control"
              id="newName"
              value={newName || val.name}
              onChange={e => setNewName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="newManagerName" className="form-label">
            ชื่อผู้จัดการ
            </label>
            <input
               maxLength="20"
              type="text"
              className="form-control"
              id="newManagerName"
              value={newManagerName || val.manager_name}
              onChange={e => setNewManagerName(e.target.value)}
            /> 
          </div>
          <div>
            <label htmlFor="newManagerLastname" className="form-label">
            นามสกุล
            </label>
            <input
               maxLength="20"
              type="text"
              className="form-control"
              id="newManagerLastname"
              value={newManagerLastname || val.manager_lastname}
              onChange={e => setNewManagerLastname(e.target.value)}
            /> 
          </div>
          <div>
            <label htmlFor="newCompany" className="form-label">
            ชื่อบริษัทใหม่
            </label>
            <input
             maxLength="25"
              type="text"
              className="form-control"
              id="newCompany"
              value={newCompany || val.company}
              onChange={e => setNewCompany(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="newAddress" className="form-label">
            ที่อยู่โครงการ
            </label>
            <input
             maxLength="6"
              type="text"
              className="form-control"
              id="newAddress"
              value={newAddress || val.address}
              onChange={e => setNewAddress(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="newPhone" className="form-label">
            เบอร์โทร
            </label>
            <input
              maxLength="10"
              type="number"
              className="form-control"
              id="newPhone"
              value={newPhone || val.phone}
              onChange={e => setNewPhone(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="newMDName" className="form-label">
            ชื่อกรรมการผู้จัดการ
            </label>
            <input
              maxLength="10"
              type="text"
              className="form-control"
              id="newMDName"
              value={newMDName || val.md_name}
              onChange={e => setNewMDName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="newMDNationality" className="form-label">
            สัญชาติกรรมการผู้จัดการ
            </label>
            <input
            maxLength="20"
              type="text"
              className="form-control"
              id="newMDNationality"
              value={newMDNationality || val.md_nationality}
              onChange={e => setNewMDNationality(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="newMDAddress" className="form-label">
            ที่อยู่กรรมการผู้จัดการ
            </label>
            <input
            maxLength="20"
              type="text"
              className="form-control"
              id="newMDAddress"
              value={newMDAddress || val.md_address}
              onChange={e => setNewMDAddress(e.target.value)}
            />
          </div>
     
          <div>
            <label htmlFor="newDownRate" className="form-label">
            อัตราผ่อนใหม่
            </label>
            <input
            maxLength="20"
              type="number"
              className="form-control"
              id="newDownRate"
              value={newDownRate || val.down_rate} 
              onChange={e => setNewDownRate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="image" className="form-label">
            รูปภาพ Logo บริษัท
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              onChange={e => setImage(e.target.files[0])}
            />
          </div>
          </div>
        ))}
        <br/> 
        <button type="button" className="btn btn-primary" onClick={updateProfile}>
          แก้ไขข้อมูล
        </button>
      </form>
    </div>
  );
};

export default AdminProfileEdit;