import React, { useState } from 'react'
import {RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../Firebase/Firebase';
import "./Login.css"
import axios from "axios"
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
    const handleClick = async(e)=>{
      e.preventDefault()
      const data = new FormData()
      data.append("file", image)
      data.append("upload_preset", "keniko")
      const uploadUrl = await axios.post("https://api.cloudinary.com/v1_1/wandia/image/upload", data)
      const URL = uploadUrl.URL
      console.log(URL)

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
                    <img className='avatar_image' src={image ? URL.createObjectURL(image): "/images/login.jpg"} alt=''/>
                    <input className='file_image' type='file'  onChange={(e)=>setImage(e.target.files[0])} required/>
                </div>
                {opens && <p style={{color:"red",fontSize: "18px", margin:"10px 0px"}}>Wrong code!!!</p>}
                {open && <p style={{color: "green",fontSize: "18px", margin:"10px 0px"}}  >succesfull!!!</p>}
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

export default Register