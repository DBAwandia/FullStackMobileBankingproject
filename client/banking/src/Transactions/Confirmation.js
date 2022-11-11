import React, { useContext, useEffect, useState } from 'react'
import "./Confirmation.css"
import Navbar from "../Components/Navbar"
import Footer from '../Components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { AddBoxRounded, ArrowBackIos } from '@mui/icons-material'
import SpinnerLoading from '../LoadingPages/SpinnerLoading'
import { axiosInstance } from '../Config/Baseurl'
import { LoginContext } from '../Contexts/LoginContext'
function Confirmation() {
  
  //fetch userID from localStorage
  const {user} = useContext(LoginContext)
  const id = user._id
  const phonenumber = user.phonenumber
  console.log(id)
  //open loading modal
  const [open, setOpen] = useState(false)


  //fetch deposit details from localStorage
   const res = JSON.parse(localStorage.getItem("details"))

  // const amounts = res.map(item => item.amount)
  // const email = res.map(item => item.email)
  // const UID = res.map(item => item.generateID)
  // const methodDeposit = res.map(item => item.name)
  // const bank_type = res?.map(item => item.type)
  
  const amounts = res.amount
  const email =res.email
  const UID =res.generateID
  const methodDeposit =res.name
  const bank_type ="Bank Deposit"
  // console.log(res)
  // console.log(amounts,email,methodDeposit)
  //naviage
  const navigate = useNavigate()

  const saveHistory = async()=>{
    setOpen(true)
    try{
      
      //update history
      await axiosInstance.post(`/HistoryData/savedDepohistory/${id}`,{transactNumber: UID,amount: amounts,name: bank_type,type: methodDeposit, email: email})

      //update database
      await axiosInstance.put(`/Transaction/deposit/${id}`,{balance: amounts})

      //send sms notofication
      // await axiosInstance.post(`/Transaction/whatsapp/${id}`,{amount: amounts, uid: UID, phonenumber: phonenumber})

      navigate("/")

    }catch(err){
      alert("Error")
      setOpen(false)
    }
  }

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
                  <span>{UID}</span>
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
                    <span className='transaction_email'>{email}</span>
                  </div>
                  <div className='bank_detail_block'>
                    <h1>Bank</h1>
                    <span  className='bankz_type'>{bank_type}</span>
                  </div>
                </div>
              </div>
            </div>
            <button className='continue_button' onClick={saveHistory}>Continue</button>

        </div>
        <Footer />
    </div>
  )
}

export default Confirmation