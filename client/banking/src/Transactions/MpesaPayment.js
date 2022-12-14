import React, { useContext, useEffect, useState } from 'react'
import "./MpesaPayment.css"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ArrowBackIos } from '@mui/icons-material'
import { axiosInstance } from '../Config/Baseurl'
import { LoginContext } from '../Contexts/LoginContext'
import SpinnerLoading from '../LoadingPages/SpinnerLoading'
import { NotificationContext } from '../Contexts/NotificationContext'

function MpesaPayment() {
  const [enabled, setEnabled] = useState(false)
  const [open, setOpen] = useState(false)
  const [phonenumber, setPhonenumber] = useState("")
  const [amount, setAmount] = useState("")
  const [ countNotifications,setCountNotifications] = useState({
    counts: 0
  })

  const navigate = useNavigate()
  //generate UUID
  const Maxm = 99999999999
  const Minm = 10000000000
  const generatedUID = Math.floor(Math.random()* (Maxm - Minm +1) - Minm)


  //user id
  const {user} = useContext(LoginContext)
  // const {dispatch} = useContext(NotificationContext)

  //disable empty input for button
    useEffect(()=>{
      if(phonenumber.length === "" || 
        phonenumber.length < 10 ||
        amount.length === "" ||
        amount.length < 2
        ){
          setEnabled(true)
        }
        else{
          setEnabled(false)

        }
    },[enabled,phonenumber,amount])
    // console.log(countNotifications)

  const type = "M-Pesa"
  const name = "Deposit"
  const id = user._id
  
  //pay configur
  const handlePay = async(namez, operation) =>{
    // e.preventDefault()
    setOpen(true)
      try{
        
        await axiosInstance.put(`/Transaction/deposit/${id}`, {balance: amount})
        const res =  await axiosInstance.post(`/HistoryData/savedDepohistory/${id}`,{transactNumber: generatedUID,amount: amount,type: type,name: name})
        // dispatch({type: "INCRIMENT", payload: {countNotifications} })
        console.log()
        if(res.config.url === "/HistoryData/savedDepohistory/635ce73bd5cf20be981c6a4d"){
          setCountNotifications(5)
        }else{
          setCountNotifications(null)
        }
      
        alert("Successfully deposited")
        // setCountNotifications((prev)=>{
        //   return{
        //     ...prev,
        //     [namez]:operation === "add" ?countNotifications[namez] + 1:countNotifications[namez] - 1
        // }
        // })
        navigate("/bitcoinpay",{state: countNotifications.counts})
      }catch(err){
        setOpen(false)
        alert("insufficent funds")
      }
  }

  return (
    <div className='mpesa_payment'>
      <Navbar />
      {open && <div className="spiner_loading">
          <SpinnerLoading/>
        </div>}
      <div className='mpesa_payment_container'>
           <div className='arrow_headername'>
              <Link to="/depotype">
                  <ArrowBackIos sx={{fontSize: "40px",marginBottom: "3rem",marginLeft:"4rem",color:"orangered"}}/>
              </Link>
              <h1>M-Pesa payment</h1>
           </div>
        <div className='mpesa_payment_object'>
          <div className='mpesa_payment_label_container'>
            <label>Enter phonenumber</label>
            <input type="number" onChange={(e)=>setPhonenumber(e.target.value)} placeholder="Enter phonenumber in international format" />
          </div>  
          <div className='mpesa_payment_label_container'>
            <label>Enter top up amount</label>
            <input type="number" onChange={(e)=>setAmount(e.target.value)} placeholder="Enter deposit amount" />
          </div> 
          <button disabled={enabled} onClick={handlePay} className={enabled? "enabled" :"mpesa_payment_button"}>Deposit</button>         
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MpesaPayment