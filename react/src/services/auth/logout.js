import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loggedFalse } from "../../component/features/loginButton/loginButtonSlice";

function Logout () {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    
    
    dispatch(loggedFalse())
    localStorage.removeItem('access_token');
    navigate('/', { replace: true });
    return true
  }

export default Logout
