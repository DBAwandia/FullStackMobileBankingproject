import React from 'react'
import Footer from '../Components/Footer'
import "./FoodAccount.css"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ArrowUpward } from '@mui/icons-material';

function FoodAccount() {
    const percentage = 1;

  return (
    <div className="FoodAccount">
        <div className="FoodAccount_container">
            <div className="FoodAccount_container_header">
                <h1>Food and health</h1>
                <div className='foodandhealth_balance'>
                    <p>Balance :</p>
                    <span>$100</span>
                </div>
            </div>
            <div className='FoodAccount_container_animate'>
                <div className='FoodAccount_container_body'>
                    <p className="vmove">Welcome Keniko to your Food savings account</p>
                    <p className="vmove">Only at 2%, continue saving more!!!</p>
                    {/* <p className="vmove">46h</p>
                    <p className="vmove">45h</p>
                    <p className="vmove">44h</p>
                    <p className="vmove">43h</p> */}

                </div>
            </div>
            <div className="center_message_foodaccount">
                <p className='center_message_text'>
                Almost there, less <span className='foodbalance'>$1000</span> to reach your target of
                <span className='foodbalance'>$150000</span>
                </p>
            </div>
            <div className='FoodAccount_container_circularbar'>
                <p>48h change statistic</p><hr/>
            <div className="FoodAccount_CircularBar_chart">

              <div className='circular_chart_model'>
                <CircularProgressbar className="circulchartbar" value={percentage} text={`${percentage}%`} />;
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

export default FoodAccount