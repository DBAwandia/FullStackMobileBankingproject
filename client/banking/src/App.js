import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import MoreItems from "./Components/MoreItems";
import HomeLoading from "./LoadingPages/HomeLoading";
import SpinnerLoading from "./LoadingPages/SpinnerLoading";
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import ResetPassword from "./Pages/ResetPassword";
import FoodAccount from "./SavingAccountTypes.js/FoodAccount";
import LeisureAccount from "./SavingAccountTypes.js/LeisureAccount";
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
import CreateFoodAccount from "./SavingAccountTypes.js/CreateFoodAccount";
import CreateLeisureAccount from "./SavingAccountTypes.js/CreateLeisureAccount";



function App() {
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
          <Route path="/deposit/:id" element={<Stripepayment />} />
          <Route path="/loadingdemo" element={<HomeLoading />} />
          <Route path="/loadingspin" element={<SpinnerLoading/>} />
          <Route path="/depotype" element={<DepositType/>} />
          <Route path="/mpesapay" element={<MpesaPayment/>} />
          <Route path="/bitcoinpay" element={<BitcoinPayment/>} />
          <Route path="/resetpassword" element={<ResetPassword/>} />
          <Route path="/foodandclothing" element={<FoodAccount/>} />
          <Route path="/leisureandtravel" element={<LeisureAccount/>} />
          <Route path="/carsavings" element={<CarsSavings/>} />
          <Route path="/moreitems" element={<MoreItems/>} />
          <Route path="/buymineairtime" element={<BuyMineAirtime/>} />
          <Route path="/buyotherairtime" element={<BuyOtherAirtime/>} />
          <Route path="/createcarsavings" element={<CreateCarAccount/>} />
          <Route path="/createfoodsavings" element={<CreateFoodAccount/>} />
          <Route path="/createleisureavings" element={<CreateLeisureAccount/>} />



          {/* 
         
          <Route path="/login" element={} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
