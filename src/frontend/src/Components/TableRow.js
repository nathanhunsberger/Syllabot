import './TableRow.css'
function TableRow(props){
    return(
        <div>
        {props.index === 0 &&
        <div className='tableRow Header'>
            <div className='header'>Task:</div>
            <div className='header'>Date:</div>
        </div>
        }
        <div className='tableRow'>
            <input type = 'text' className = 'element left' value = {props.name} placeholder = '[enter task]'onChange= {(e) => {
                props.onNameChange(e.target.value, props.index)}}/>
            <input type = 'text' className = 'element right' value = {props.date} placeholder = '[enter date]' onChange= {(e) => {
                props.onDateChange(e.target.value, props.index)}}/>
            <button className='delete' onClick = {() =>{
                props.onDelete(props.index)
            }}>X</button>
        </div>
        </div>
        
    )
}export default TableRow;