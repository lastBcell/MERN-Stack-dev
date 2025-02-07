import '../App.css';
import React, { useState } from 'react';


export default function Input(){
    const[name,setName]=useState('')

    function change(event){
        setName(event.target.value);

    }

    return <div className='App-border'>
        <input value ={name} onChange={change} className='App-input'/>
        <p>Hello!!{name}</p>
    </div>
}