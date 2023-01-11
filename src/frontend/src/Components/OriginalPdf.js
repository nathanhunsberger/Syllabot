import React from 'react'

function OriginalPdf(props){
    if (props.viewPdf){
        return(
            <div>
                <object data = {props.viewPdf} type="application/pdf" width="100%" height="800px">
                    <p>PDF</p>
                </object>
            </div>
        );
    }else {
        return(<p>
            View Uploaded PDF Here.
        </p>);
    }
}
export default OriginalPdf;