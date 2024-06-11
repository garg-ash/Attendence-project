import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [facultyList, setFacultyList] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch the list of faculties on component mount
    axios.get('http://localhost:8080/getFaculty')
      .then(response => {
        setFacultyList(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function handleFacultyChange(e) {
  
    
      axios.get(`http://localhost:8080/getStudentsByFaculty/${e.target.value}`)
        .then(response => {
          setStudents(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    
  
  }

  function handleSubmit(e) {
  
  }

  return (
    <>
      <h3>Attendance Management</h3>
      <div className='app'>
        <form >
          <select value={selectedFaculty} onChange={handleFacultyChange}>
            <option value="" disabled>Select Faculty</option>
            {facultyList.map((faculty, index) => (
              <option key={index} value={faculty.name}>{faculty.name}</option>
            ))}
          </select>
          {/* <button type='submit'>Show Students</button> */}
        </form>
        <h4>Students</h4>
        <ul>
          {students.map((student, index) => (
            <li key={index}>{student.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
