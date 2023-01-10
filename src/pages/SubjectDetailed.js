import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Chapters from '../pages/Chapters'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const SubjectDetailed = () => {
    let { authTokens, logoutUser } = useContext(AuthContext)

    const navigate = useNavigate()

    let { workspace_id, subject_id } = useParams()

    const [subjectData, setSubjectData] = useState([])
    useEffect(() => {
        getSubjectData()
    }, [])

    const getSubjectData = async () => {
        let response = await fetch(`https://web-production-0d22.up.railway.app/api/subject/${subject_id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        setSubjectData(data)
    }

    const [chaptersData, setChaptersData] = useState([])
    useEffect(() => {
        getChaptersData()
    }, [])

    const getChaptersData = async () => {
        let response = await fetch(`https://web-production-0d22.up.railway.app/api/subject/${subject_id}/chapters/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        setChaptersData(data)
    }

    const confirmDelete = async () => {
        let confirm = window.confirm("Are you sure you want to delete this subject? This action cannot be undone.")
        if (confirm) {
            if (confirm) {
                let response = await fetch(`https://web-production-0d22.up.railway.app/api/subject/${subject_id}/`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + String(authTokens.access)
                    }
                })
                console.log("subject deleted")
                navigate(-1)
            }
        }
    }


    return (
        <div className='workspace-detailed'>
            <div className="workspace-data">
                <div className="detailed-workspace-header">
                    <div className="detailed-workspace-info">
                        <h1>{subjectData.name}</h1>
                        <p>{subjectData.description}</p>
                    </div>
                    <div className="detailed-workspace-actions">
                        <p onClick={() => { navigate(`/${subjectData.id}/add-chapter/`) }}>Add New</p>
                        <p className='delete-btn' onClick={confirmDelete}>Delete</p>
                    </div>
                </div>
                <div>
                    <Chapters subject_id={subject_id} />
                </div>
            </div>
        </div>
    )
}

export default SubjectDetailed
