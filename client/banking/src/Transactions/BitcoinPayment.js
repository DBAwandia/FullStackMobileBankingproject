import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import "./BitcoinPayment.css"
function BitcoinPayment() {
  // const location = useLocation()
  const [sec,setSec] = useState(0)
  const [min,setMin] = useState(0)
let timer;
 useEffect(()=>{
   timer = setTimeout(()=>{
    setSec(sec+1)
    if(sec === 59){
    setMin(min+1)
    setSec(0)
  }
  },5000)

  return ()=>{ clearTimeout(timer)}
 })
 const resnd = () =>{
  setSec(0)
  setMin(0)
 }
 const resnds = () =>{
  clearInterval(timer)
 }
  return (
    <div>
      <button onClick={()=>resnd()}>resend</button>
      <button onClick={()=>resnds()}>stop</button>


      <h1>{min < 10? "0"+min: min} : {sec<10? "0"+sec: sec}</h1>

    </div>
  )
}

export default BitcoinPayment