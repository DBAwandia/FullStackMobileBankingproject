import React from 'react'
import "./Transaction.css"
import { KE } from 'country-flag-icons/react/3x2'
import { AddCircleOutlineOutlined, MoreHoriz, Search, Send, TransitEnterexit } from '@mui/icons-material'

function Transaction() {
  return (
    <div className='transaction'>
      <div className='transaction_container'>
          <div className="transaction_text">
              <p>Hey Wandia ,</p><br/>
              <h1>Welcome back !</h1>
            </div>
        <div className="transaction_page">
            <div className='transaction_balance'>
              <div className='transcation_wallet'>
                <p>Wallet Balance: </p>
                <h1>$9.00</h1>
              </div>
              <div className='country_flag'>
              <KE title="United States" className="flags"/>
              </div>
            <div className='transaction_payments'>
              <div className='send_receive_button'>
                  <div className="center_button">
                    <Send 
                      sx={{
                        fontSize: "2.5rem",
                        transform: "rotate(-30deg)",
                        margin: "10px 0px",
                        color:"green"
                      }}
                    />
                    <p>transfer</p>
                  </div>
                  <div className="center_button">
                    <TransitEnterexit
                      sx={{
                        fontSize: "2.5rem",
                        margin: "10px 0px",
                        color:"blue"
                      }}
                     />
                    <p>Receive</p>
                  </div>
                  <div className="center_button">
                    <MoreHoriz 
                      sx={{
                        fontSize: "2.5rem",
                        margin: "10px 0px",
                        color:"gray"
                      }}
                    />
                    <p>More</p>
                  </div>
              </div>
            </div>
          </div>
       </div>
        <div className="Quick_send">
            <div className="Quick_sendContainer">
                <h1>Send to recent friends...</h1><hr style={{width: "8rem", fontWeight: 900,borderRadius:"130px 0px 70px 0px",height: "0.5rem",border:0,backgroundColor: 'crimson'}}/>
                <div className='transaction_avatars'>
                    <p className='rounded_borders'>
                      {/* <AddCircleOutlineOutlined sx={{ fontSize: "75px", position: "absolute", left: 34,top: 29,color: "lightgray"}}/> */}
                      <h1 style={{color: "red", position: "absolute", left: 36,top: 49}}>Add</h1>
                      <p style={{position: "absolute", left: 170, top: 60,fontSize: 15, color: "teal"}}>Send now</p>
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
      <div className='transaction_search_container'>
                <div className='transaction_search'>
                  <div className='transactions_header'>
                    <h2>Transactions</h2>
                    <p>Show all</p>
                  </div>
                  <div className='search_container'>
                    <Search 
                      sx={{ fontSize: "2.9rem", color: "gray",padding: "0px 10px"}}
                    
                    />
                    <input type="text"  placeholder="Search" />
                  </div>
                </div>
              </div>
    </div>
  )
}

export default Transaction