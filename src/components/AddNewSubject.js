import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext'


const AddNewSubject = () => {
    let { authTokens, logoutUser, user } = useContext(AuthContext)
    let username = user.username
    let user_id = user.user_id

    const { workspace_id } = useParams()

    const navigate = useNavigate()

    const [formData, setFormData] = useState(
        { name: '', description: '', workspace: workspace_id, username: username, user: user_id }
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
        axios.post('https://web-production-0d22.up.railway.app/api/subject/', formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
            .then(response => {
                navigate(-1)
                console.log(response.data);

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
                <button className='add-workspace-btn' type="submit">Add Subject</button>
            </form>
        </div>
    )
}

export default AddNewSubject
