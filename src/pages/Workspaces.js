import React, { useEffect } from 'react'
import { useState } from 'react'
import CreatedDate from '../components/CreatedDate'
import '../styling/pages/workspaces.css'
import ActionIcon from '../Assets/Icons/ActionIcon.svg'
import { useNavigate } from 'react-router-dom'
import AddNew from '../components/AddNew'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useParams } from 'react-router-dom'

const Workspaces = () => {
    const navigate = useNavigate()
    let { authTokens, logoutUser } = useContext(AuthContext)
    let [notes, setNotes] = useState([])
    const [workspaces, setWorkspaces] = useState([])


    useEffect(() => {
        getWorkspaces()
    }, [])

    const getWorkspaces = async () => {
        let response = await fetch('/api/workspace/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
        })
        let data = await response.json()
        if (response.status === 200) {
            setNotes(data)
            setWorkspaces(data)
        } else if (response.status === 'Unauthorized') {
            logoutUser()
        }
    }

    const expandWorkspace = (workspace_id) => {
        navigate(`/workspaces/${workspace_id}/`)
    }

    const deleteWorkspace = async (workspace_id) => {
        let confirm = window.confirm("Are you sure you want to delete this workspace? This action cannot be undone.")
        if (confirm) {
            let response = await fetch(`/api/workspace/${workspace_id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + String(authTokens.access)
                }
            })
            console.log("workspace deleted")
            getWorkspaces()
        }
    }

    const [isAction, setIsAction] = useState({})
    const handleAction = (key) => {
        setIsAction({ ...isAction, [key]: (!isAction[key]) })
    }

    return (
        <div className='Workspaces'>
            {/* <h1 className='heading'>Workspaces</h1> */}
            <div className="workspace-list">
                {workspaces.map((workspace, index) => (

                    <div className="space" key={index}>
                        <div className="header">
                            <h1 className='workspace-name'>{workspace.name}</h1>
                            <div className="actions">
                                {isAction[index] && (
                                    <div className="workspace-action-area">
                                        {/* <button id='view-btn'>View</button> */}
                                        <button id='delete-btn' onClick={() => deleteWorkspace(workspace.id)}>Delete</button>
                                    </div>
                                )}
                                <img src={ActionIcon} alt="actions" onClick={() => handleAction(index)} />
                            </div>
                        </div>
                        <p className='workspace-description'>{workspace.description}</p>
                        <button className='view-btn' onClick={() => expandWorkspace(workspace.id)}>View Workspace</button>
                        <p className='created'>{<CreatedDate created={workspace.created_at} />}</p>
                    </div>
                ))}
                <AddNew addTo={'workspaces'} />
            </div>
        </div>
    )
}

export default Workspaces