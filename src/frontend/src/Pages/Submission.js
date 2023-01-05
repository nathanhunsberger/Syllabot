import {useState} from 'react';
import axios from 'axios';
import OriginalPdf from '../Components/OriginalPdf';
import './Submission.css'

    function Submission(props){
    const [pdf,setPdf] = useState(null);
    const [pdfError, setPdfError] = useState('');
    // const [viewPdf, setViewPdf] = useState(null);
    // const [pdfConf, setPdfConf] = useState(false);
    const fileType = ["application/pdf"];


    const  SendPdf  = async () => {
        // const res = await axios.post("https://1s4pf1fpk3.execute-api.us-east-2.amazonaws.com/beta/nocors", 
        //     {file: pdf.substring(28)},
        //     {headers: {
        //         "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
        //         "Access-Control-Allow-Origin": "*",
        //         "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
        //         "X-Requested-With": "*"
        //     }});
        // //call API, send it to props.onChange
        props.onChange([
            
                { id: 1, name: "Test 1",  date: "10/5" },
                { id: 2, name: "Hw 2",  date: "12/20" },
                { id: 3, name: "Essay 3", date: "11/19"},
              
            


        ]);
    }
    
    const handlePdfChange= (e)=> {
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(selectedFile&&fileType.includes(selectedFile.type)){
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setPdf(e.target.result);
                    setPdfError('');
                    SendPdf();
                }
            }else{
                setPdf(null)
                setPdfError('Please select .pdf file');
            }
        }else{
            console.log('Select your file');
        }
    }

    // const handlePdfSubmit = (e) => {
    //     e.preventDefault();
    //     if(pdf != null){
    //         setViewPdf(pdf);

    //     }else{
    //         setViewPdf(null);
    //     }
    // }
    
    //Come back and tighten up submission page syling for position
        return (
            <div className = 'submission'>
                <label className="upload">
                    <input type="file" accept = '.pdf'
                    required onChange = {handlePdfChange}
                    />
                    Upload
                </label>
                <p className = 'error_message'>{pdfError}</p>
            </div>
        );
    
        // return (
        //     <div className = 'container'>
        //         {/*<img src = {logo}/>*/}
        //         <form className= 'form-group' onSubmit ={handlePdfSubmit}>
        //             <input type = 'file' className = 'form-group'
        //             required onChange ={handlePdfChange}
        //             />
        //             <br></br>
        //             {pdfError&&<div className='error-msg'>{pdfError}</div>}
        //         </form>
        //         <br></br>
        //         <br></br>
        //         {/* {viewPdf &&
        //         <div>
        //         <button type = "submit" className = 'submit-btn' onClick={SendPdf}>
        //         Confirm Your Syllabus
        //         </button> */}
        //         {/* <div className="pdf-container">
        //             <OriginalPdf viewPdf={viewPdf}/>
        //         </div> */}
                
        //         {/* </div>
        //         }        */}
        //     </div>
        // );                   
    } export default Submission;