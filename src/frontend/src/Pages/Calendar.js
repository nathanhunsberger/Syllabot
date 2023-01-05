import './Calendar.css'
import logo from '../Images/basic_logo.png'
import Signin from './Signin';
import { useState} from 'react';

import jwt_decode from 'jwt-decode'

function Calendar(props){
    function handleCallbackResponse(res) {
        console.log("Encoded token" + res.credential);
        var userObj = jwt_decode(res.credential);
        props.setUser(userObj);
        document.getElementById("signInDiv").hidden = true;
    }

    function handleSignOut(){
            props.setUser({})
            document.getElementById("signInDiv").hidden = false;
        }
    
    function generateEvents(){
            //do gcal work here
            props.wipeAssignments();

        }
        
    return(
        <div>
        <div className="body">
        <img className= 'logo' src = {logo} alt = "Syllabot Logo"/>
        </div>
        <div className='body'>
            <p>your tasks are ready!!</p>
        </div>
        <br></br>
        <div className = "Signin">
            <div className = 'mid_row'>
                <div className = 'prompt'>If you use Google Calendar: </div>
                <div className = 'spacer'></div>
                

                {Object.keys(props.user).length === 0?
                <Signin handleCallbackResponse = {handleCallbackResponse} />
                :
            <div className = 'button_holder'>
                <img src = {props.user.picture} alt = {props.user.given_name} className='profile_pic' align = 'center'/>
                <button  className = 'sign_out' onClick = {() => {
                    handleSignOut();

                }}>Sign Out</button>
            <button className = 'generate_events' onClick = {()=>{
                generateEvents();
            }}>
                Generate Events</button>
            </div>
            }
            </div>
            <div className='mid_row'>
                <div className = 'prompt'>if you use another calendar:</div>
            </div>
        </div>
             
        </div>
    )
} export default Calendar;