import React, { useContext, useState } from 'react'
import "./SendConfirmation.css"
import Navbar from "../Components/Navbar"
import Footer from '../Components/Footer'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AddBoxRounded, ArrowBackIos } from '@mui/icons-material'
import SpinnerLoading from '../LoadingPages/SpinnerLoading'
import { axiosInstance } from '../Config/Baseurl'
import { LoginContext } from '../Contexts/LoginContext'
function SendConfirmation() {
  const location = useLocation()
  const {user} = useContext(LoginContext)
  const id = user._id
  const [open, setOpen] = useState(false)
  const generateID = location.state.generateId
  const phonenumber = location.state.phonenumber
  const name = location.state.name
  const type = "Sent"
  const receiverNumber = location.state.receiverNumber
  const receiverName = location.state.receiverName
  const userUuid = location.state.uuid
  const amount = location.state.balance
  console.log(userUuid)

  const navigate = useNavigate()
    const handleClick = async() =>{
        setOpen(true)
        try{
            await axiosInstance.post(`/HistoryData/savedhistory/${id}`, {
                name: name,
                senderNumber: phonenumber,
                receiverNumber: receiverNumber,
                receiverName:  receiverName,
                uuid: userUuid,
                transactNumber: generateID,
                amount: amount,
                type: type,
                uuid: "4030769"
            })
            navigate("/")
        }catch(err){
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
                  <span>{generateID}</span>
                </div>
              </div>
              <div className='lower_confirmation_block'>
                <div className='payment_block'>
                  <div className='bank_detail_block'>
                    <h1>Amount paid:</h1>
                    <span className='transaction_amount'>{amount}$</span>
                  </div>
                  <div className='bank_detail_block'>
                    <h1>Phonenumber:</h1>
                    <span className='transaction_email'>{receiverNumber}</span>
                  </div>
                  {/* <div className='bank_detail_block'>
                    <h1>Name:</h1>
                    <span className='transaction_email'>{receiverName}</span>
                  </div> */}
                  <div className='bank_detail_block'>
                    <h1>Status</h1>
                    <span style={{marginLeft: "10%"}}  className='bankz_type'>Sent</span>
                  </div>
                </div>
              </div>
            </div>
            <button className='continue_button' onClick={()=>handleClick()}>Continue</button>

        </div>
        <Footer />
    </div>
  )
}

export default SendConfirmation