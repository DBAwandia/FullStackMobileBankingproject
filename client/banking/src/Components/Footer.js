import { AddCardRounded, DashboardRounded, PersonOutlineOutlined, SupportAgentRounded } from '@mui/icons-material'
import React, { useState } from 'react'
import "./Footer.css"
import {Link, NavLink} from "react-router-dom"
function Footer() {
  const activeLink ="main-nav"
  const normalLink =""

  
  return (
    <div className='footer'>
      <div className='footer_container'>
       <NavLink exact  to="/" 
          className={({isActive})=>
            isActive ? activeLink:normalLink
        }
        >

         <div className='footer_links' 
            >
          <DashboardRounded 
            className="icons"
          />
          <p style={{color: "black"}}>Dashboard</p>
        </div>
       </NavLink>
        <div className='footer_links'
         
            >
          <AddCardRounded 
            className="iconsz"
          />
          <p style={{color: "teal"}}>Cards</p>
        </div>
        <div className='footer_links'
        >
          <a href="https://wa.me/254794770857?text=Thanks%20for%20joining">
            <SupportAgentRounded 
              className="iconsz"
              sx={{color:"gray"}}
            />
            <p className='support_appz' style={{color: "blue", opacity:"0.9"}}>Support</p>
          </a>
        </div>
        <div className='footer_links'
                   
            >
         <NavLink  to="/profile" 
              className={({isActive})=>
              isActive ? activeLink:normalLink
            }
         >
          <PersonOutlineOutlined 
              className="icons1"
            />
            <p style={{color: "gray"}} className="profile_profile">Profile</p>
         </NavLink>
        </div>
      </div>
      
    </div>
  )
}

export default Footer