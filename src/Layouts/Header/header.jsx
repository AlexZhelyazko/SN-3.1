import './header.sass';
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux';
import { logOutUserTC } from '../../redux/auth-reducer';

export const Header = () => {
    const dispatch = useDispatch()
    let auth = useSelector((state) => state.auth)
    function LogOut () {
        dispatch(logOutUserTC())
    }
    return (
        <header>
            <span>Logo</span>
            <button>Change theme</button>
            <button onClick={LogOut}>LogOut</button>
            {auth.isAuth ? <span>{auth.login}</span> : <span>Login</span>}
        </header>
    )
};