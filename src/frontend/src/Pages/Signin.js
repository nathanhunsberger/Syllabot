import './Signin.css'
import { setState, useEffect, useState} from 'react'
import googleButton from '../Images/google-button.png'
import googleButtonHover from '../Images/google-button-hover.png'

function Signin(props){

    const [auth, setAuth] = useState(false);
    const [curImage, setCurImage] = useState(googleButton);

    return(
        <img className = 'google-button'src = {curImage} onClick = {props.onClick} onMouseOver={ () =>{setCurImage(googleButtonHover)}} onMouseLeave={ () =>{setCurImage(googleButton)}}/>
    );
   
}

export default Signin;