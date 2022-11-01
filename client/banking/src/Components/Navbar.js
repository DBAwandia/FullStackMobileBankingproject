import React, { useContext, useEffect, useState } from 'react'
import "./Navbar.css"
import {useNavigate} from "react-router-dom"
import {Notifications} from '@mui/icons-material';
import {LoginContext} from "../Contexts/LoginContext"
import { axiosInstance } from '../Config/Baseurl';
import useFetchs from '../useFetch/useFetchs';
import Photos from './Photos';
import NotificationHistory from './NotificationHistory';
// import { NotificationContext } from '../Contexts/NotificationContext';
function Navbar() {
  // const[data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [openNotification, setOpenNotification] = useState(false)
  // const [countNotification, setCountNotification] = useState(0)
  const navigate = useNavigate()
  const {user,dispatch} = useContext(LoginContext)
  // const {countNotification} = useContext(NotificationContext)
  const handleLogout = () =>{
    dispatch({type: "LOGOUT"})
    navigate("/login")
  }

  const id = user?._id
  
  const { data } = useFetchs(`/User/find/${id}`)
  const datas = [data]
  const openProfile = ()=>{
    setOpen(true)
  }
  const handleNotification = ()=>{
    setOpenNotification(true)
  }
  return (
    <div className='Navbar'>
      {openNotification && <div className='NotificationHistory_container_position'>
        <NotificationHistory setOpenNotification={setOpenNotification}/>
      </div>}
       {datas?.map((item, i) =>{
        return <div className='navbar_container' key={i}>
              <div className='nabvar_objects'>
                <div onClick={openProfile}>
                  <img  className='avatar_img' src={item?.photos} alt='' />
                </div>
              <div className='logoutAndPhone_container'>
                  <span>  UID:</span>
                  <p className='phonenumber_input'>{item?.uuid}</p>
                  <button className='logout_button' onClick={handleLogout}>Logout</button>
                  <div className='notifications' onClick={handleNotification}>
                    <Notifications  className='iconss'/>
                    <span className='number_span' style={{color: "white",opacity:"0.83", fontSize: "1.3rem"}}>1</span>
                  </div>
              </div>
          </div>
        </div>
      })}
  {open && <div className="prof_pic">
    <Photos setOpen ={setOpen} />
  </div>}
    </div>
  )
}

export default Navbar