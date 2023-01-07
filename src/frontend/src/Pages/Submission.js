import {useEffect, useState} from 'react';
import axios from 'axios';
import OriginalPdf from '../Components/OriginalPdf';
import './Submission.css'

    function Submission(props){

    const [pdf, setPdf] = useState(null);
    var tried = false;
    const [pdfError, setPdfError] = useState('');
    // const [viewPdf, setViewPdf] = useState(null);
    // const [pdfConf, setPdfConf] = useState(false);
    const fileType = ["application/pdf"];
    useEffect(() => {
        if (pdf){
            SendPdf();
        }
    }, [pdf])
    
    // image is the full model, func is an azure function used to quickly test changes
    const url_func = "https://whdxime4tk.execute-api.us-east-2.amazonaws.com/default/syllabotEndpoint";
    const url_image = "https://ikfrjm17la.execute-api.us-east-2.amazonaws.com/default/syllabot-image";
    
    const  SendPdf  = async () => {
        // API expects job type and payload
        const body = {
            "payload": pdf,
            "job": "parse"
          }
        const res = await axios({
            method: 'post',
            url: url_image,
            data: body
        });
        // Sometimes the API has to reload model from S3 bucket, which timesout every now and then
        // In this case, we resend the API call once. Only occurs for timeout (status 504)
        if (res.status == 504){
            if (!tried){
                tried = true;
                SendPdf();
                return;
            }
        }
        console.log(res.data);
        // //call API, send it to props.onChange
        props.onChange(JSON.parse(res.data.body));
    }
    
    const handlePdfChange= (e)=> {
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(selectedFile&&fileType.includes(selectedFile.type)){
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    var pdf_file = e.target.result.substring(28);
                    while (pdf_file.length % 4 != 0){
                        pdf_file = pdf_file.concat('=')
                    }
                    setPdf(pdf_file);
                    setPdfError('');
                  
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