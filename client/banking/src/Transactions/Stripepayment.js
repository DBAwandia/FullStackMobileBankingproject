import { ArrowBackIos, AttachMoneyOutlined, CreditCardOutlined } from '@mui/icons-material'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import { LoginContext } from '../Contexts/LoginContext'
import "./Stripepayment.css"
import { axiosInstance } from '../Config/Baseurl'
import SpinnerLoading from '../LoadingPages/SpinnerLoading'
import { useStripe} from '@stripe/react-stripe-js'; 

function Stripepayment() {
    const {user } = useContext(LoginContext)
    const [amount, setAmount] = useState("")
    const [email, setEmail] = useState("")
    const [ opens ,setOpens] = useState(false)
    const [loading, setLoading ] = useState(false)
    const location = useLocation()
    const id = location.pathname.split("/")[2]

    const navigate = useNavigate()
    const amountz = amount * 100

    //stripe
    const stripe = useStripe();

    //generate id
    const maxm = 999999999999
    const minm = 100000000000
    const generateID = Math.floor(Math.random()* (maxm - minm + 1) - minm)


    const itemCart = [{
        quantity: 1,
        currency: "usd",
        name:"Bank Deposit"
    }]
    const type = itemCart.map(item => item.name)
    const name = "Deposit"

      //save transactions details to localStorage
        const details = {
        amount: amount,
        email: email,
        generateID:generateID,
        type: type,
        name: name

    }
    useEffect(()=>{
        localStorage.setItem("details", JSON.stringify(details))
    },[details])

    //deposit event
    const handleClick = async(e)=>{
       e.preventDefault()
       const line_items = itemCart.map((item)=>{
        return{
            quantity: item.quantity,
            price_data:{
                unit_amount: amountz,
                currency: item.currency ,
                product_data:{
                            name: item.name
                         } 
                    },
           
        }
       }) 
       const emailz = `${email}`
        
    try{
        const response = await axiosInstance.post(`/Transaction/stripesession/${id}`,{line_items:line_items,customer_email: emailz})
        //session_id
        const sessionId = response.data
        const result = await stripe.redirectToCheckout({sessionId})
        // const res =await axiosInstance.put(`/Transaction/deposit/${id}`,{balance: amount})
        // await axiosInstance.post(`/HistoryData/savedDepohistory/${id}`, {transactNumber: generateID,amount: amount,type: type,name: name})
        // console.log(res)
        // navigate("/")

        // navigate("/")
        if(result.error){
            alert("Inputs error")
            console.log("error")
        }
    }catch(err){
        console.log(err)
        alert("Please put correct or all details")
    }
         
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
                    <input  type="email" min="1" max="10" placeholder="Input your email" onChange={(e)=> setEmail(e.target.value)} />

                    <input  type="number" min="1" max="10" placeholder="Deposit amount" onChange={(e)=> setAmount(e.target.value)} />
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

export default Stripepayment