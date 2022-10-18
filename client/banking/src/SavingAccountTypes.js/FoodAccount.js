import React from 'react'
import Footer from '../Components/Footer'
import "./FoodAccount.css"

function FoodAccount() {
  return (
    <div className="FoodAccount">
        <div className="FoodAccount_container">
            <div className="FoodAccount_container_header">
                <h1>Food and health</h1>
                <div className='foodandhealth_balance'>
                    <p>Balance</p>
                    <span>$100</span>
                </div>
            </div>
            {/* /* progress bar*/ }
            <progress><p>Transfers are done after 48hrs</p></progress>
            <div className='FoodAccount_container_circularbar'>
                <p>48h change statistic</p>

            </div>
            <div className='FoodAccount_container_footer'>
                <Footer />
            </div>
        </div>
    </div>
  )
}

export default FoodAccount