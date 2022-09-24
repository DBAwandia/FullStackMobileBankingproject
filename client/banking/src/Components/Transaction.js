import React, { useContext, useState } from 'react'
import "./Transaction.css"
import { KE } from 'country-flag-icons/react/3x2'
import { AddCircleOutlineOutlined, MoreHoriz, Search, Send, TransitEnterexit } from '@mui/icons-material'
import { LoginContext } from '../Contexts/LoginContext'
const data = [
  {
    name: "Kennedy Wandia",
    date: "3 Jun, 6:12pm",
    image: "/images/login.jpg",
    amount: "+$5000",
    type: "received"

  },
  {
    name: "Kevin Kmau",
    date: "13 Aug, 6:12pm",
    image: "/images/login.jpg",
    amount: "-$5000",
    type: "sent"
  }
 ,
  {
    name: "Hilary Wandia",
    date: "25 Feb, 2:12am",
    image: "/images/login.jpg",
    amount: "+$5000",
    type: "received"

  }
]
function Transaction() {
  const {user} = useContext(LoginContext)
  const [searchs, setSearchs] = useState("")
  const Keys = ["name", "amount","type"]
  const SearchData = (data) =>{
    return data.filter((item) =>{
      return Keys.some((key) => item[key].toLowerCase().includes(searchs))
    })
  }
  return (
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
                <h1>$9.00</h1>
              </div>
              <div className='country_flag'>
              <KE title="United States" className="flags"/>
              </div>
            <div className='transaction_payments'>
              <div className='send_receive_button'>
                  <div className="center_button">
                    <Send 
                      className="iconss"
                      sx={{
                        fontSize: "2.5rem",
                        transform: "rotate(-30deg)",
                        margin: "10px 0px",
                        color:"crimson"
                      }}
                    />
                    <p>transfer</p>
                  </div>
                  <div className="center_button">
                    <TransitEnterexit
                      className="iconss"

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
                      className="iconss"
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
                    <input type="text"  placeholder="Search" onChange={e=>setSearchs(e.target.value)}/>
                  </div>
                  <div className='transaction_date'>
                    <h1>Today</h1>
                    {SearchData(data)?.map((item, i)=>{
                      return <div className="transaction_date_details">
                      <img src={item.image} alt="" />
                      <div className='name_date' >
                        <p>{item.name}</p>
                        <p>{item.date}</p>
                      </div>
                      <div className='name_date' >
                        <p className={`${item.type}`}>{item.amount}</p>
                        <p style={{textTransform: "Capitalize", marginRight:"5px"}}>{item.type}</p>
                      </div>
                    </div>
                    } )}
                  </div>
                </div>
              </div>
    </div>
  )
}

export default Transaction