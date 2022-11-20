import React, { useEffect, useState } from 'react'
import {RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../Firebase/Firebase';
import "./Login.css"
import axios from "axios"
import { Link, useNavigate} from "react-router-dom"
import { useContext } from 'react';
import { LoginContext } from '../Contexts/LoginContext';
import { axiosInstance } from '../Config/Baseurl';
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
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(59);
  const [status, setStatus] = useState(false)

    console.log(phonenumber)
  let timer;
  useEffect(()=>{
     timer = setInterval(()=>{
      if(status){
        setSeconds(seconds - 1)
        if(seconds < 2 ){
          // setStatus(false)
          clearInterval(timer)
          setStatus(false)
          setSeconds(59)
  
        }
      }
     
    },1000)
    return ()=> clearInterval(timer)

  },[status,seconds])
  console.log(seconds)
    const sendOtp = (e)=>{
      e.preventDefault()
      setLoadings(true)
      setStatus(true)
      // clearInterval(timer)
      // setSeconds(59)
      if(!window.recaptchaVerifier){
      window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
          console.log(response)
          
      
         
        },
        'expired-callback': () => {
          
        }
        
      }, auth);
      }
      setStatus(true)
    
      const appVerifier = window.recaptchaVerifier
     
      signInWithPhoneNumber(auth,phonenumber,  appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setLoadings(false)
            setFinal(window.confirmationResult)
            setOpen(true)
            
          }).catch((error) => {
            console.log(error)
            setOpens(true)
            setLoadings(false)
           
          });
    }
   
    const handleClick = async(e)=>{
      e.preventDefault()
      setLoading(true)
      const data = new FormData()
      data.append("file", image)
      data.append("upload_preset", "keniko")
      const res = await axios.post("https://api.cloudinary.com/v1_1/wandia/image/upload", data)
      const URL = res.data.url
      console.log(URL)
      final.confirm(otp).then(async(result) => {
        setOpen(true)
        await axiosInstance.post("/User/register", {photos: URL, password: password, phonenumber:phonenumbers,username: username })
        setLoading(false)
        console.log(result)
        navigate("/login")
      }).catch((error) => {
        console.log(error)
       setOpens(true)
       alert("Image is required")
       setLoading(false)
      });
     

    }
  return (
     <div className='login'>
        <div className='login_container'>
            <div className='login_container2'>
                <div className='avatar_container'>
                    <img className='avatar_image' src={image ? URL.createObjectURL(image): "/images/login.jpg"} alt=''/>
                    <input className='file_image' placeholder='Upload profile pic' type='file'  onChange={(e)=>setImage(e.target.files[0])} required/>
                </div>
                {opens && <p style={{color:"red",fontSize: "18px", margin:"10px 0px"}}>Wrong code!!!</p>}
                {open && <p style={{color: "green",fontSize: "18px", margin:"10px 0px"}}  >succesfull!!!</p>}
                <label>Enter username</label>
                <input type="text" placeholder="Enter name" onChange={e=>setUsername(e.target.value)}/>
                <label>Enter password</label>
                <input type="password" placeholder="Enter password" onChange={e=>setPassword(e.target.value)} required/>
                <label>Enter phonenumber</label>
                <input type="number" placeholder="Enter phonenumber" onChange={e=>setPhonenumbers(e.target.value)} required/>
                <button className='otp_button'    onClick={sendOtp}>
                  {seconds === 59 ?"Request otp": <p>
                                Resend  {minutes < 10? "0"+minutes: minutes }: {seconds <10? "0"+seconds : seconds}
                                 </p>  }
                </button>
                {open && <label>Verify otp</label>}
                {open && <input type="number" placeholder="Verify otp sent" onChange={e=>setOtp(e.target.value)} required/>}
                 <button className='login_button'  onClick={handleClick}>{loading?"Loading...": "Register"}</button>
                <label style={{ color: "teal", marginTop: 20}}>Already registered <Link to="/login">Login</Link></label>
                 <div id='sign-in-button'/>
            </div>
          </div>
    </div>
  )
}

export default Register