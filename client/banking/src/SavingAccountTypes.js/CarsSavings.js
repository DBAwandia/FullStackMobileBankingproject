import React, { useContext, useEffect, useState } from 'react'
import Footer from '../Components/Footer'
import "./FoodAccount.css"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ArrowUpward } from '@mui/icons-material';
import useFetchs from '../useFetch/useFetchs';
import { LoginContext } from '../Contexts/LoginContext';
import { axiosInstance } from '../Config/Baseurl';
import SpinnerLoading from '../LoadingPages/SpinnerLoading';

function CarsSavings() {
    const  [carData,setCarData] =useState("")
    const  [depositAmount,setDepositAmount] =useState("")
    const  [withdrawalAmount,setWithdrawalAmount] =useState("")
    const  [loadSpinner,setLoadSpinner] =useState(false)
    const  [openDeposit,setOpenDeposit] =useState(false)
    const  [openWithdraw,setOpenWithdraw] =useState(false)
    const  [Enable,setEnable] =useState(false)



    const { user} = useContext(LoginContext)
    const id = user._id
    
    const {data} = useFetchs(`/Cars/fetchCarsBalance/${id}`)
   
    const urlCarDATA =`/Cars/getCarsSavings/${id}`
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
    const percentageChange = Math.floor(data * 100/target)

    //validate withdrawal
    useEffect(()=>{
        if(target === data){
            setEnable(false)
            // alert("insufficient")
        }else{
            setEnable(true)
            
        }
    },[data,target,Enable])

    //click events
    //deposit
    const handleDeposit = async(e)=>{
        e.preventDefault()

            setLoadSpinner(true)
            try{
                await axiosInstance.put(`/Cars/startCarsSavings/${id}`,{amount: depositAmount})
                setLoadSpinner(false)
                alert("successfull deposit,please refresh")

            }catch(err){
            setLoadSpinner(false) 
            alert("insufficient funds")

            }
    }

    //withdraw
    const handleWithdraw = async(e)=>{
        e.preventDefault()

            setLoadSpinner(true)
            try{
                    await axiosInstance.put(`/Cars/transferCarsSavings/${id}`,{amount: withdrawalAmount})
                    setLoadSpinner(false)
                    alert("successfull withdrawal,please refresh")
               
            }catch(err){
                setLoadSpinner(false) 
                alert("insufficient funds")
            }
    }

  return (
    <div className="FoodAccount">
        {loadSpinner && <div class="spinner">
            <SpinnerLoading/>
        </div> }
        <div className="FoodAccount_container">
            <div className="FoodAccount_container_header">
                <h1>Car Savings </h1>
                <div className='foodandhealth_balance'>
                    <p style={{color: "teal",opacity: "0.89",fontWeight:"bolder",cursor:"pointer"}}  onClick={()=>{
                        setOpenWithdraw(false)
                        setOpenDeposit(true)
                    }
                        }>Deposit </p>
                   {openDeposit && <input className='savings_car_input' onChange={(e)=>setDepositAmount(e.target.value)} type="text" placeholder="deposit"  />}
                </div>
                {openDeposit && <button className='deposit_button' onClick={handleDeposit}>Deposit</button>}
                <div className='foodandhealth_balance'>
                    <p style={{color: "crimson",opacity: "0.89",fontWeight:"bolder",cursor:"pointer"}} onClick={()=>
                        {
                            setOpenDeposit(false)
                            setOpenWithdraw(true)
                        }
                        }>Withdraw </p>
                    {openWithdraw &&  <input  className="savings_car_input" onChange={(e)=>setWithdrawalAmount(e.target.value)} type="text" placeholder="withdraw" />}
                    
                </div>
               {openWithdraw && <button disabled={Enable} className={Enable ? "blocked_withdraw_button":"withdraw_button"} onClick={handleWithdraw}>Withdraw</button>}

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
                <p>Statistics to completing</p><hr/>
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