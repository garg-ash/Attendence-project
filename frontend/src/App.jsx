import React, { useState } from 'react'

export default function App() {
  const [faculty, setFaculty] = useState("")

  function handleSubmit(e){
    e.preventDefault()
    const obj = {}
    obj.name = name;

    axios.get('https://localhost:8080', {...obj})
    .then(result=>{
      if(result.data && result.status === 200) window.location.href = "/FacultuSection"
    })
    .catch(error=> console.log(error))
  }
  return (
    <>
    <h3>Attendance Management</h3>
    <div className='app'>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter Faculty Name' name='name'value={faculty} onChange={(e)=>FacultyName(e.target.value)}/>
      </form>
      <button type='submit'>Login</button>
    </div>
    </>
  )
}

