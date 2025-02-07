// import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Button from './components/Btn';
import Input from './components/Input';
import Form from './components/Form';
import Image from './components/Image';
import image from  '../src/images/logo192.png'
import React, { useState } from 'react';


export default  function App() {
  const id =1;
  const mark =2.5;
  const name="john";
  const x =true;
  const course = [ "python", "java", "php", "javascript" ];
  const user = {
    name: "John Doe",
    age: 30,
    email: "johndoe@example.com",
    country: "USA",
    isAdmin: false
  };
    function alr(){
      alert('just passing by');
    }
  


  return (
    <div className="App">
      <h1 className="App-h1 App-border">hello</h1>
      <div className='App-border'>
        <p>ID is: {id}</p>
        <p>mark is: {mark}</p>
        <p>name is :{name}</p>
        <p>x is :{x.toString()}</p>
        <p>course :{course[1]}</p>
        <div>
          {course.map((item,index) => <li key={index}>{item}</li> )}
        </div>

        
        
      </div>
      <Home></Home>
      <Input></Input> 
      <Image func ={alr}></Image>
      <Button></Button>
      <Form object={user}/>
      
    </div>
  );
};
