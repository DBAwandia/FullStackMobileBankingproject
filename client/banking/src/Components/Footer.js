import { AddCardRounded, DashboardRounded, PersonOutlineOutlined, SupportAgentRounded } from '@mui/icons-material'
import React from 'react'
import "./Footer.css"
function Footer() {
  return (
    <div className='footer'>
      <div className='footer_container'>
        <div className='footer_links'>
          <DashboardRounded 
            sx={{fontSize: "2.1rem"}}
          
          />
          <p style={{color: "black"}}>Dashboard</p>
        </div>
        <div className='footer_links'>
          <AddCardRounded 
            sx={{fontSize: "2.1rem", color: "teal"}}

          />
          <p style={{color: "teal"}}>Cards</p>
        </div>
        <div className='footer_links'>
          <SupportAgentRounded 
            sx={{fontSize: "2.1rem", color: "blue"}}

          />
          <p style={{color: "blue", opacity:"0.8"}}>Support</p>
        </div>
        <div className='footer_links'>
          <PersonOutlineOutlined 
            sx={{fontSize: "2.1rem", color: "gray"}}
          />
          <p style={{color: "gray"}}>Profile</p>
        </div>
      </div>
      
    </div>
  )
}

export default Footer