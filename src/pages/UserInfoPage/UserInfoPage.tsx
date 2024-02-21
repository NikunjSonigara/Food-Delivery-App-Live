import { useDispatch, useSelector } from 'react-redux'
import './UserInfoPage.css'
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../../redux/slices/LoginSlice';

const UserInfoPage = () => {

    const login = useSelector((state: any) => state.login);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className='user_info'>
            <p className="user_info_title">
                My Information
            </p>
            <div className='user_info_div'>
                <div className="user_info_subdiv">
                    <div className="user_info_usericon">
                        <p className="user_info_username">N</p>
                    </div>
                    <p className="name">Name: <span>{login.userData?.name || "Nikunj Sonigara"}</span></p>
                    <p className="name">Email: <span>{login.userData?.email}</span></p>
                    <button className='logout_btn' onClick={() => { window.localStorage.removeItem("userData"); dispatch(userLogout(null)); navigate('/'); }}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default UserInfoPage