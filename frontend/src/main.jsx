import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import FacultySection from './FacultySection.jsx'
import StudentSection from './StudentSection.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <FacultySection />
    <StudentSection/>
  </React.StrictMode>
)
