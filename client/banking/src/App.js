import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Confirmation from "./Transactions/Confirmation";
import Stripepayment from "./Transactions/Stripepayment";
import Transfer from "./Transactions/Transfer";
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
          <Route path="/deposit/:id" element={<Stripepayment />} />


          {/* 
          <Route path="/login" element={} />
          <Route path="/login" element={} />
          <Route path="/login" element={} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
