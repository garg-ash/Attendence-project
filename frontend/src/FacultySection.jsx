import axios from 'axios'
import React, { useState } from 'react'

function FacultySection() {
  const [name, setName] = useState("")

  function handleSubmit(e){
    e.preventDefault()
    const name = {name}
    axios.get("http://localhost:8080")
    .then(result=>{
      if (result.data && result.status===200){
        console.log({Message:"Faculty saved"})
        setName("")
      } else {
        console.log("Not saved")
      };
    }) .catch(error)
     {
      console.log("error")
    }}
  

  return (
    <>
    <div className='wrapper'>
      <h2>Add Faculty</h2>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" id='name' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}/>
        <button type='submit'>Add Faculty</button>
      </form>
    </div>
    </>
  )
}

export default FacultySection
