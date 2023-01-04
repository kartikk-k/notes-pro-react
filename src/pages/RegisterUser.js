import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styling/pages/login.css'

const RegisterUser = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    const [formData, setFormData] = useState(
        { username: '', password1: '', password2: '' }
    );

    const handleSubmit = async (e) => {
        console.log(formData)
        e.preventDefault()

        let response = await fetch('https://web-production-0d22.up.railway.app/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            console.log(response.data)
            navigate('/login')
        })
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((spread) => ({
            ...spread,
            [name]: value,
        }));
    };

    return (
        <div className='login-form-main'>
            <form onSubmit={handleSubmit}>
                <input
                    className='field'
                    onChange={handleChange}
                    value={formData.username}
                    type="text" name='username' id='username' placeholder='username' /><br />
                {/* <input
                    onChange={handleChange}
                    value={formData.name}
                    type="text" name='name' id='name' placeholder='name' /><br /> */}
                <input
                    className='field'
                    onChange={handleChange}
                    value={formData.password1}
                    type="password" name='password1' id='password1' placeholder='password' /><br />
                <input
                    className='field'
                    onChange={handleChange}
                    value={formData.password2}
                    type="password" name='password2' id='password2' placeholder='confirm password' /><br />
                <input
                    className='form-btn' type="submit" value="Register" />
            </form>
        </div>
    )
}

export default RegisterUser