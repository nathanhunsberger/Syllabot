import './Calendar.css'
import logo from '../Images/basic_logo.png'
import Signin from './Signin';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {useState} from 'react'



function Calendar(props){
    const [jwt_token, setJwt_token] = useState({})
    function handleSignIn(res) {
       props.setUser(true)
       setJwt_token(res)
    }

    async function generateEvents(){
            //do gcal work here

            await axios.post("http://localhost:5000/", {
                assignments: props.assignments,
                className: props.ClassName,
                jwt_token: jwt_token
            }).then(()=>props.wipeAssignments(), err =>console.log("Error"));
            
        }

    function generateCsv(){

        props.wipeAssignments();
    }

    const login = useGoogleLogin({
        onSuccess: codeResponse => handleSignIn(codeResponse),
        flow: 'auth-code',
      });
    return(
        <div>
        <div className="body">
        <img className= 'logo' src = {logo} alt = "Syllabot Logo"/>
        </div>
        <div className='body'>
            <p>your tasks are ready!!</p>
        </div>
        <br></br>
        <div className = "Signin_holder">
            <div className = 'mid_row'>
                <div className = 'prompt'>If you use Google Calendar: </div>
                <div className = 'spacer'></div>
                

                {!props.user ?
                <Signin onClick={() => login()}>
                {/* Sign in with Google 🚀{' '} */}
              </Signin>
              :
              <button className = 'generate_events' onClick = {generateEvents} >Generate Events</button>
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