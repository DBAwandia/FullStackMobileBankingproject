import React, { useContext } from 'react'
import "./Navbar.css"
import {useNavigate} from "react-router-dom"
import {Notifications} from '@mui/icons-material';
import {LoginContext} from "../Contexts/LoginContext"
function Navbar() {
  const navigate = useNavigate()
  const {user,dispatch} = useContext(LoginContext)
  const handleLogout = () =>{
    dispatch({type: "LOGOUT"})
    navigate("/login")
  }

  const phonenumber = user.phonenumber
  const photo = user.photos
  // console.log(phonenumber,photo)

  return (
    <div className='Navbar'>
        <div className='navbar_container'>
            <div className='nabvar_objects'>
                <img className='avatar_img' src={photo} alt='' />
                <div className='logoutAndPhone_container'>
                    <span>Phone:</span>
                    <p className='phonenumber_input'>{phonenumber}</p>
                    <button className='logout_button' onClick={handleLogout}>Logout</button>
                    <Notifications />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar