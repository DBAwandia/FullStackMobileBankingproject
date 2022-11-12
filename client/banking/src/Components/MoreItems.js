import { AddIcCall, Cancel, KeyboardArrowRight, PowerSettingsNew, Savings, Settings } from '@mui/icons-material'
import React, { useContext, useEffect, useState } from 'react'
import "./MoreItem.css"
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../Contexts/LoginContext';
import { axiosInstance } from '../Config/Baseurl';
import useFetchs from '../useFetch/useFetchs';
function MoreItems({setOpen}) {
    const  [carData,setCarData] =useState([])
    const [openStartSavings,setOpenStartSavings] = useState(false)
    const [openoptionsAcc,setOpenoptionsAcc] = useState(false)
    const [openBuyAirtime,setOpenBuyAirtime] = useState(false)
    const [options, setOptions] = useState("")
    const [optionsAcc, setOptionsAcc] = useState("")
    const {user} = useContext(LoginContext)
    const id = user._id
    
    const navigate = useNavigate()
    const {dispatch} = useContext(LoginContext)
    const handleClick = ()=>{
        dispatch({type:"LOGOUT"})
        navigate("/login")

    }

    const {data}=useFetchs(`/User/find/${id}`)
    const datas =[data]
    
    //check if there is already an acc
        const urlCarDATA =`/Cars/getCarsSavings/${id}`
        useEffect(()=>{
            const fetchData = async(urlCarDATA)=>{
                const res =await axiosInstance.get(urlCarDATA)
                setCarData(res.data)
                
            }
            fetchData(urlCarDATA)
        },[urlCarDATA])
   
    // console.log(cars,optionsAcc)
    useEffect(()=>{
        if(options === "Other Phone"){
            navigate("/buyotherairtime")
        }else if(options === "My Phone"){
            navigate("/buymineairtime")
            
        }else if(options === "Create Cars Savings"){
            navigate("/createcarsavings")
    }else if(optionsAcc === "Cars Savings Acc"){
        navigate("/carsavings")
    }
    },[options, navigate,optionsAcc])
   
    return (
    <div className='MoreItems' >
        <div className="cancels">
            <Cancel className='cncel_x' sx={{color: "red"}} onClick={()=>{
                navigate("/profile")
            }}/>
        </div>
        <div className='MoreItems_container'>
                   <div className='more_items_objects'>
                <div className='more_items_icons_area'>
                    <div className='icons_resp_names'
                        onClick={()=>{
                            setOpenStartSavings(false)
                            setOpenoptionsAcc(false)
                            setOpenBuyAirtime(true)
                        }}
                    >
                        <AddIcCall 
                        className='save_icon'
                         sx={{ color: "green",marginLeft:"4rem",fontSize:"2.5rem"}}
                        />
                        <p> Buy Airtime</p>
                        <KeyboardArrowRight 
                         className='save_iconz1'
                            sx={{marginLeft:"0.5rem"}}
                        />
                    </div>
                    {openBuyAirtime && <div className='savings_type_select' >
                        <select placeholder='select type' onChange={e=>setOptions(e.target.value)}>
                            <option className='select_type_option'
                            >
                               SELECT
                            </option>
                            <option className='select_type_option'
                            >
                                My Phone
                            </option>
                            <option className='select_type_option'
                                // onClick={handleOther}
                            >
                                Other Phone

                            </option>
                        </select>
                    </div>}
                    <div className='icons_resp_names' onClick={()=>{
                        setOpenBuyAirtime(false)
                        setOpenoptionsAcc(false)
                        setOpenStartSavings(true)
                    }}>
                        <Savings 
                         className='save_icon'
                         sx={{ color: "pink",marginLeft:"4rem",fontSize:"2.8rem"}}
                        />
                        <p>Start Savings</p>
                       {!openStartSavings && <KeyboardArrowRight 
                         className='save_iconz2'
                            sx={{marginLeft:"0.1rem"}}
                        />}
                    </div>
                    {openStartSavings && <div className='savings_type_select' >
                        <select placeholder='select type' onChange={e=>setOptions(e.target.value)}>
                            <option className='select_type_option'
                            >
                               SELECT
                            </option>
                            <option 
                            disabled={carData}
                            className= "select_type_option"
                            >
                               {carData ? "Alreay Created,switch to my savings":"Create Cars Savings"}
                             </option>
                

                        </select>
                    </div>}
                    {/* <Link to="/profile"> */}
                        <div className='icons_resp_names' onClick={
                            ()=>{
                                setOpenBuyAirtime(false)
                                setOpenStartSavings(false)
                                setOpenoptionsAcc(true)
                            }
                        }>
                            <Savings 
                             className='save_icon'
                            sx={{ color: "gray",marginLeft:"4rem",fontSize:"2.5rem"}}
                            />
                            <p>My Savings</p>
                            <KeyboardArrowRight 
                             className='save_iconz3'
                                sx={{marginLeft:"1.9rem"}}
                            />

                        </div>
                         {openoptionsAcc && <div className='savings_type_select' >
                            <select placeholder='select type' onChange={e=>setOptionsAcc(e.target.value)}>
                                <option className='select_type_option'
                                >
                                    SELECT
                                </option>
                                <option className='select_type_option'
                                    disabled={!carData}
                                >
                                {!carData? "Please create saving acc": "Cars Savings Acc"}
                                </option>
                      
                        </select>       
                    </div>}
                    {/* </Link> */}
                    <Link to="/profile">
                        <div className='icons_resp_names'>
                            <Settings 
                             className='save_icon'
                            sx={{ color: "gray",marginLeft:"4rem",fontSize:"2.5rem"}}
                            />
                            <p>Settings</p>
                            <KeyboardArrowRight 
                             className='save_iconz4'
                                sx={{marginLeft:"1.9rem"}}
                            />

                        </div>
                    </Link>
                    <div className='icons_resp_names_logout' onClick={handleClick}>
                        <PowerSettingsNew  
                         className='save_icon'
                            sx={{ color: "red",marginLeft:"4rem",fontSize:"2.2rem"}}
                        />
                        <p>Logout</p>
                        <KeyboardArrowRight 
                         className='save_iconz5'
                            sx={{marginLeft:"0.5rem"}}
                        />

                    </div>
                    {/* <div className='icons_resp_names'>
                        <Settings />
                        <p>Settings</p>
                    </div> */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default MoreItems