import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Button } from '@mui/material';


const View = () => {
    var[Employ,setEmploy]=useState([])
    axios.get('http://localhost:3000/view')
    .then((res) => {
        console.log(res.data)
        setEmploy(res.data)
        

    } )
   
    const delValue =(id) => {
        axios.delete('http://localhost:3000/remove/'+ id)
        .then((res) =>{
            
            window.location.reload();
        })
    }
   
  return (
   <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>UserName</TableCell>
            <TableCell align="right">Password</TableCell>
            <TableCell align="right">Salary</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Employ.map((row) => (
            <TableRow
              key={row.Name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Name}
              </TableCell>
              <TableCell align="right">{row.Password}</TableCell>
             
              <TableCell align="right">{row.Salary}</TableCell> 
              <TableCell align="center"><Button onClick={()=>{delValue(row._id)}}>del</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default  View