import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Workspaces from './pages/Workspaces';
import Subjects from './pages/Subjects';
import Chapters from './pages/Chapters';
import WorkspaceDetailed from './pages/WorkspaceDetailed';
import SubjectDetailed from './pages/SubjectDetailed';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar'

import OpenCloseIcon from './Assets/Icons/Active-icons/Open-CloseIcon.svg'
import AddNewSpace from './components/AddNewSpace';
import AddNewSubject from './components/AddNewSubject';
import AddNewChapter from './components/AddNewChapter';
import EditChapter from './components/EditChapter';
import Login from './pages/Login'
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import RegisterUser from './pages/RegisterUser';


function App() {
  const screenWidth = window.innerWidth
  const [isOpen, setIsOpen] = useState((screenWidth >= 600) ? true : false)
  const handleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={isOpen ? 'App' : 'App App-full'}>
      <AuthProvider>
        {/* Sidebar */}
        {isOpen && (
          <Sidebar />
        )}

        {/* open-close button */}
        <img src={OpenCloseIcon} alt="open-close" className={isOpen ? 'close-btn open-btn' : 'close-btn'} onClick={handleSidebar} />

        {/* main containers */}
        <div className="main-container">
          <Navbar isOpen={isOpen} />

          {/* Content area */}
          <div className="Changable">
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route path='' element={<HomePage />} />

                <Route path='/edit/:chapter_id' element={<EditChapter />} />
                <Route path='/workspaces/' element={<Workspaces />} />
                <Route path='/subjects/' element={<Subjects />} />
                <Route path='/chapters/' element={<Chapters />} />

                <Route path='/workspaces/:workspace_id/' element={<WorkspaceDetailed />} />
                <Route path='/add-workspace/' element={<AddNewSpace />} />

                <Route path='/workspaces/:workspace_id/subjects/:subject_id/' element={<SubjectDetailed />} />
                <Route path='/:workspace_id/add-subject/' element={<AddNewSubject />} />

                <Route path='/:subject_id/add-chapter/' element={<AddNewChapter />} />
              </Route>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<RegisterUser />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
