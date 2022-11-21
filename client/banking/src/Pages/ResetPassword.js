import React, { useEffect, useState } from 'react'
import {RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../Firebase/Firebase';
import "./Login.css"
import "./ResetPassword.css"
import { Link, useNavigate} from "react-router-dom"
import { axiosInstance } from '../Config/Baseurl';
function ResetPassword() {

  const navigate = useNavigate()
  const [phonenumbers, setPhonenumbers] = useState("")
  const [otp, setOtp] = useState("")
  const [password, setPassword] = useState("")
  const [cPassword, setCpassword] = useState("")
  const [final, setFinal] = useState("")
  const [loading, setLoading] = useState(false)
  const [enabled, setEnabled] = useState(false)
  const [isEmpty, setIsempty] = useState(false)
  const [isPassOkay, setisPassOkay] = useState(false)
  const [loadings, setLoadings] = useState(false)
  const [open, setOpen] = useState(false)
  const [opens, setOpens] = useState(false)
  const phonenumber = `+${phonenumbers.trim()}`

  const [seconds,setSeconds] = useState(59)
  const [status,setStatus] = useState(false)

  // const {loadings,error,dispatch} = useContext(LoginContext)

  useEffect(()=>{
    if(phonenumbers.length === "" || phonenumbers.length < 9 ||
    password.length === "" || password.length < 4 || cPassword.length < 4 
    ){
      setEnabled(true)
      // setIsempty(true)
    }else if( password  !== cPassword) {
      setisPassOkay(true)
    }
    else if(password  === cPassword){
      setisPassOkay(false)
      
    }else{
      setEnabled(false)
      setisPassOkay(false)
    }
  },[enabled,phonenumbers,password,cPassword,isPassOkay])

  let timer;
  useEffect(()=>{
    timer = setInterval(()=>{
      if(status){
        setSeconds(seconds-1)
        if(seconds < 2){
          setStatus(false)
          clearInterval(timer)
          setSeconds(59)
        }
      }
    },1000)
    return ()=>clearInterval(timer)
  },[status,seconds])
 
console.log(status,seconds)
    const sendOtp = (e)=>{
      e.preventDefault()
      setStatus(true)
      setLoadings(true)
      if(!window.recaptchaVerifier ){
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
          'size': 'invisible',
          'callback': (response) => {
          }
        }, auth);
      }
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

    let timerz
    const handleClick = async(e)=>{
      timerz = setTimeout(()=>{
        e.preventDefault()
          setLoading(true)
        

          final.confirm(otp).then(async(result) => {
            setOpen(true)
            setLoading(false)
            await axiosInstance.put("/User/reset", {phonenumber: phonenumber, password: password})
            navigate("/login")
          }).catch((error) => {
            console.log(error)
          setOpens(true)
          setLoading(false)
          });
     

      },2000)

      return clearInterval(timerz)
    }
  return (
     <div className='login'>
        <div className='login_container'>
            <div className='login_container2'>
              <h1 >Reset password</h1>
                <label>Enter phonenumber</label>
                <input type="number" placeholder="Enter phonenumber"  onChange={e =>setPhonenumbers(e.target.value)}/>
                <label>Enter password</label>
                <input type="password" value={password}  name='password'  placeholder="Enter password" onChange={e=>setPassword(e.target.value)} required/>
                <label>Confirm password</label>
                {isPassOkay ? <label style={{color: "red"}}>pass dont match</label>:""}
                <input type="password" placeholder="Confirm password" name='cPassword' value={cPassword}  onChange={e=>setCpassword(e.target.value)} required />
                <button className={status?"otps_button":"otp_button"} disabled={seconds < 59}    onClick={sendOtp}>{seconds === 59?"Request otp" : `Resend in ${seconds < 10? "0"+seconds:seconds}`  }</button>
                {open && <label>Verify otp</label>}
                {open && <input type="number" placeholder="Verify otp sent" onChange={e=>setOtp(e.target.value)} required/>}
                 <button  className="login_button"  onClick={handleClick}>{loading?"Loading...": "ResetPassword"}</button>
                <label style={{ color: "teal", marginTop: 20}}>Remembred password <Link to="/login">Login</Link></label>
                 <div id='sign-in-button'/>
            </div>
          </div>
    </div>
  )
}

export default ResetPassword