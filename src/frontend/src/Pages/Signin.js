import './Signin.css'
import { useEffect} from 'react'

function Signin(props){
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: '272508386377-hqsbitc104uo97fruknl6ljrpramiugi.apps.googleusercontent.com',
            callback: props.handleCallbackResponse,
            cookie_policy:  "single_host_origin"
            
        });
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {
            width: 240,
            height: 50,
            theme: 'dark',           
            }
        );
    }, []);

    return(
        <div id = "signInDiv"></div>
    );
   
}

export default Signin;