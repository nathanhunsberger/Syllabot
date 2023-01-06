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

    function generateCsv(){

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
            <br></br>
            <br></br>
            <div className='mid_row'>
                <div className = 'prompt'>if you use another calendar:</div>
                <div className='spacer'></div>
                <div className='button_holder'>
                    <button className='get_csv' onClick = {() =>{
                        generateCsv();
                    }}>
                        Download .csv file
                    </button>
                </div>
            </div>
            <br></br>
            <div className='link_row'>
            <p className='link_text'>
                for .csv files, follow these instructions to upload the calendar of your choice!
            </p>
            </div>
            <br></br>
            <div className='link_row'>
            <a href = "https://support.google.com/calendar/answer/37118?hl=en&co=GENIE.Platform%3DDesktop"
            target = "_blank" className='csv_link'>Google Calendar (GCal)</a>
            </div>
            <br></br>
            </div>
            <div className='link_row'>
            <a href = "https://support.apple.com/guide/calendar/import-or-export-calendars-icl1023/mac"
            target = "_blank" className='csv_link'>Apple Calendar </a>
            </div>
            <br></br>
            <div className='link_row'>
            <a href = "https://kb.uconn.edu/space/IKB/10730800294/Importing+Office+365+Calendars+in+Outlook"
            target = "_blank" className='csv_link'>Microsoft Outlook Calendar</a>
            </div>
            <br></br>
            <div className='link_row'>
            <p className='footer'>thanks! for using Sylllabot please </p>
            <a href = '/feedback' target = '_blank' className= 'footer_link'> contact us </a>
            <p className='footer'> with feedback!</p>
            </div>
        </div>
    )
} export default Calendar;