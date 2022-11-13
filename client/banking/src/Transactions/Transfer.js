import React, { useContext, useEffect, useState } from 'react'
import "./Transfer.css"
import {Link, useLocation, useNavigate} from "react-router-dom"
import {ArrowBackIos} from "@mui/icons-material"
import {LoginContext} from "../Contexts/LoginContext"
import Footer from "../Components/Footer"
import useFetchs from '../useFetch/useFetchs'
import { axiosInstance } from '../Config/Baseurl'
import SpinnerLoading from '../LoadingPages/SpinnerLoading'

function Transfer() {
    const {user } = useContext(LoginContext)
    const [balance, setBalance] = useState("")
    const [ open, setOpen] = useState(false)
    const [openReceivername, setOpenReceivername] = useState(false)
    const [userData, setUserData] = useState("")
    const [loadings, setLoadings] = useState(false)
    const [paymentReason, setPaymentReason] = useState("")
    const [uuid, setUuid] = useState("")
    const location = useLocation()
    const id  = location.pathname.split("/")[2]
    const navigate = useNavigate()
    const { data, loading, error} = useFetchs(`/Transaction/balance/${id}`)
    const userDatas = [userData] //array to map it

     //disable button
     const [ enable, setEnable] = useState(false)
     const balances = balance.length === "" || balance.length < 2 || balance === 0
     const uuids = uuid.length === "" || uuid.length < 7
    useEffect(()=>{
      if(balances || uuids ){
        setEnable(true)
       }else{
        setEnable(!true)
       }
  
    },[enable,balance,uuids])
    
    //UUID of receiver
    const URL = `http://localhost:5000/api/User/findUuid?QUERYUID=${uuid}`
    useEffect(()=>{
        
        const fetchData = async(URL) =>{
          try{
            const res = await axiosInstance.get(URL)
            setUserData(res.data)
            setOpenReceivername(true)
          }catch(err){
            setOpenReceivername(false)
          }
        }
        fetchData(URL)
    },[URL])

    //receiver details
    const receiverName = userDatas.map(item => item?.username)
    const receiverNumber = userDatas.map(item => item?.phonenumber)
    

    //senders details
    const name = user.username
    const phonenumber = user.phonenumber
    

    //generate transaction id
    const min2 = 100000000
    const max1 = 999999999
    const generateId =( Math.floor(Math.random()*(max1 - min2 + 1) - min2))
   

    const handleClick = async(e)=>{
        setLoadings(true)
        setOpen(true)
        e.preventDefault()
       try{
        await axiosInstance.put(`/Transaction/withdraw/${id}`, {balance: balance, uuid: uuid})
        await axiosInstance.put(`/Transaction/savedamount/${id}`, {paymentReason: paymentReason})
       
        setLoadings(false)
        alert("successfully sent")
        navigate("/sendconfirmtransfer", {state: {name,phonenumber,receiverNumber,receiverName,generateId,balance,uuid}})

       }catch(err){
        setOpen(false)
        alert("incorect details or insufficient funds")
        setLoadings(false)

       }
    }
  return (
    <div className='transfer'>
       {open && <div className='spinner_transfer'>
            <SpinnerLoading />
        </div>}
        
        <div className='transfer_container'>
           <div className='top_bar'>
            <Link to="/">
                <ArrowBackIos sx={{fontSize: "35px",marginLeft: "-12rem"}}/>
            </Link>
            <p>Send to mobile wallet</p>
           </div>
           <h1 className='transact_header'>Please enter the payment details</h1>
           <div className='transactions_container'>
                <div className='account_details'>
                <p aria-readonly>Send from</p>
                <b>{user.uuid}</b>
                <section className='account_balance' disabled>Available balance is <span>${data}</span></section>
                </div>
               {openReceivername && <div className='account_details'>
               <p style={{color: "crimson"}}>{receiverNumber}    {receiverName}</p>
                </div>}
                <div className='account_details'>
                    <p style={{color: "green"}}>Send to</p>
                    <input type="number" value={uuid} placeholder="Enter receiver account number" onChange={(e)=>setUuid(e.target.value)}/>
                </div>
                    <div className='account_details'>
                        <p style={{color: "crimson"}}>Currency(KES)</p>
                        <input minLength={11} min={1} type="number" value={balance} placeholder="Enter amount" onChange={(e)=>setBalance(e.target.value)}/>
                    </div>
                    <div className='account_details'>
                        <p style={{color: "crimson"}}>Payment reason</p>
                        <input type="text" placeholder="optional" onChange={(e)=>setPaymentReason(e.target.value)}/>
                    </div>

                </div>
                    <button className={enable ? ("enablez") : ("submitt_button")} disabled={enable}  onClick={handleClick}>{loadings ? "loading..." : "Send Money"}</button>
        </div>
        <Footer />
    </div>
  )
}

export default Transfer