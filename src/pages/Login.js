import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import '../styling/pages/login.css'

const Login = () => {
    let { loginUser } = useContext(AuthContext)
    return (
        <div className='login-form-main'>
            <form onSubmit={loginUser}>
                <input className='field' type="text" name='username' placeholder='username' />
                <input className='field' type="password" name='password' placeholder='password' />
                <input className='form-btn' type="submit" value="Login" />
            </form>
        </div>
    )
}

export default Login