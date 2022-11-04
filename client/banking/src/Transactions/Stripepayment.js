import { ArrowBackIos, AttachMoneyOutlined, CreditCardOutlined } from '@mui/icons-material'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import { LoginContext } from '../Contexts/LoginContext'
import "./Stripepayment.css"
import axios from "axios"
import { axiosInstance } from '../Config/Baseurl'
import SpinnerLoading from '../LoadingPages/SpinnerLoading'
import {PaymentElement} from '@stripe/react-stripe-js';

function Stripepayment({amountz}) {
    const {user } = useContext(LoginContext)
    const [amount, setAmount] = useState("")
    const [ opens ,setOpens] = useState(false)
    const [loading, setLoading ] = useState(false)
    const location = useLocation()
    const id = location.pathname.split("/")[2]
    const numb1 = 100000000
    const numb2 = 999999999
    const added = (Math.floor(Math.random()*(numb2-numb1+1) + numb1))
    const navigate = useNavigate()

    //save to localStorage first
    const amounts =localStorage.setItem("amount", JSON.stringify(amount))
    console.log(amountz)
    const handleClick = async()=>{
       const res = await axiosInstance.post("/Transaction/stripepays", {amount: amounts})
    }

  return (
    <div className='stripepayment'>
        <Navbar />
        {opens && <div className="spiner_loading">
            <SpinnerLoading/>
            </div>}
           <div className='striper_payment_container_list'>
            <div className='stripe_payment_container'>
                    <Link to="/depotype">
                        <ArrowBackIos sx={{fontSize: "35px",marginLeft: "-42em"}}/>
                    </Link>
                    <div className='payment_header_object'>
                        <h1>Welcome to complete your Deposit With STRIPE<span>{user.username} </span></h1>
                        <p>Amount to recharge<b>${`${amount}`}</b></p>
                    </div>

                </div>
                <div className="stripe_image_pay">
                    <img className='piggyimg' src='/images/pigbank.jpg' alt='' />
                </div>
                <div className="stripe_input_amount">
                    <div className="label_icons">
                        <label>RECHARGE WITH CARD</label>
                        <AttachMoneyOutlined className="icons_pay" sx={{fontSize: "2.2rem",color:"gray"}}/>
                        <CreditCardOutlined sx={{fontSize: "2.2rem", color: "green"}} className="icons_pay"/>
                    </div>
                    <input  type="number" min="1" max="10" placeholder="Deposit amount" onChange={(e)=> setAmount(e.target.value)} />
                </div>
                <div className="stripe_input_button">
                    {/* <PaymentElement> */}
                        <button 
                        onClick={handleClick}
                        disabled={amount.length === ""}
                        >
                            DEPOSIT
                        </button>
                    {/* </PaymentElement> */}
                </div>
           </div>
        <Footer/>
    </div>
  )
}

export default Stripepayment