import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "./Store";

function Login(){
let username=useRef(null);
let password=useRef(null);

let dispatch=useDispatch()
let Navigate=useNavigate()

let logincheck=()=>{
    if(username.current.value==="firdous" && password.current.value==="firdous@123")
    {
    dispatch(login(username.current.value));
    Navigate("/Home");
    }
    else
    {
    alert("Your credentials are wrong .. check once!!")
    }

}

    return(
<>

   
      <h1 >Login Page</h1>
      
      <label >Username:</label>
      <input type="text" ref={username}  />
      <br /><br />

      <label >Password:</label>
      <input type="password" ref={password}   />
      <br /><br />

      <button 
        onClick={logincheck} 
        
      >
        Login
      </button>
    
  </>
    )
}


export default Login;

