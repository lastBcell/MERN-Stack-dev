import '../App.css';
import React, { useState } from 'react';



export default function Form({object}){
    const [name, setName] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Hello, ${name}!`);
      };
    //   const ob=props.object

    return <div className="App-border">
          <h1>Simple React Form</h1>
          <p>name:{object.name}</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className='App-input'/>
            <button type="submit">Submit</button>
          </form>
        </div>  
    }
