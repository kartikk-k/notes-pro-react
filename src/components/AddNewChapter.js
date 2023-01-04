import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext'



const AddNewChapter = () => {
    let { authTokens, logoutUser, user } = useContext(AuthContext)
    let username = user.username
    let user_id = user.user_id

    const { subject_id } = useParams()

    const navigate = useNavigate()

    const [formData, setFormData] = useState(
        { name: '', description: '', subject: subject_id, username: username, user: user_id }
    );


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let response = await fetch(`/api/chapter/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify(formData)
        })
        navigate(-1)
    }

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
                <button className='add-workspace-btn' type="submit">Add Chapter</button>
            </form>
        </div>
    )
}

export default AddNewChapter
