import React, { useState } from 'react'
import { axiosInstance } from '../Config/Baseurl'
import {useFetch }from '../useFetch/useFetch'
import Footer from './Footer'
import "./Home.css"
import Navbar from './Navbar'
import Transaction from './Transaction'
function Home() {
  // const data = await axiosInstance.get("http://localhost:5000/api/User/User/findUsers")

  return (
    <div className='home'>
      <div className='home_container'>
        <Navbar />
      </div>
      <div className='bodyandfooter_container'>
          <div className='body_container'>
            <Transaction />
          </div>
          <div className='footer_container'>
            <Footer />
          </div>
      </div>
    </div>
  )
}

export default Home