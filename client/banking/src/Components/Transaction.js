import React, { useContext, useState } from 'react'
import "./Transaction.css"
import { KE } from 'country-flag-icons/react/3x2'
import { AddCircleOutlineOutlined, MoreHoriz, Search, Send, TransitEnterexit } from '@mui/icons-material'
import { LoginContext } from '../Contexts/LoginContext'
import useFetchs from '../useFetch/useFetchs'
import { Link } from 'react-router-dom'
import DepositType from '../Transactions/DepositType'
import MoreItems from './MoreItems'

function Transaction() {
  const {user} = useContext(LoginContext)
  const id = user._id
  const {data} = useFetchs(`/Transaction/balance/${id}`)
  const datas = [data]

  //open the deposit type
  const [openDeposit, setOpenDeposit] = useState(false)
  const [ open,setOpen] = useState(false)
  const amounts = datas.toLocaleString("en-us")
  const amountz = amounts

  return (
    <div className='transaction_body_container'>
      {/* choose pay type */}
      {openDeposit && <div className='choose_pay'>
          <DepositType setOpenDeposit={setOpenDeposit} />
      </div>}
    <div className='transaction'>
      <div className='transaction_container'>
          <div className="transaction_text">
              <p>Hey {user.username} ,</p><br/>
              <h1>Welcome back !</h1>
            </div>
        <div className="transaction_page">
            <div className='transaction_balance'>
              <div className='transcation_wallet'>
                <p>Wallet Balance: </p>
                <h1>$ {amountz}</h1>
              </div>
              <div className='country_flag'>
              <KE title="United States" className="flags"/>
              </div>
            <div className='transaction_payments'>
              <div className='send_receive_button'>
                  <Link to={`/transfer/${id}`}>
                    <div className="center_button">
                      <Send 
                        className="iconssz"
                        sx={{
                          color:"crimson"
                        }}
                      />
                      <p>transfer</p>
                    </div>
                  </Link>
               
               {/* choose deposit */}
                    <div className="center_button"  onClick={()=>setOpenDeposit(true)}>
                      <TransitEnterexit
                        className="iconss"

                        sx={{
                          color:"blue"
                        }}
                      />
                      <p>Deposit</p>
                    </div>
                 

                  <div className="center_button" onClick={()=> setOpen(true)}>
                    <MoreHoriz 
                      className="iconss"
                      sx={{
                        color:"gray"
                      }}
                    />
                    <p>More</p>
                  </div>
              </div>
            </div>
          </div>
       </div>
           {open && <div className="open_savings_modal">
                  <MoreItems setOpen={setOpen} />
            </div>}
        <div className="Quick_send">
            <div className="Quick_sendContainer">
                <h1>Send to recent friends...</h1>
                <div className='transaction_avatars'>
                    <p className='rounded_borders'>
                      {/* <AddCircleOutlineOutlined sx={{ fontSize: "75px", position: "absolute", left: 34,top: 29,color: "lightgray"}}/> */}
                      <h1 style={{color: "red", position: "absolute"}} className='add'>Add</h1>
                      <p style={{position: "absolute", left: 170, top: 60,fontSize: 15, color: "teal"}} className="send_now">Send now</p>
                    </p>
                   <div className='img_avatar'>
                      <div className='avatar_datails'>
                          <img  src='/images/login.jpg' alt='' />
                          <p>Jane</p>
                      </div>
                      <div className='avatar_datails'>
                          <img  src='/images/login.jpg' alt='' />
                          <p>Wandia</p>
                      </div>
                      <div className='avatar_datails'>
                          <img  src='/images/login.jpg' alt='' />
                          <p>Ken</p>
                      </div>
                   </div>
                </div>

           </div>

        </div>
        
      </div>
    </div>
    </div>

  )
}

export default Transaction