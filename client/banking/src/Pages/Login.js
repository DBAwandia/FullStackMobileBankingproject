import React, { useContext, useState ,useEffect} from 'react'
import "./Login.css"
import { Link, useNavigate} from "react-router-dom"
import { LoginContext } from '../Contexts/LoginContext';
import { axiosInstance } from '../Config/Baseurl';
import HomeLoading from '../LoadingPages/HomeLoading';
function Login() {

  const navigate = useNavigate()
  const [phonenumbers, setPhonenumbers] = useState("")
  const [ showSucess, setShowSuccess] = useState(false)
  const [ showFail, setShowFail] = useState(false)

  const [password, setPassword] = useState("")
  const pasword = password.trim()
  const phonnumbers = phonenumbers.trim()

  const [open, setOpen] = useState(false)
  const { loadings,dispatch} = useContext(LoginContext)

  let timer;
  
    const handleClick = async(e)=>{
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try{
        setShowSuccess(true)
      
        const res = await axiosInstance.post("/User/login", {  phonenumber:phonnumbers,password: pasword })
        dispatch({type: "LOGIN_SUCCESS", payload: res.data.details})
        setOpen(true)
        timer= setTimeout(()=>{
        navigate("/")
        },2000)

     }catch(err){
      setOpen(false)
       setShowFail(true)
       clearInterval(timer)
       alert("wrong details")
       dispatch({type:"LOGIN_ERROR"})
        }
    }
      
    
   
  return (
     <div className='login'>
     {open && <div className='home_loading_container'>
      <img className='profile_image_pic' src='/images/profile.jpg' alt='' />
      </div>}
        <div className='login_container'>
          {/* {showSucess ?<div className='show_success_login'>Successful redirecting...</div>:""} */}
          {/* {showFail ? <div className='show_unsuccess_login'>Wrong credentials</div>:""} */}
            <div className='login_container2'>
              <h1 style={{margin: "50px 0px", color: "teal"}}>LOGIN</h1>
              <label>Enter phonenumber</label>
                <input type="number" placeholder="Enter phonenumber" onChange={e=>setPhonenumbers(e.target.value)} required/>
                <label>Enter password</label>
                <input type="password" placeholder="Enter password" onChange={e=>setPassword(e.target.value)} required/>
                <button className='login_button'  onClick={handleClick}>{loadings?"Loading...": "Login"}</button>
                <label className='loginLink' style={{ color: "gray"}}>can't remember password? <Link to="/resetpassword">Forgotpassword</Link></label>
                <label className='loginLink' style={{ color: "teal"}}>create acc <Link to="/register">Register</Link></label>
            </div>
          </div>
    </div>
  )
}

export default Login