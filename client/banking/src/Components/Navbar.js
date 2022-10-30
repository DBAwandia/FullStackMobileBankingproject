import React, { useContext, useEffect, useState } from 'react'
import "./Navbar.css"
import {useNavigate} from "react-router-dom"
import {Notifications} from '@mui/icons-material';
import {LoginContext} from "../Contexts/LoginContext"
import { axiosInstance } from '../Config/Baseurl';
import useFetchs from '../useFetch/useFetchs';
import Photos from './Photos';
function Navbar() {
  // const[data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const {user,dispatch} = useContext(LoginContext)
  const handleLogout = () =>{
    dispatch({type: "LOGOUT"})
    navigate("/login")
  }

  const id = user?._id
  // const obj = `/User/find/${id}`
  // useEffect(()=>{
  //     const fetchData = async(obj)=>{
  //       try{
  //         const res = await axiosInstance.get(obj)
  //         setData(res.data)
  //       }catch(err){
          
  //       }
  //     }
  //     fetchData(obj)
  // },[obj])
  // const datas = [data]
  const { data } = useFetchs(`/User/find/${id}`)
  const datas = [data]
  const openProfile = ()=>{
    setOpen(true)
  }
  return (
    <div className='Navbar'>
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
                  <div className='notifications'>
                    <Notifications className='iconss'/>
                    <span className='number_span' style={{color: "white",opacity:"0.83", fontSize: "1.3rem"}}>+1</span>
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