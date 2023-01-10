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

import { useContext } from 'react'
import AuthContext from '../context/AuthContext'


const EditChapter = () => {
    let { authTokens, logoutUser } = useContext(AuthContext)

    const { chapter_id } = useParams()
    const [chapter, setChapter] = useState({})
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        axios.get(`https://web-production-0d22.up.railway.app/api/chapter/${chapter_id}/`, {
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
        let response = await fetch(`https://web-production-0d22.up.railway.app/api/chapter/${chapter_id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify(chapter)
        })
        // let data = await response.json()
    }

    let editor = useEditor({
        extensions: [Document, Paragraph, Text, Bold, Italic, Underline, History, BulletList, ListItem, OrderedList],
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
                    Bold
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'active-btn' : ''}
                >
                    Italic
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={editor.isActive('underline') ? 'active-btn' : ''}
                >Underline</button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'active-btn' : ''}
                >
                    BulletList
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'active-btn' : ''}
                >
                    OrderedList
                </button>

                {/*  */}

                {/*  */}

                <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
                    undo
                </button>
                <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
                    redo
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