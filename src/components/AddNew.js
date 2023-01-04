import React from 'react'
import '../styling/addnew.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

// adding add-new btn url as object to be passed when called
const AddNew = ({ addTo, workspace_id, subject_id }) => {

    const navigate = useNavigate()

    useEffect(() => {

    }, [])

    const handleRedirection = () => {
        if (addTo === 'workspaces') {
            navigate('/add-workspace/')
        } if (addTo === 'subjects') {
            navigate(`/${workspace_id}/add-subject/`)
        } if (addTo === 'chapters') {
            navigate(`/${subject_id}/add-chapter/`)
        }
    }

    return (
        <div className="add-new" onClick={handleRedirection}>
            <p className='add-new-icon'>+</p>
            <p className='add-icon-text'>Add New</p>
        </div>
    )
}

export default AddNew
