import React, { useContext } from 'react'
import "./Transfer.css"
import {Link, useLocation, useNavigate} from "react-router-dom"
import {ArrowBackIos} from "@mui/icons-material"
import {LoginContext} from "../Contexts/LoginContext"
import Footer from "../Components/Footer"
import useFetchs from '../useFetch/useFetchs'

function Transfer() {
    const {user } = useContext(LoginContext)
    const location = useLocation()
    const id  = location.pathname.split("/")[2]
    const navigate = useNavigate()
    const { data, loading, error} = useFetchs(`/Transaction/balance/${id}`)
    console.log(data)
    const handleClick = ()=>{
        navigate("/confirmtransfer")
    }
  return (
    <div className='transfer'>
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
                <div className='account_details'>
                    <p>Send to</p>
                    <input type="number" placeholder="Enter phone number or contact" />
                </div>
                    <div className='account_details'>
                        <p>Currency(KES)</p>
                        <input minLength={11} min={0} type="number" placeholder="Enter amount" />
                    </div>
                    <div className='account_details'>
                        <p>Payment reason</p>
                        <input type="text" placeholder="optional" />
                    </div>

                </div>
                    <button className='submitt_button' onClick={handleClick}>Send money</button>
        </div>
        <Footer />
    </div>
  )
}

export default Transfer