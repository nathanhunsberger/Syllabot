
import './Loading.css'
import circle_logo from '../Images/circle_logo.png'
import logo from '../Images/basic_logo.png'
function Loading(){
    return (
        <div>
            <img className= 'logo' src = {logo} alt = "Syllabot Logo"/>
            <br></br>
        <img src = {circle_logo} alt = 'logo' className='Circle-logo' />
        </div>
    )
}export default Loading;