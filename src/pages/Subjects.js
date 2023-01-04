import React, { useState, useEffect } from 'react'
import '../styling/pages/subjects.css'
import ActionIcon from '../Assets/Icons/ActionIcon.svg'
import CreatedDate from '../components/CreatedDate'
import AddNew from '../components/AddNew'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const Subjects = () => {
    let { authTokens, logoutUser } = useContext(AuthContext)
    const { workspace_id } = useParams()
    const navigate = useNavigate()
    const [subject, setSubjects] = useState([])
    useEffect(() => {
        let FETCH_URL = ''
        if (workspace_id) {
            FETCH_URL = `/api/workspace/${workspace_id}/subjects/`
        } else {
            FETCH_URL = '/api/subject/'
        }
        getSubjects(FETCH_URL)
    }, [])


    const getSubjects = async (FETCH_URL) => {
        let response = await fetch(FETCH_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
        })
        if (response.status === 'Unauthorized') {
            logoutUser()
        }
        let data = await response.json()
        setSubjects(data)
    }

    const expandSubject = (subject_id, workspace_id) => {
        console.log(workspace_id)
        navigate(`/workspaces/${workspace_id}/subjects/${subject_id}/`)
    }

    const deleteSubject = async (subject_id) => {
        let confirm = window.confirm("Are you sure you want to delete this subject?")
        if (confirm) {
            let response = await fetch(`/api/subject/${subject_id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + String(authTokens.access)
                }
            })
            getSubjects('/api/subject/')
        }
    }

    const [isAction, setIsAction] = useState({})
    const handleAction = (key) => {
        setIsAction({ ...isAction, [key]: (!isAction[key]) })
    }

    return (
        <div className='Subjects'>
            {/* <h1 className='heading'>Subjects</h1> */}
            <div className="subject-list">
                {subject.map((subject, index) => (

                    <div className="subject" key={index}>
                        <div className="header">
                            <h1 className="subject-name">{subject.name}</h1>
                            <div className="actions">
                                {isAction[index] && (
                                    <div className="workspace-action-area">
                                        {/* <button id='view-btn'>View</button> */}
                                        <button id='delete-btn' onClick={() => deleteSubject(subject.id)}>Delete</button>
                                    </div>
                                )}
                                <img src={ActionIcon} alt="actions" onClick={() => handleAction(index)} />
                            </div>
                        </div>
                        <p className="subject-description">{subject.description}</p>
                        <button className='view-btn' onClick={() => expandSubject(subject.id, subject.workspace)}>View Subject</button>
                        <p className='created'>{<CreatedDate created={subject.created_at} />}</p>
                    </div>
                ))}
                {workspace_id && (
                    <AddNew addTo={'subjects'} workspace_id={workspace_id} />
                )}
            </div>
        </div>
    )
}

export default Subjects