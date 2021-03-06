import Input from "../components/input";
import '../css/signup.css';
import { useState } from "react";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
const apiendpoint_signup = `${process.env.REACT_APP_API_URL}/user/signup`;
function Signup({setToken}){
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()

    async function verify(e) {
        e.preventDefault();
        await fetch(apiendpoint_signup, {
          method: "post",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password,
            phone
          })
        }
        )
        .then((response) => {
            if(response.status===200){
                sessionStorage.setItem('token',response.headers.get('x-auth-token'));
                setToken(response.headers.get('x-auth-token'));
                return response.text();
            }else{
                return Promise.reject(response)
            }

        })
        .then((value)=>{
          if(value){

            history.replace('/viewcandidate')
          }
          else{
            history.replace('/signup')
          }
        })
        .catch((error)=>{
          error.text().then((data)=>{
              toast(data)
          })
          history.replace('/signup')
    
        })
       
      }
    return(
        
        <div className="signup-container">
            <form action='' onSubmit={verify}>

            <h3>Sign Up</h3>
            <div className="signup-inputs">
            <Input name="Email-id" label="Email id" type="email" required placeholder="enter your email id" onChange={(e)=>setEmail(e.target.value)}/>
            <Input name="Phone_Number" label="Phone Number" type="text" required placeholder="enter your phone number" onChange={(e)=>setPhone(e.target.value)}/>
            <Input name="Password" label="Password" type="password" required placeholder="enter your password" onChange={(e)=>setPassword(e.target.value)}/>
            <span id="signup-hollow-text">Minimun 8 alpha numeric</span>
            <button>
                Signup
            </button >
            </div>
            </form>
        </div>
    )
}
export default Signup;