import React, { useContext, useEffect, useRef, useState } from 'react'
import { LoginContext } from '../Contexts/LoginContext'
// import useFetchs from '../useFetch/useFetchs'
import "./NotificationHistory.css"
import ReactPaginate from "react-paginate"
import {Print, SentimentVeryDissatisfied} from "@mui/icons-material"
import { axiosInstance } from '../Config/Baseurl'
import Moment from "react-moment"
import ReactToPrint from 'react-to-print';

function NotificationHistory({setOpenNotification}) {
  const {user} = useContext(LoginContext)
  const id = user._id
  const [dataz,setDataz] = useState([])
  const [currentData,setCurrentData] = useState(null)
  const [pageCount,setPageCount] = useState(0)
  const [searchs, setSearchs] = useState("")
  const [offset,setOffset] = useState(0)
  const itemPerPage = 1

  //fetchdata
const URL =`/HistoryData/gethistory/${id}`
useEffect(()=>{
  const fetchData = async(URL)=>{
    try{
      const res  = await axiosInstance.get(URL)
      setDataz(res.data)
    }catch(err){
    alert("err")
    }
  }
  fetchData(URL)
},[URL])

  //search logic
  const Keys =["type"]
  const Search = (dataz) =>{
    return dataz.filter((item) =>{
      return (Keys).some((key) =>  item[key].toLowerCase().includes(searchs))
    } )
  }
  //pagination
    useEffect(()=>{
      const endOffset = itemPerPage + offset
      setCurrentData(Search(dataz).slice(offset,endOffset))
      setPageCount(Math.ceil(Search(dataz).length/itemPerPage))
    },[offset,itemPerPage,currentData])
    
    const isLength = dataz.length === 0

//event next page
  const handlePageClick = (event) =>{
    const newOffset = (event.selected * itemPerPage);
    setOffset(newOffset)
  }
console.log(dataz)
  //print logic
  const componentRef = useRef()
  return (
    <div className='NotificationHistorys' >
        <div className='NotificationHistory_container'>
          <div className='search'>
            <h1 className='NotificationHistory_container_header'>All transactions</h1>
            <input className='search_notification' type="text" placeholder="Search deposit method..." onChange={(e)=>setSearchs(e.target.value.toLowerCase())}/>
          </div>

          {/* //print code */}
          <div className='react_to_print'>
            <Print className='print' />
            <ReactToPrint
              trigger={() => <p>Print</p>}
              content={() => componentRef.current}
            />
          </div>
          <div className='react_to_prints'>
            <Print className='print' />
            <ReactToPrint
              trigger={() => <p>Retrieve receipt</p>}
              content={() => componentRef.current}
            />
          </div>

        {currentData?.map((item)=>{
          return <div className='NotificationHistory_container_printable' ref={componentRef}>
          <div className='history'>
            <span className='hitory_name'>
              Name:
            </span>
            <p className='itemusername'> {user?.username}</p>
          </div>
          <div className='history'>
            <span className='hitory_name'>
            Phone:
            </span>
            <p className='itemphonenumber'> {user.phonenumber}</p>
          </div>
          <div className='history'>
            <span className='hitory_name'>
            Receiver number:
            </span>
           {item?.receiverNumber ? <p className='nullify' style={{color:"crimson"}}> {item?.receiverNumber}</p>:  <p className='Null1'>Not internal transfer</p>}
          </div>
          <div className='history'>
           <span className='hitory_name'>
              Receiver name:
            </span>
            {item?.receiverName ? <p className='nulity'> {item?.receiverName}</p> : <p className='Null2'>Not internal transfer</p>}
          </div>
          <div className='history'>
            <span className='hitory_name'>
            Amount:
            </span>
            <p className='itemamount'> $ {item?.amount}</p>
          </div>
          <div className='history'>
            <span className='hitory_name'>
            Transaction ID:
            </span>
            <p className='itemtransact'> {item.transactNumber}</p>
          </div>
          <div className='history'>
            <span className='hitory_name'>
            Method:
            </span>
            <p className='itemtype'> {item?.type}</p>
          </div>
          <div className='history'>
            <span className='hitory_name'>
            Type:
            </span>
            <p className='itemname'> {item?.name}</p>
          </div>
          <div className='history'>
            {item.email && <span className='hitory_name'>
            Email:
            </span>}
            
            <p className='itememail'> {item?.email}</p>
          </div>
          <div className='history'>
            <span className='hitory_name'>
            Period:
            </span>

            {/* generate date and time */}
            <p className='itemtime'> 
              <Moment format="YYYY-MM-DD   HH:mm:ss">
                {item.createdAt}
              </Moment>
            </p>


          </div>
        </div>
        }) }
        {isLength && 
          <div className='emoji_empty_history'>
            <p className='show_empty_on_no_transaction'>No transactions</p>
            <SentimentVeryDissatisfied className='emoji_empty'/>
          </div>
        }
        <div className='reactPaginate'>
        <ReactPaginate
            nextLabel="next >"
            breakLabel="..."
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-nums"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="activee-boxx"
            breakClassName="breakClassName"
          />
        </div>
      </div>
      <div className='NotificationHistory' onClick={()=>setOpenNotification(false)}>
      </div>
      
    </div>
  )
}

export default NotificationHistory
