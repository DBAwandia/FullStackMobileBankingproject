import React from 'react'
import "./Navbar.css"
import {Notifications} from '@mui/icons-material';
function Navbar() {
  return (
    <div className='Navbar'>
        <div className='navbar_container'>
            <div className='nabvar_objects'>
                <img className='avatar_img' src='/images/login.jpg' alt='' />
                <div className='logoutAndPhone_container'>
                    <span>Phone:</span>
                    <p className='phonenumber_input'>254742***204</p>
                    <button className='logout_button'>Logout</button>
                    <Notifications />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar