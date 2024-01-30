import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const AuthProvider = ({ children, requireStatus = [] }) => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const authen = localStorage.getItem('token');
  const statusAuthen = localStorage.getItem('statusAuth');

  const matchStatus = requireStatus.includes(statusAuthen);
  const loginPage = window.location.pathname === '/login';
  const homePage = window.location.pathname === '/';

  if (authen) {
    if (loginPage) {
      MySwal.fire({
        icon: "error",
        title: "กรุณาออกจากระบบ!",
        text: "คุณต้องออกจากระบบก่อน",
      }).then(() => {
        if (statusAuthen === '1') {
          navigate('/');
        } else if (statusAuthen === '2') {
          navigate('/');
        } else if (statusAuthen === '3') {
          navigate('/');
        }
      });
    } else if (!matchStatus) {
      if (!loginPage && !homePage) {
        MySwal.fire({
          icon: "error",
          title: "ปฏิเสธการเข้าถึง!",
          text: "คุณไม่มีสิทธิ์เข้าถึง",
        }).then(() => {
          navigate(-1);
        });
      }
    }
  } else if (!authen) {
    if (!loginPage && !homePage) {
      MySwal.fire({
        icon: "error",
        title: "กรุณาเข้าสู่ระบบ!",
        text: "คุณต้องเข้าสู่ระบบก่อนใช้งาน",
      }).then(() => {
        navigate('/');
      });
    }
  }

  return children
};

export default AuthProvider;
