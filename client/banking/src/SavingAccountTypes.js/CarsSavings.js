import React, { useContext, useEffect, useState } from 'react'
import Footer from '../Components/Footer'
import "./FoodAccount.css"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ArrowUpward } from '@mui/icons-material';
import useFetchs from '../useFetch/useFetchs';
import { LoginContext } from '../Contexts/LoginContext';
import { useLocation } from 'react-router-dom';
import { axiosInstance } from '../Config/Baseurl';

function CarsSavings() {
    const  [carData,setCarData] =useState("")
    const { user} = useContext(LoginContext)
    const id = user._id
    const location = useLocation()
    const idSelect=location.state.id
    const {data} = useFetchs(`/Cars/fetchCarsBalance/${id}`)
   
    const urlCarDATA =`/Cars/getcarplans/${idSelect}`
    useEffect(()=>{
        const fetchData = async(urlCarDATA)=>{
            const res =await axiosInstance.get(urlCarDATA)
            setCarData(res.data)
        }
        fetchData(urlCarDATA)
    },[urlCarDATA])
   const carDatas=[carData]
 //Maths (calculate percentage change)
 const target = carDatas.map(item =>item?.price)
 
 console.log(data,carDatas)
 const percentageChange = Math.floor(data * 100/target)
  return (
    <div className="FoodAccount">
        <div className="FoodAccount_container">
            <div className="FoodAccount_container_header">
                <h1>Car Savings </h1>
                <div className='foodandhealth_balance'>
                    <p>Balance :</p>
                    <span>${data}</span>
                </div>
            </div>
            <div className='FoodAccount_container_animate'>
                <div className='FoodAccount_container_body'>
                    <p className="vmove">Welcome Keniko to your Car savings account</p>
                    <p className="vmove">Only {100 - percentageChange}% left, continue saving more!!!</p>
                    {/* <p className="vmove">46h</p>
                    <p className="vmove">45h</p>
                    <p className="vmove">44h</p>
                    <p className="vmove">43h</p> */}

                </div>
            </div>
            <div className='photos'>
                {carDatas.map(items=>(
                    <div className='immage'>
                    <img  src={items?.photos} alt=""/>
                </div>
                ))}
            </div>
            <div className="center_message_foodaccount">
                    <p className='center_message_text'>
                    Almost there to your dream car, less <span className='foodbalance'>${target-data}</span> to reach your target of
                    <span className='foodbalance' style={{color:"white"}}>${target}</span>
                    </p>
                </div>
            <div className='FoodAccount_container_circularbar'>
                <p>48h change statistic</p><hr/>
            <div className="FoodAccount_CircularBar_chart">

              <div className='circular_chart_model'>
                <CircularProgressbar className="circulchartbar" value={percentageChange} text={`${percentageChange}%`} />;
                <div className="icon_paragraph_chart">
                    <ArrowUpward sx={{color:"green",fontSize: "40px"}}/>
                    <p>Percentage increase in past two days</p>
                </div>
              </div>
            </div>

            </div>
            <div className='FoodAccount_container_footer'>
                <Footer />
            </div>
        </div>
    </div>
  )
}

export default CarsSavings