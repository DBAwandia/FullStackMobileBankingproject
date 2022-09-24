import { AddCardRounded, DashboardRounded, PersonOutlineOutlined, SupportAgentRounded } from '@mui/icons-material'
import React from 'react'
import "./Footer.css"
import {Link} from "react-router-dom"
function Footer() {

  return (
    <div className='footer'>
      <div className='footer_container'>
       <Link to="/">
         <div className='footer_links'>
          <DashboardRounded 
            className='icons'
            sx={{fontSize: "2.1rem"}}
          
          />
          <p style={{color: "black"}}>Dashboard</p>
        </div>
       </Link>
        <div className='footer_links'>
          <AddCardRounded 
            className='icons'
            sx={{fontSize: "2.5rem", color: "teal"}}

          />
          <p style={{color: "teal"}}>Cards</p>
        </div>
        <div className='footer_links'>
          <SupportAgentRounded 
            className='icons'
            sx={{fontSize: "2.5rem", color: "blue"}}

          />
          <p style={{color: "blue", opacity:"0.8"}}>Support</p>
        </div>
        <div className='footer_links'>
         <Link to="/profile">
          <PersonOutlineOutlined 
              className='icons'
              sx={{fontSize: "2.5rem", color: "gray"}}
            />
            <p style={{color: "gray"}}>Profile</p>
         </Link>
        </div>
      </div>
      
    </div>
  )
}

export default Footer