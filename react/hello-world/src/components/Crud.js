import axios from "axios";
import React, { useState } from "react";
import Navbar from './Navbar';

function Crud() {
    var [ items, setItems ] = useState ([
        { id : 1, name : "John" },
        { id : 2, name : "David" },
        { id : 3, name :"William" }
     ]);

     
     var options = {
        headers: {'Accept':'application/json'}
    }
    // axios.get('http://localhost:3001/Allconcerts').then(response=>{
    //     // statements to execute on success response from api endpoint
    //     console.log(response.data)
    // }).catch(error=>{
    //     // statements to execute on error response from api endpoint
    //     console.log(error)
    // })
return (
 <div>
  <div> <Navbar/> </div><br/>
    
<div className="container">
    <table className =" table table-bordered table-dark bg-dark">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
        </tr>
        {items.map((item) => (
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>
              <button className="btn btn-danger m-1">Delete</button>
               <button className="btn btn-primary m-1"> Edit </button>
            </td>
        </tr>
        ))}
</table>
</div>
</div>)}

export default Crud;