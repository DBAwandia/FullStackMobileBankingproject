import React, { useState } from 'react'
import {RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../Firebase/Firebase';
import "./Login.css"
import { useNavigate} from "react-router-dom"
function Login() {

  const navigate = useNavigate()
  const [phonenumbers, setPhonenumbers] = useState("")
  const [password, setPassword] = useState("")
  const [loadings, setLoadings] = useState(false)
  const [open, setOpen] = useState(false)
   
    
    const handleClick = (e)=>{
      e.preventDefault()
     
    }
  return (
     <div className='login'>
        <div className='login_container'>
            <div className='login_container2'>
              <h1 style={{margin: "50px 0px", color: "teal"}}>LOGIN</h1>
              <label>Enter phonenumber</label>
                <input type="number" placeholder="Enter phonenumber" onChange={e=>setPhonenumbers(e.target.value)} required/>
                <label>Enter password</label>
                <input type="password" placeholder="Enter password" onChange={e=>setPassword(e.target.value)} required/>
                <button className='login_button'  onClick={handleClick}>{loadings?"Loading...": "Login"}</button>
            </div>
          </div>
    </div>
  )
}

export default Login