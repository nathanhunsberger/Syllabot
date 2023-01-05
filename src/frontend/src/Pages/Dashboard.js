import logo from '../Images/basic_logo.png'
import './Dashboard.css'
import TableRow from '../Components/TableRow'
 

function Dashboard(props){



    return (
    
    <div>
        <div className = 'img_holder'>
        <img className= 'logo' src = {logo} alt = "Syllabot Logo"/>
        </div>
        <div>
            <p className = 'top_header'>here's what we found</p>
            <p className='bottom_header'>Please add a course title and click any box to edit</p>
        </div>
        <div className = 'class_holder'>
            <input className='class_input' type= 'text' placeholder='[Enter Course Title Here]'>
            </input>
        </div>
        <br></br>
        <div className = 'assign_table'>
            {props.assignments.map((item, index) =>{
                return(<TableRow key = {item.id} index = {index} name = {item.name} date = {item.date} onNameChange = {props.onNameChange} onDateChange = {props.onDateChange} onDelete = {props.onDelete}/>)
            })}
        </div>
        <br></br>
        <div className = 'add_holder'>
            <button className = "add_task" onClick = {() =>{
                props.onAdd()
            }}>add task</button>
        </div>
        <br></br>
        <br></br>
        <div className='submit_holder'>
            <button className='submit' onClick = {() =>{
                props.onSubmit()
            }}>submit!</button>
        </div>
        
    </div>
    );
}export default Dashboard;