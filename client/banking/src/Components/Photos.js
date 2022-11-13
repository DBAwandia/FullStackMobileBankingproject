import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LoginContext } from '../Contexts/LoginContext'
import useFetchs from '../useFetch/useFetchs'
import "./Photos.css"
function Photos({setOpen}) {
    const { user } = useContext(LoginContext)
    const id = user._id
    const {data} = useFetchs(`/User/find/${id}`)
    const datas = [data]
    const photo = datas?.map(item => item.photos)
  return (
    <div className='photoss'>
        <div className='photos_container'>
            <img src={photo?photo: "/images/login.jpg"} alt="" />
        </div>
        <div className='cancel_send'>
            <div className='cancel_send_container'>
               <Link to="/profile">
                    <p className='edit'>Edit</p>
               </Link>
                    <p className='cancel' onClick={()=>setOpen(false)}>Cancel</p>
            </div>
            
        </div>
    </div>
  )
}

export default Photos