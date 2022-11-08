import { ArrowBackIos, AttachMoneyOutlined, CreditCardOutlined } from '@mui/icons-material'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import "./BankWithdraw.css"
import SpinnerLoading from '../LoadingPages/SpinnerLoading'
import { axiosInstance } from '../Config/Baseurl'
import useFetchs from '../useFetch/useFetchs'
import { LoginContext } from '../Contexts/LoginContext'


function BankWithdraw() {
   const [amount,setAmount] = useState("")
   const [email,setEmail] = useState("")
   const [ open,setOpen] =useState(false)
   const { user } =useContext(LoginContext)
   const id = user._id
   const { data,loading,error} =useFetchs(`/Transaction/connect/${id}`)
   console.log(data)

   const handleClick = async() =>{
            try{
                await axiosInstance.post("/Transaction/stripepayout",{email: email})
            }catch(err){
                alert("err")
            }
   }
  return (
    <div className='stripepayment'>
        <Navbar />
        {open&& <div className="spiner_loading">
            <SpinnerLoading/>
            </div>}
           <div className='striper_payment_container_list'>
            <div className='stripe_payment_container'>
                    <Link to="/depotype">
                        <ArrowBackIos sx={{fontSize: "35px",marginLeft: "-42em"}}/>
                    </Link>
                    <div className='payment_header_object'>
                        <h1>Welcome to complete your Deposit With STRIPE<span>ken </span></h1>
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
                    <input  type="email" min="1" max="10" placeholder="Input your email" onChange={(e)=> setEmail(e.target.value)} />

                    {/* <input  type="number" min="1" max="10" placeholder="Deposit amount" onChange={(e)=> setAmount(e.target.value)} /> */}
                </div>
                <div className="stripe_input_button">
                        <button 
                        onClick={handleClick}
                        >
                            DEPOSIT
                        </button>
                </div>
           </div>
        <Footer/>
    </div>
  )
}

export default BankWithdraw