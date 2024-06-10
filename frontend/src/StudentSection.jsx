import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function StudentSection() {
  const [name, setName] = useState("")
  const [faculty, setFaculty] = useState("")
  const [faculties, setFaculties] = useState("")
  const [aadhar, setAadhar] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
  }
  return (
    <>
      <div className="wrapper">
      <h1>Add Student</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="faculty">Select faculty</label>
        <select
          id="faculty"
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
          required
        >
          <option value="" disabled>Select faculty</option>
          {faculties.map((teacher) => (
            <option key={teacher._id} value={teacher.name}>{teacher.name}</option>
          ))}
        </select>
        <button type="submit">Save Student</button>
      </form>
    </div>
    </>
  )
}

export default StudentSection
