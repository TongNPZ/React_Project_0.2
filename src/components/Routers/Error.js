import NavBar from "../NavBar/NavBar";
import { useNavigate } from 'react-router-dom';

const Errorpage = () => {
    const navigate = useNavigate();
    const back = () => {
        navigate(`/`);
      };
    return <>
    <NavBar/>
    <main>
        <h1>An error occurred!</h1>
        <p>Could not find this page</p>
<br/>
        <button type="button" className="btn button09 btn-send pt-2 btn-block" onClick={back}>
                          กลับ
                        </button>
    </main>
    </> 
}

export default Errorpage;