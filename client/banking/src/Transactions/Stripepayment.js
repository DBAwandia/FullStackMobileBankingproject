import { ArrowBackIos, AttachMoneyOutlined, CreditCardOutlined } from '@mui/icons-material'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import { LoginContext } from '../Contexts/LoginContext'
import "./Stripepayment.css"
import axios from "axios"
import StripeCheckout from 'react-stripe-checkout';
import { axiosInstance } from '../Config/Baseurl'
import SpinnerLoading from '../LoadingPages/SpinnerLoading'

function Stripepayment() {
    const {user } = useContext(LoginContext)
    const [amount, setAmount] = useState("")
    const [ opens ,setOpens] = useState(false)
    const [loading, setLoading ] = useState(false)
    const [stripeToken, setStripeToken] = useState("")
    const location = useLocation()
    const id = location.pathname.split("/")[2]
    const numb1 = 100000000
    const numb2 = 999999999
    const added = (Math.floor(Math.random()*(numb2-numb1+1) + numb1))
    console.log(added)
    const navigate = useNavigate()
    // const amountz = 

    // const handleClick = async()=>{
    //     await axiosInstance.put(`/Transaction/deposit/${id}`,{balance: amount})
    //     navigate("/confirmtransfer",{state:  {amount,added}})
    // }
    const onToken = (token) =>{
     setStripeToken(token)
    }

   
    useEffect(()=>{
        const makeRequest = async()=>{
        setOpens(true)
        try{
            const res = await axiosInstance.post("/Transaction/stripepays",{
              tokenId: stripeToken.id,
              amount: amount * 100
            })
            // await axiosInstance.put(`/Transaction/deposit/${id}`,{balance: amount})
            // navigate("/",{state:  {amount}})
      
            }catch(err){
                setOpens(false)
    }
          }
            stripeToken && makeRequest()
      
      },[stripeToken, amount,navigate])
  
    // console.log(stripeTokens)
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
                    
                <button 
                // onClick={handleClick}
                >
                    <StripeCheckout
                        name="Complete payment"
                        image="/images/login.jpg"
                        token={onToken}
                        stripeKey="pk_test_51LHrwyBVP5viye6wD4xBD8eSEKWLQTdrIdicuDlnosQ4XSvKIUMKJqwq3fOAPa03FSJHqGBdI07jIgzEToSxoFGh00Q4WdAkbQ"
                        currency='USD'
                        amount={amount * 100}
                        billingAddress
                        ComponentClass='stripe_colore'
                    >
                            {loading ? "loading..." : "Deposit"}
                    </StripeCheckout>
                    DEPOSIT
                </button>

                </div>
           </div>
        <Footer/>
    </div>
  )
}

export default Stripepayment