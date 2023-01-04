import React from 'react'
import Workspaces from './Workspaces'
import Subjects from './Subjects'
import Chapters from './Chapters'

import '../styling/pages/homepage.css'

const HomePage = () => {
    return (
        <div className='home-page'>
            <div>
                <h1 className='home-section-heading'>Workspaces</h1>
                <Workspaces />
            </div>
            <div>
                <h1 className='home-section-heading'>Subjects</h1>
                <Subjects />
            </div>
            <div>
                <h1 className='home-section-heading'>Chapters</h1>
                <Chapters />
            </div>
        </div>
    )
}

export default HomePage