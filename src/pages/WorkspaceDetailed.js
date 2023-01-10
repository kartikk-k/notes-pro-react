import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../styling/pages/workspaceDetailed.css'
import Subjects from '../pages/Subjects'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const WorkspaceDetailed = () => {
    let { authTokens, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate()

    let { workspace_id } = useParams()

    const [workspaceData, setWorkspaceData] = useState([])
    useEffect(() => {
        getWorkspaceData()
    }, [])

    const getWorkspaceData = async () => {
        let response = await fetch(`https://web-production-0d22.up.railway.app/api/workspace/${workspace_id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        setWorkspaceData(data)
    }

    const confirmDelete = async () => {
        let confirm = window.confirm("Are you sure you want to delete this workspace? This action cannot be undone.")
        if (confirm) {
            if (confirm) {
                let response = await fetch(`https://web-production-0d22.up.railway.app/api/workspaces/${workspace_id}/`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + String(authTokens.access)
                    }
                })
                console.log("workspace deleted")
                navigate('/workspaces/')
            }
        }
    }

    return (
        <div className='workspace-detailed'>
            <div className="workspace-data">
                <div className="detailed-workspace-header">
                    <div className="detailed-workspace-info">
                        <h1>{workspaceData.name}</h1>
                        <p>{workspaceData.description}</p>
                    </div>
                    <div className="detailed-workspace-actions">
                        <p onClick={() => { navigate(`/${workspaceData.id}/add-subject/`) }}>Add New</p>
                        <p className='delete-btn' onClick={confirmDelete}>Delete</p>
                    </div>
                </div>
                <div>
                    <Subjects workspace_id={workspace_id} />
                </div>
            </div>
        </div>
    )
}

export default WorkspaceDetailed