import React, { useContext, useState } from 'react'
import "./Login.css"
import { Link, useNavigate} from "react-router-dom"
import { LoginContext } from '../Contexts/LoginContext';
import { axiosInstance } from '../Config/Baseurl';
import HomeLoading from '../LoadingPages/HomeLoading';
function Login() {

  const navigate = useNavigate()
  const [phonenumbers, setPhonenumbers] = useState("")
  const [password, setPassword] = useState("")
  const [open, setOpen] = useState(false)
  const { loadings,dispatch} = useContext(LoginContext)
    const handleClick = async(e)=>{
      e.preventDefault()
      dispatch({type:"LOGIN_START"})
      // setOpen(true)
      try{
         const res = await axiosInstance.post("/User/login", {  phonenumber:phonenumbers,password: password })
         dispatch({type: "LOGIN_SUCCESS", payload: res.data.details})
         navigate("/")
      }catch(err){
        dispatch({type:"LOGIN_ERROR"})
        // setOpen(false)
        console.log("err" + err)
      }
    }
  return (
     <div className='login'>
     {/* {open && <div className='home_loading_container'>
        <HomeLoading/>
      </div>} */}
        <div className='login_container'>
            <div className='login_container2'>
              <h1 style={{margin: "50px 0px", color: "teal"}}>LOGIN</h1>
              <label>Enter phonenumber</label>
                <input type="number" placeholder="Enter phonenumber" onChange={e=>setPhonenumbers(e.target.value)} required/>
                <label>Enter password</label>
                <input type="password" placeholder="Enter password" onChange={e=>setPassword(e.target.value)} required/>
                <button className='login_button'  onClick={handleClick}>{loadings?"Loading...": "Login"}</button>
                <label className='loginLink' style={{ color: "teal", marginTop:39}}>create acc <Link to="/register">Register</Link></label>
            </div>
          </div>
    </div>
  )
}

export default Login