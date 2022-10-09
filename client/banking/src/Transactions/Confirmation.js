import React, { useState } from 'react'
import "./Confirmation.css"
import Navbar from "../Components/Navbar"
import Footer from '../Components/Footer'
import { Link, useLocation } from 'react-router-dom'
import { AddBoxRounded, ArrowBackIos } from '@mui/icons-material'
import SpinnerLoading from '../LoadingPages/SpinnerLoading'
function Confirmation() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const amounts = location.state.amount
  const addeds = location.state.added

  
  return (
    <div className="confirmation_header">
        <Navbar />
        {open && <div className="spiner_loading">
          <SpinnerLoading/>
        </div>}
        <div className='confirmation_object'>
            <div className="confirmation_object_container">
           
              <div className='upper_confirmation_block'>
                    {/* <Link to="/">
                        <ArrowBackIos sx={{fontSize: "35px",marginLeft: "-42em"}}/>
                    </Link> */}
                <img src='/images/donesvg.png' className='done_svg' alt='' />
                <h1  className='payment_sucss'>Payment successfull!!</h1>
                <div className='transaction_number'>
                  <p>Transaction id: </p> 
                  <span>{addeds}</span>
                </div>
              </div>
              <div className='lower_confirmation_block'>
                <div className='payment_block'>
                  <div className='bank_detail_block'>
                    <h1>Amount paid:</h1>
                    <span className='transaction_amount'>{amounts}$</span>
                  </div>
                  <div className='bank_detail_block'>
                    <h1>Email:</h1>
                    <span className='transaction_email'>wadda@gmail.com</span>
                  </div>
                  <div className='bank_detail_block'>
                    <h1>Bank</h1>
                    <span style={{marginLeft: "10%"}}  className='bankz_type'>Equity</span>
                  </div>
                </div>
              </div>
            </div>
            <button className='continue_button'>Continue</button>

        </div>
        <Footer />
    </div>
  )
}

export default Confirmation