import { useContext } from 'react'
import '../styling/navbar.css'
import SearchIcon from '../Assets/Icons/SearchIcon.svg'
import AccountIcon from '../Assets/Icons/AccountIcon.svg'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Navbar = ({ isOpen }) => {
    let { logoutUser, authTokens } = useContext(AuthContext)

    const navigate = useNavigate()
    let screenWidth = window.innerWidth
    return (
        <div className='Navbar'>
            <div className="left">
                {!isOpen && (
                    <p className="logo" onClick={() => navigate('/')}>NP</p>
                )}
                <div className="searchbar">
                    <img src={SearchIcon} alt="" />
                    <input type="text" placeholder='Search' />
                </div>
            </div>
            <div className="right">
                <img src={AccountIcon} alt="" />
                {screenWidth >= 600 && (
                    <div className="account-details">
                        <p className='cursor-pointer' onClick={() => navigate('login/')} id='user-name'>{authTokens ? '' : 'login'}</p>
                        <p className='cursor-pointer' onClick={() => navigate('register/')} id='user-name'>{authTokens ? '' : 'register'}</p>
                        <p onClick={logoutUser} className='cursor-pointer' id='user-name'>{authTokens ? 'logout' : ''}</p>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Navbar