import React, { useState } from 'react'
import {RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../Firebase/Firebase';
import "./Login.css"
import { useNavigate} from "react-router-dom"
function Register() {

  const navigate = useNavigate()
  const [phonenumbers, setPhonenumbers] = useState("")
  const [username, setUsername] = useState("")
  const [otp, setOtp] = useState("")
  const [password, setPassword] = useState("")
  const [image, setImage] = useState("")
  const [final, setFinal] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadings, setLoadings] = useState(false)
  const [open, setOpen] = useState(false)
  const [opens, setOpens] = useState(false)
  const phonenumber = `+${phonenumbers}`
    const sendOtp = (e)=>{
      e.preventDefault()
      setLoading(true)
      window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
          console.log(response)
        }
      }, auth);
      const appVerifier = window.recaptchaVerifier
      signInWithPhoneNumber(auth,phonenumber,  appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setFinal(window.confirmationResult)
            setOpen(true)
            setLoading(false)
          }).catch((error) => {
            console.log(error)
            setOpens(true)
            setLoading(false)
          });
    }
    const handleClick = (e)=>{
      e.preventDefault()
      setLoadings(true)
      final.confirm(otp).then((result) => {
        console.log(result)
        setOpen(true)
        setLoading(false)
        navigate("/login")
      }).catch((error) => {
        console.log(error)
       setOpens(true)
       setLoadings(false)
      });
    }
  return (
     <div className='login'>
        <div className='login_container'>
            <div className='login_container2'>
                <div className='avatar_container'>
                    <img src='data:image/jpeg;base64,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' className='avatar_image' alt=''/>
                </div>
                {opens && <p style={{color:"red",fontSize: "18px", margin:"10px 0px"}}>Wrong code!!!</p>}
                {open && <p style={{color: "green",fontSize: "18px", margin:"10px 0px"}}  >succesfull!!!</p>}
                <input hidden type='file' placeholder='choose your avatar' onChange={(e)=>setImage(e.target.files[0])} required/>
                <label>Enter username</label>
                <input type="text" placeholder="Enter name" onChange={e=>setUsername(e.target.value)}/>
                <label>Enter password</label>
                <input type="password" placeholder="Enter password" onChange={e=>setPassword(e.target.value)} required/>
                <label>Enter phonenumber</label>
                <input type="number" placeholder="Enter phonenumber" onChange={e=>setPhonenumbers(e.target.value)} required/>
                <button className='otp_button'   onClick={sendOtp}>{loading? "Requesting" : "Request otp"}</button>
                {open && <label>Verify otp</label>}
                {open && <input type="number" placeholder="Verify phonenumber" onChange={e=>setOtp(e.target.value)} required/>}
                 <button className='login_button'  onClick={handleClick}>{loadings?"Loading...": "Register"}</button>
                 <div id='sign-in-button'/>
            </div>
          </div>
    </div>
  )
}

export default Regis