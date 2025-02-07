import '../App.css'
import image from '../images/logo192.png'

export default function Image(props){
    return <div className='App-border'>
    <div>
        <h1>This is a Image</h1>
        <img src={image} alt='temp img' className='App-img' onClick={props.func} />
    </div>
    </div>
}