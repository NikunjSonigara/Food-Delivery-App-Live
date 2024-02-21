import { useEffect, useState, ReactNode, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, userLogout } from '../../redux/slices/LoginSlice';
import { Navigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

const PrivateRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const login = useSelector((state: { login: { isLoggedIn: boolean, email: string } }) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("useLayout Called");
    const fetchData = async () => {
      const d = window.localStorage.getItem('userData');
      if (d) {
        // console.log("set true");
        dispatch(userLogin(JSON.parse(d)));
        // console.log(JSON.parse(d));
      } 
      else {
        // console.log("set false");
        dispatch(userLogout(null));
      }
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <Spinner/>;
  }

  if (login?.isLoggedIn) {
    return <>{children}</>;
  } 
  else {
    return <Navigate to='/login' />;
  }
}

export default PrivateRoute;
