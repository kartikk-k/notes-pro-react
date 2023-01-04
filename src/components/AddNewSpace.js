import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styling/addnewobject.css'
import { useContext } from 'react';
import AuthContext from '../context/AuthContext'


const AddNewSpace = () => {
    let { authTokens, logoutUser, user } = useContext(AuthContext)
    let username = user.username
    let user_id = user.user_id

    const navigate = useNavigate()

    const [formData, setFormData] = useState(
        { name: '', description: '', username: username, user: user_id }
    );


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/workspace/', formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
            .then(response => {
                console.log(formData)
                navigate('/workspaces/')
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className='add-object-main'>
            <form onSubmit={handleSubmit} className="add-object-form">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                />
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <button className='add-workspace-btn' type="submit">Add Workspace</button>
            </form>
        </div>
    )
}

export default AddNewSpace