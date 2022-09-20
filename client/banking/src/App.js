import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./Components/Home";
import Login from "./Pages/Login"
import Register from "./Pages/Register"
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<Home />} />
          {/* 
          <Route path="/login" element={} />
          <Route path="/login" element={} />
          <Route path="/login" element={} />
          <Route path="/login" element={} />
          <Route path="/login" element={} />
          <Route path="/login" element={} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
