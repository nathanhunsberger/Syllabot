import { useState} from 'react';
import Submission  from './Submission';
import Dashboard from './Dashboard';
import Calendar from './Calendar';
import Privacy from './Privacy';
import './Home.css'
import logo from '../Images/basic_logo.png'

function Home(){
    
   
    const [assignments, setAssignments] = useState(
        [ 
        // { id: 1, name: "Test 1",  date: "10/5" },
        // { id: 2, name: "Hw 2",  date: "12/20" },
        // { id: 3, name: "Essay 3", date: "11/19"},
    ]
    );
    const [numAssignments, setNumAssignments] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [user, setUser] = useState(false);
    const [ClassName, setClassName] = useState("")


    function onClassNameChange(e){
        setClassName(e);
    }
    function onNameChange(e,index){
        let newArr = [...assignments];
        newArr[index].name = e;
        setAssignments(newArr);
        
    }

    function onDateChange(e,index){
        let newArr = [...assignments]
        newArr[index].date = e;
        setAssignments(newArr);
    }
    function onDelete(index){
        let newArr = [...assignments]
        newArr.splice(index,1);
        setAssignments(newArr);
    }
    function onAdd(){
        setNumAssignments(numAssignments + 1);
        let newArr = [...assignments];
        newArr.push({
            id:numAssignments + 1, name: "", date: ""
        })
        setAssignments(newArr);
    }
   function onSubmit(e){
    setSubmitted(true);
   }

   function wipeAssignments(){
    setAssignments([]);
    setSubmitted(false);
   }

   function handleAssignments(a){
    setAssignments(a);
    setNumAssignments(a.length);
   }


//    return (
//     <div>
//         <Dashboard assignments = {assignments}/>
//     </div>
//    )
   if (assignments.length > 0){
    if (submitted){
        return(
            <div>
            <Calendar assignments={assignments} user = {user} setUser = {setUser} wipeAssignments = {wipeAssignments} ClassName = {ClassName} />
            <Privacy className='policy'/>
            </div>
        )

    }else {
        return (
            <div>
            <Dashboard assignments = {assignments} onNameChange={onNameChange} onDateChange = {onDateChange} onDelete = {onDelete} onAdd = {onAdd} 
            onSubmit = {onSubmit} onClassNameChange={onClassNameChange}/>
            <Privacy className='policy'/>
            </div>
        );
    }
   }
    else {
        return(
            <div >
                <div className= 'basic_logo'>
                <img className= 'logo_img' src = {logo} alt = "Syllabot Logo"/>
                <p className = 'logo_caption'>school simplified</p>
                </div>

                {/* <div className='middle_row'/> */}
                <div className = 'middle_row'>
                    <div className='mission_container'>
                    <h1 className='header_message'>
                        Upload your syllabus.
                    </h1>
                    <h1 className='header_message'>
                        We'll make it useful.
                    </h1>
                    </div>
                    <div className='upload_container'>
                    <Submission assignments = {assignments} onChange = {handleAssignments}/>
                    </div>
                </div>
                <br></br>
                <div className = 'boxes_row'>
                    <div className= 'info_box left_box'>
                        <h1 className = 'title'>what does syllabot do?</h1>
                        <h2 className = 'content'>
                            syllabot reads your syllabus and returns tasks directly to your Google, Outlook, or Apple calendars!...
                        </h2>
                    </div>
                    <div className= 'info_box right_box'>
                        <h1 className = 'title'>how does it work?</h1>
                        <h2 className = 'content'>
                            syllabot is a machine learning algorithm! it recognizes important information and turns it into useful data for you!...
                        </h2>
                    </div>
                </div>
                <br></br>
                <h1>Questions, feedback, problems, or concerns?</h1>
                <p>Please reach out! We want to hear directly from students and professors as</p>
                it helps us to improve the platform and make life a little more organized
                <p>jonah, ben, and nate :)</p>
                <Privacy className='policy'/>
            </div> 
        );      
    }
}export default Home;
