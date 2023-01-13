import {useEffect, useState} from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import './Submission.css'

    function Submission(props){

    const [pdf, setPdf] = useState(null);
    var tried = false;
    const [pdfError, setPdfError] = useState('');
    const fileType = ["application/pdf"];
    useEffect(() => {
        if (pdf){
            SendPdf();
        }
    }, [pdf])
    
     // image is the full model, func is an azure function used to quickly test changes
     const url_func = "https://whdxime4tk.execute-api.us-east-2.amazonaws.com/default/syllabotEndpoint";
     const url_image = "https://ikfrjm17la.execute-api.us-east-2.amazonaws.com/default/syllabot-image";
     
     // Retry 3 times if we timeout
     axiosRetry(axios, {
        retries: 3,
        shouldResetTimeout: true,
        retryCondition: (error) => {
            // timeouts have code 504
            return error.response.status === 504;
        },
    });

     const  SendPdf  = async () => {
        props.setLoad(true);
         // API expects job type and payload
         const body = {
             "payload": pdf,
             "job": "parse"
           }
         const res = await axios({
             method: 'post',
             url: url_image,
             data: body
         }).then((res) => {
             // call API, send it to props.onChange
            props.onChange(JSON.parse(res.data.body), () => {
                // Weird issue with multiple uploads
                // This doesn't fix it
                setPdf(null);
            });
         }).catch((err) =>{
             console.log('Error Occured: ' + err)
             if (err.code == 'ERR_NETWORK'){
                SendPdf();
             }
         });
   
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
    
        return (
            <div className = 'submission'>
                <label className="upload">
                    <input type="file" accept = '.pdf'
                    required onChange = {handlePdfChange}
                    />
                    Upload
                </label>
            </div>
        );                  
    } export default Submission;