import React from 'react'
import { useLocation } from 'react-router-dom'
import "./BitcoinPayment.css"
function BitcoinPayment() {
  const location = useLocation()
    console.log(location)
  return (
    <div>
      BitcoinPayment
      </div>
  )
}

export default BitcoinPayment