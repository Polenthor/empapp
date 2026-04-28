import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'

const Add = () => {
    var[user,setuser]=useState({Name:"",Age:"",Desc:"",Salary:""})

   const inputHandler=(e)=>{
        setuser({...user,[e.target.name]:e.target.value})
        console.log(user)
   }
   const addhandler=()=> {
    axios.post("http://localhost:3000/add",user)
    .then((res)=>{
        alert(res.data)
    })
   }
    

  return (
    <div>
       
        <TextField label="Name" variant="filled" name='Name' value={user.Name } onChange={inputHandler}  /><br/>
        <TextField label="Age" variant="filled" name='Age' value={user.Age} onChange={inputHandler} /><br></br>
        <TextField label="Desc" variant="filled" name='Desc' value={user.Desc} onChange={inputHandler} /><br></br>
        <TextField label="Salary" variant="filled" name='Salary' value={user.Salary} onChange={inputHandler} /><br></br>
       <Button varient='contained' onClick={addhandler}>Submit</Button>
        
    </div>
  )
}

export default  Add 