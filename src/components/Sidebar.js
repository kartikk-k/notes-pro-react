import React from 'react'
import '../styling/sidebar.css'

// importing icons
import HomeIcon from '../Assets/Icons/HomeIcon.svg'
import WorkspacesIcon from '../Assets/Icons/WorkspacesIcon.svg'
import SubjectsIcon from '../Assets/Icons/SubjectsIcon.svg'
import ChaptersIcon from '../Assets/Icons/ChaptersIcon.svg'

// import HomeIconActive from '../Assets/Icons/HomeActiveIcon.svg'

const Sidebar = () => {
    return (
        <div className='Sidebar'>
            <div className="header">
                <p>NotesPro</p>
            </div>
            <div className="navigation">
                <div className="link-box">
                    <img src={HomeIcon} alt="dashboard-icon" />
                    <a href="/">Home</a>
                </div>
                <div className="link-box">
                    <img src={WorkspacesIcon} alt="dashboard-icon" />
                    <a href="/workspaces/">Workspaces</a>
                </div>
                <div className="link-box">
                    <img src={SubjectsIcon} alt="dashboard-icon" />
                    <a href="/subjects/">Subjects</a>
                </div>
                <div className="link-box">
                    <img src={ChaptersIcon} alt="dashboard-icon" />
                    <a href="/chapters/">Chapters</a>
                </div>
            </div>
        </div>
    )
}

export default Sidebar