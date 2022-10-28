import { AddIcCall, Cancel, KeyboardArrowRight, PowerSettingsNew, Savings, Settings } from '@mui/icons-material'
import React, { useContext, useEffect, useState } from 'react'
import "./MoreItem.css"
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../Contexts/LoginContext';
import { axiosInstance } from '../Config/Baseurl';
import useFetchs from '../useFetch/useFetchs';
function MoreItems({setOpen}) {
    const [openStartSavings,setOpenStartSavings] = useState(false)
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
    // const cars = datas.map(item =>item?.cars)
    const cars="6899"
    const food = datas.map(item =>item?.food)
    const leisure = datas.map(item =>item?.leisure)
console.log(cars,optionsAcc)
    useEffect(()=>{
        if(options === "Other Phone"){
            navigate("/buyotherairtime")
        }else if(options === "My Phone"){
            navigate("/buymineairtime")
            
        }else if(options === "Cars Savings"){
            navigate("/createcarsavings")
        }else if(options === "Leisure Savings"){
            navigate("/createleisureavings")
        }else if(options === "FoodandClothing Savings"){
            navigate("/createfoodsavings")
    }else if(optionsAcc==="Cars Savings Acc"){
        navigate("/carsavings",{state:{cars}})

    }
    },[options, navigate,cars,optionsAcc])
   
    return (
    <div className='MoreItems' >
        <div className="cancels">
            <Cancel sx={{fontSize:' 45px',color: "red"}} onClick={()=>setOpen(false)}/>
        </div>
        <div className='MoreItems_container'>
                   <div className='more_items_objects'>
                <div className='more_items_icons_area'>
                    <div className='icons_resp_names'
                        onClick={()=>{
                            setOpenStartSavings(false)
                            setOpenBuyAirtime(true)
                        }}
                    >
                        <AddIcCall 
                         sx={{ color: "green",marginLeft:"4rem",fontSize:"2.5rem"}}
                        />
                        <p> Buy Airtime</p>
                        <KeyboardArrowRight 
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
                        setOpenStartSavings(true)
                    }}>
                        <Savings 
                         sx={{ color: "pink",marginLeft:"4rem",fontSize:"2.8rem"}}
                        />
                        <p>Start Savings</p>
                       {!openStartSavings && <KeyboardArrowRight 
                            sx={{marginLeft:"0.1rem"}}
                        />}
                    </div>
                    {openStartSavings && <div className='savings_type_select' >
                        <select placeholder='select type' onChange={e=>setOptions(e.target.value)}>
                            <option className='select_type_option'
                            >
                               SELECT
                            </option>
                            <option className='select_type_option'
                            >
                                Cars Savings
                             </option>
                            <option className='select_type_option'
                                >
                            Leisure Savings
                            </option>
                            <option className='select_type_option'
                           
                            >
                                FoodandClothing Savings
                            </option>

                        </select>
                    </div>}
                    {/* <Link to="/profile"> */}
                        <div className='icons_resp_names'>
                            <Savings 
                            sx={{ color: "gray",marginLeft:"4rem",fontSize:"2.5rem"}}
                            />
                            <p>My Savings</p>
                            <KeyboardArrowRight 
                                sx={{marginLeft:"1.9rem"}}
                            />

                        </div>
                         <div className='savings_type_select' >
                        <select placeholder='select type' onChange={e=>setOptionsAcc(e.target.value)}>
                            <option className='select_type_option'
                            >
                                SELECT
                            </option>
                            <option className='select_type_option'
                            
                            >
                                Cars Savings Acc
                                </option>
                            <option className='select_type_option'
                                >
                            Leisure Savings Acc
                            </option>
                            <option className='select_type_option'
                            
                            >
                                FoodandClothing Savings Acc
                            </option>
                        </select>       
                    </div>
                    {/* </Link> */}
                    <Link to="/profile">
                        <div className='icons_resp_names'>
                            <Settings 
                            sx={{ color: "gray",marginLeft:"4rem",fontSize:"2.5rem"}}
                            />
                            <p>Settings</p>
                            <KeyboardArrowRight 
                                sx={{marginLeft:"1.9rem"}}
                            />

                        </div>
                    </Link>
                    <div className='icons_resp_names_logout' onClick={handleClick}>
                        <PowerSettingsNew  
                            sx={{ color: "red",marginLeft:"4rem",fontSize:"2.2rem"}}
                        />
                        <p>Logout</p>
                        <KeyboardArrowRight 
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