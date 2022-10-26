import React, { useEffect, useState } from 'react'
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import { ArrowBack } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import useFetchs from '../useFetch/useFetchs'
import { axiosInstance } from '../Config/Baseurl'
import { useContext } from 'react'
import { LoginContext } from '../Contexts/LoginContext'
// const dummyCars = [{
//   id: 1,
//   name: " BMW ",
//   price: 14000,
//   img:"https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGNhcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
// },
// {
//   id: 2,
//   name: " LandCruiser ",
//   price: 25000,
//   img:"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"

// },
// {
//   id: 3,
//   name: " Toyota Hilux ",
//   price: 7000,
//   img:"https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2Fyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"

// },
// {
//   id: 4,
//   name: " Nissan ",
//   price: 12000,
//   img:"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"

// }

// ]
function CreateCarAccount() {
  const {data} = useFetchs("/Cars/getcarplans")
  const name = data?.map(item => item.name)
  console.log(name)
  const [amount, setAmount] = useState("")
  const [enable, setEnable] = useState(false)
  const { user} = useContext(LoginContext)
  const id  = user._id
  const navigate = useNavigate()

  //validate form
  useEffect(()=>{
    if(amount.length === ""|| amount.length < 2){
      setEnable(true)
    }else{
      setEnable(false)
      
    }
  }, [amount,enable])
  
  const handleClick = async(e) =>{
    await axiosInstance.post(`/Cars/createCarsSavings/${id}`, {amount: amount})
    console.log(e.selected)
    navigate("/carsavings", {state: {name}})
  }
  return (
    <div className='CreateCarAccount'>
      <Navbar />
      <div className="arrow-left">
        <Link to="/">
          <ArrowBack sx={{fontSize: '35px'}}/>
        </Link>
      </div>
      <h1 className='cars_header_top'>Choose your type</h1>
        <div className='CreateCarAccount_data'>
          {data?.map((item)=>(
            <div className='cars'>
            <p>{item?.name}</p>
            <img src={item?.img} alt='' />
            <b>${item?.price}</b>
            <input type="number" placeholder="Enter starting $amount" onChange={e=> setAmount(e.target.value)} />
            <button className={enable ? "enable" : "button_car"} disabled={enable} onClick={handleClick}>Select plan ${item?.price}</button>
          </div>
          ))}
        </div>
      {/* <Footer /> */}
    </div>
  )
}

export default CreateCarAccount