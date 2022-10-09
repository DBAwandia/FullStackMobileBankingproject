import React, { useContext } from 'react'
import "./DepositType.css"
import {CloseOutlined, KeyboardArrowRight} from "@mui/icons-material"
import { Link } from 'react-router-dom'
import { LoginContext } from '../Contexts/LoginContext'

function DepositType({setOpenDeposit}) {
    const {user} = useContext(LoginContext)
    const id = user._id
  return (
    <div className='DepositType'>
        <div className='close_icon'>
            <CloseOutlined onClick={()=>setOpenDeposit(false)} sx={{fontSize:"3.3rem",color: "red"}}/>
        </div>
        <div className='DepositType_container'>
            <div className='DepositType_objects'>
                <div className='deposit_method'>
                   <Link to="/mpesapay">
                    <div className='depo_method_type'>
                            <img className='mpesa_image' src="/images/mpesa.png" />
                            <p className='mpesa'>M-Pesa</p>
                            <KeyboardArrowRight sx={{fontSize: "3rem", marginLeft:"7.8rem", color:"gray"}} />
                        </div>
                   </Link>
                   <Link to={`/deposit/${id}`}>
                    <div className='depo_method_type'>
                            <img className='bank_image' src="/images/banklogo.webp" />
                            <p className='bank_pay'>Bank</p>
                            <KeyboardArrowRight sx={{fontSize: "3rem", marginLeft:"10rem", color:"gray"}} />
                        </div>
                   </Link>
                   <Link to="/bitcoinpay">
                    <div className='depo_method_type'>
                            <img className='bitcoin_image' src="/images/Bitcoin.png" />
                            <p className='bitcoin'>Crypto (Bitcoin)</p>
                            <KeyboardArrowRight sx={{fontSize: "3rem",color:"gray"}} />
                        </div>
                   </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DepositType