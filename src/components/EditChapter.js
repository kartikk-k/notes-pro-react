import { useState, useEffect } from 'react'
import { useEditor } from '@tiptap/react'
import { EditorContent } from '@tiptap/react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../styling/editor.css'

import Text from '@tiptap/extension-text'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import History from '@tiptap/extension-history'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import TextAlign from '@tiptap/extension-text-align'

import { useContext } from 'react'
import AuthContext from '../context/AuthContext'


const EditChapter = () => {
    let { authTokens, logoutUser } = useContext(AuthContext)

    const { chapter_id } = useParams()
    const [chapter, setChapter] = useState({})
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        axios.get(`/api/chapter/${chapter_id}/`, {
            headers: {
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
            .then(response => {
                setChapter(response.data)
            })
    }, [])

    const saveChapter = async () => {
        chapter.description = editor.getHTML()
        let response = await fetch(`/api/chapter/${chapter_id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify(chapter)
        })
        let data = await response.json()
    }

    let editor = useEditor({
        extensions: [Document, Paragraph, Text, Bold],
        content: `Refresh Window`,
    })

    const firstRender = () => {
        editor.commands.setContent(chapter.description)
        if (chapter.description != undefined && chapter.description != null) {
            setIsExpanded(true)
        }
    }

    if (!editor) {
        return null
    }


    return (
        <div className='editor-main'>

            <div className="taskbar">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'active-btn' : ''}
                >
                    ToggleBold
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'active-btn' : ''}
                >
                    ToggleBold
                </button>


            </div>
            {isExpanded && (
                <div className="writting-area">
                    <EditorContent editor={editor} />
                </div>
            )}
            {isExpanded && (
                <button
                    className='editor-save-btn'
                    onClick={saveChapter}>
                    Save
                </button>
            )}
            {!isExpanded && (
                <button className='open=content' onClick={firstRender}>
                    Open Content
                </button>
            )}
        </div>
    )
}

export default EditChapter