import React from 'react'
import { useState, useEffect } from 'react'
import '../styling/pages/chapters.css'
import CreatedDate from '../components/CreatedDate'
import AddNew from '../components/AddNew'
import ActionIcon from '../Assets/Icons/ActionIcon.svg'
import { useNavigate } from 'react-router-dom'
import EditChapter from '../components/EditChapter'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const Chapters = ({ subject_id }) => {
    let { authTokens, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const [chapter, setChapters] = useState([])
    useEffect(() => {

        getChapters(FETCH_URL)
    }, [])
    let FETCH_URL = ''
    if (subject_id) {
        FETCH_URL = `/api/subject/${subject_id}/chapters/`
    } else {
        FETCH_URL = '/api/chapter/'
    }


    const getChapters = async (FETCH_URL) => {
        let response = await fetch(FETCH_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
        })
        let data = await response.json()
        setChapters(data)
    }

    const deleteChapter = async (chapter_id) => {
        let confirm = window.confirm("Are you sure you want to delete this subject?")
        if (confirm) {
            let response = await fetch(`/api/chapter/${chapter_id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + String(authTokens.access)
                }
            })
            getChapters(`/api/subject/${subject_id}/chapters/`)
        }
    }

    const [isAction, setIsAction] = useState({})
    const handleAction = (key) => {
        setIsAction({ ...isAction, [key]: (!isAction[key]) })
    }

    // const openEditor = (chapter_id) => {
    //     navigate(`/chapter/${chapter_id}`)
    // }

    return (
        <div className='Chapter'>
            {/* <div className="heading">Chapters</div> */}
            <div className="chapter-list">
                {chapter.map((chapter, index) => (
                    <div className="chapter" key={index}>
                        <div className="chapter-header">
                            <p className="chapter-name">{chapter.name}</p>
                            <div className="actions">
                                {isAction[index] && (
                                    <div className="workspace-action-area">
                                        {/* <button id='view-btn'>View</button> */}
                                        <button id='delete-btn' onClick={() => deleteChapter(chapter.id)}>Delete</button>
                                    </div>
                                )}
                                <img src={ActionIcon} alt="actions" onClick={() => handleAction(index)} />
                            </div>
                        </div>
                        {/* <p className="chapter-description">{chapter.description}</p> */}
                        <button className='view-btn'
                            onClick={() => navigate(`/edit/${chapter.id}`)}
                        >Open chapter</button>
                        <p className="created">{<CreatedDate created={chapter.created_at} />}</p>
                    </div>
                ))}
                {subject_id && (
                    <AddNew addTo={'chapters'} subject_id={subject_id} />
                )}
            </div>
        </div>
    )
}

export default Chapters