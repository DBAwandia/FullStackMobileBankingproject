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
            sx={{fontSize: "2.1rem"}}
          
          />
          <p style={{color: "black"}}>Dashboard</p>
        </div>
       </NavLink>
        <div className='footer_links'
         
            >
          <AddCardRounded 
            className="icons"
            sx={{fontSize: "2.5rem", color: "teal"}}

          />
          <p style={{color: "teal"}}>Cards</p>
        </div>
        <div className='footer_links'
          
        >
          <SupportAgentRounded 
            className="icons"
            sx={{fontSize: "2.5rem", color: "blue"}}

          />
          <p style={{color: "blue", opacity:"0.8"}}>Support</p>
        </div>
        <div className='footer_links'
                   
            >
         <NavLink  to="/profile" 
              className={({isActive})=>
              isActive ? activeLink:normalLink
            }
         >
          <PersonOutlineOutlined 
              className="icons"
              sx={{fontSize: "2.5rem", color: "gray"}}
            />
            <p style={{color: "gray"}}>Profile</p>
         </NavLink>
        </div>
      </div>
      
    </div>
  )
}

export default Footer