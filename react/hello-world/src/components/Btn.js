import '../App.css';
import React, { useState } from 'react';


export default function Button(){
    const [count, setCount] = useState(0);

    function Click(){
        setCount(count+1);
        alert(`button was clicked ${count}times!!`);
    }
    return< div className='App-border'>
    <button className='App-btn' onClick = {Click}> increment </button>
    </div>
}
