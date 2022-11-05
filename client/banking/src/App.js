import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import MoreItems from "./Components/MoreItems";
import HomeLoading from "./LoadingPages/HomeLoading";
import SpinnerLoading from "./LoadingPages/SpinnerLoading";
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import ResetPassword from "./Pages/ResetPassword";
import BitcoinPayment from "./Transactions/BitcoinPayment";
import Confirmation from "./Transactions/Confirmation";
import DepositType from "./Transactions/DepositType";
import MpesaPayment from "./Transactions/MpesaPayment";
import SendConfirmation from "./Transactions/SendConfirmation";
import Stripepayment from "./Transactions/Stripepayment";
import Transfer from "./Transactions/Transfer";
import CarsSavings from "./SavingAccountTypes.js/CarsSavings";
import BuyMineAirtime from "./Airtime/BuyMineAirtime";
import BuyOtherAirtime from "./Airtime/BuyOtherAirtime";
import CreateCarAccount from "./SavingAccountTypes.js/CreateCarAccount";

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { axiosInstance } from "./Config/Baseurl";
const stripePromise = loadStripe('pk_test_51LHrwyBVP5viye6wD4xBD8eSEKWLQTdrIdicuDlnosQ4XSvKIUMKJqwq3fOAPa03FSJHqGBdI07jIgzEToSxoFGh00Q4WdAkbQ');


function App() {

  //STRIPE PAYMENT CLIENT SECRET

  //initiate paymentIntent and client_secret
  // const [data,setData] = useState([])

  //get amount from localStorage {I SET IT WHEN USER INPUTS AMOUNT in StripePayment Component}
  // const amountz = JSON.parse (localStorage.getItem("amount"))

  // useEffect(()=>{
  //   const fetchData = async()=>{
  //       try{
  //         const res = await axiosInstance.post("/Transaction/payintent",{amount: amountz})
  //         setData(res.data)

  //       }catch(err){}
  //   }
  //   fetchData()
  // },[amountz])

  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret: `${data}`,
  // };
  // console.log(options)
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/transfer/:id" element={<Transfer />} />
          <Route path="/confirmtransfer" element={<Confirmation/>} />
          <Route path="/sendconfirmtransfer" element={<SendConfirmation/>} />
          <Route path="/deposit/:id" element={
            <Elements stripe={stripePromise} >
                <Stripepayment />
            </Elements>
              } />
          <Route path="/loadingdemo" element={<HomeLoading />} />
          <Route path="/loadingspin" element={<SpinnerLoading/>} />
          <Route path="/depotype" element={<DepositType/>} />
          <Route path="/mpesapay" element={<MpesaPayment/>} />
          <Route path="/bitcoinpay" element={<BitcoinPayment/>} />
          <Route path="/resetpassword" element={<ResetPassword/>} />
          <Route path="/carsavings" element={<CarsSavings/>} />
          <Route path="/moreitems" element={<MoreItems/>} />
          <Route path="/buymineairtime" element={<BuyMineAirtime/>} />
          <Route path="/buyotherairtime" element={<BuyOtherAirtime/>} />
          <Route path="/createcarsavings" element={<CreateCarAccount/>} />
         



          {/* 
         
          <Route path="/login" element={} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
