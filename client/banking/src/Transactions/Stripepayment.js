import { ArrowBackIos, AttachMoneyOutlined, CreditCardOutlined } from '@mui/icons-material'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import { LoginContext } from '../Contexts/LoginContext'
import "./Stripepayment.css"
import StripeCheckout from 'react-stripe-checkout';
import { axiosInstance } from '../Config/Baseurl'

function Stripepayment() {
    const {user } = useContext(LoginContext)
    const [amount, setAmount] = useState("")
    const [loading, setLoading ] = useState(false)
    const [stripeTokens, setStripeTokens] = useState("")
    const navigate = useNavigate()
    const amountz = amount * 100

    const onTokens = (token) =>{
     setStripeTokens(token)
    }

   
    useEffect(()=>{
        // setLoading(true)
        const makeRequest = async() =>{
        try{
            await axiosInstance.post("/api/Transaction/stripepay", {tokenId: stripeTokens.id, amount: amountz})
            setLoading(false)
            navigate("/")
        }catch(err){}
        }
    setStripeTokens && makeRequest()

    },[navigate, stripeTokens,amount])

    const completeStripe = () =>{
       setLoading(true)
    }
    console.log(stripeTokens)
  return (
    <div className='stripepayment'>
        <Navbar />
           <div className='striper_payment_container_list'>
            <div className='stripe_payment_container'>
                    <Link to="/">
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
                    
                <button onClick={completeStripe}>
                    <StripeCheckout
                        name="Complete payment"
                        image="/images/login.jpg"
                        token={onTokens}
                        stripeKey="pk_test_51LHrwyBVP5viye6wD4xBD8eSEKWLQTdrIdicuDlnosQ4XSvKIUMKJqwq3fOAPa03FSJHqGBdI07jIgzEToSxoFGh00Q4WdAkbQ"
                        locale="us"
                        amount={amountz}
                        billingAddress
                        ComponentClass='stripe_colore'
                    >
                            {loading ? "loading..." : "Deposit"}
                    </StripeCheckout>
                </button>

                </div>
           </div>
        <Footer/>
    </div>
  )
}

export default Stripepayment