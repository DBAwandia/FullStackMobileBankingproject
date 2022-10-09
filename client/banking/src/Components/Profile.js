import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../Config/Baseurl'
import { LoginContext } from '../Contexts/LoginContext'
import SpinnerLoading from '../LoadingPages/SpinnerLoading'
import Footer from './Footer'
import Navbar from './Navbar'
import "./Profile.css"
function Profile() {
    const {user} = useContext(LoginContext)
    const id = user._id
    const [ image , setImage] = useState("")
    const [ password , setPassword] = useState("")
    const [ username , setUsername] = useState("")
    const [ opens , setOpens] = useState(false)
    const [ loading , setLoading] = useState(false)
    const [ open , setOpen] = useState(false)


    const navigate = useNavigate()
    const handleSubmit = async(e) =>{
        e.preventDefault()
        setLoading(true)
        setOpens(true)

       try{

        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "keniko")

        const res = await axios.post("https://api.cloudinary.com/v1_1/wandia/image/upload", data)
        const URL = res.data.url
        await axiosInstance.put(`/User/findAndEdit/${id}` , { photos: URL,password: password,username: username})
        setLoading(false)
        navigate("/")
       }catch(err){
        console.log(err)
        setOpen(true)
        setOpens(false)
        setLoading(false)
       }
    }
  return (
    <div className='profile'>
    <Navbar />
    {opens && <div className="spiner_loading">
      <SpinnerLoading/>
    </div>}
        <div className='profile_container'>
            <div className='EEdit_input_container'>
                {open && <p style={{color: "white",fontSize:"19px", background:"red", padding: "15px"}}>Input correctly</p>}
                {opens && <p style={{color: "white",fontSize:"19px", background:"green", padding: "15px"}}>Successfully updates</p>}

                <label>Choose profile picture</label>
                <input required="false" type="file" placeholder="Enter image" onChange={(e)=> setImage(e.target.files[0])}/>
                <label>Username</label>
                <input type="text" placeholder="Enter username" onChange={(e)=>setUsername(e.target.value)}/>
                <label>Password</label>
                <input type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}/>
                <label>Your phonenumber</label>
                <input type="text" style={{color: "teal"}} placeholder={user.phonenumber   + "   " + "(contact ,customer-service)"} readOnly/>
                <button onClick={handleSubmit}>{loading ? "loading...": "Update"}</button>
            </div>
        </div>   
    <Footer />
    </div>
  )
}

export default Profile