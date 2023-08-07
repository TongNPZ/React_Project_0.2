import axios from 'axios';

const loginUser = async (username, password, setStatus, setIsLoggedIn) => {
  try {
    const response = await axios.post("http://26.90.237.200:3000/login", { username, password });
    const settoken = response.data.token;
    localStorage.setItem('token', settoken);

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    const authResponse = await axios.post('http://26.90.237.200:3000/authen', { username, password },config);
    if ([1, 2, 3].includes(authResponse.data.decoded.statusAuthen)) {
      const userStatus = authResponse.data.decoded.statusAuthen;
      localStorage.setItem('userStatus', userStatus);
      setStatus(userStatus);
      setIsLoggedIn(true);
      alert('Authen success');
      return { status: userStatus, auth: true };
      
    } else {
      localStorage.removeItem('userStatus');
      setStatus(null);
      setIsLoggedIn(false);
      alert('Authen failed');
      return { status: null, auth: false };
    }
    
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('userStatus');
    setStatus(null);
    setIsLoggedIn(false);
    alert('Authen error');
    console.error(error);
    return { status: null, auth: false };
  }
};

export default loginUser;
