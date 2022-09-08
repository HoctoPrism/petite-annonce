import { useNavigate } from "react-router-dom";

function Logout () {
    let navigate = useNavigate();
    localStorage.removeItem('access_token');
    navigate('/', { replace: true });
    return true
  }

export default Logout
