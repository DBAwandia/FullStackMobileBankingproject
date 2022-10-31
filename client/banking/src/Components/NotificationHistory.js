import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../Contexts/LoginContext'
import useFetchs from '../useFetch/useFetchs'
import "./NotificationHistory.css"
import ReactPaginate from "react-paginate"
function NotificationHistory({setOpenNotification}) {
  const {user} = useContext(LoginContext)
  const id = user._id

  //data
  const {data, loading} = useFetchs(`/HistoryData/gethistory/${id}`)
  const dataz = [data]

  //pagination
  const [pageCount,setPageCount] = useState(0)
  const [offset,setOffset] = useState(0)
  const [currentData,setCurrentData] = useState(null)
  const itemPerPage = 2

  useEffect(()=>{
    const endOffset = itemPerPage + offset
    setCurrentData(dataz.slice(offset,endOffset))
    setPageCount(Math.ceil(data.length/itemPerPage))
  },[offset,itemPerPage])
  console.log(currentData,dataz)

  const handlePageClick = (event) =>{
    // setOffset(event.selected * itemPerPage)
  }

  return (
    <div className='NotificationHistory' onClick={()=>setOpenNotification(false)}>
      <div className='NotificationHistory_container'>
        <h1 className='NotificationHistory_container_header'>All transactions</h1>
        {currentData.map((item)=>{
          return <div className='NotificationHistory_container_printable'>
          <div className='history'>
            <span className='hitory_name'>
              Name:
            </span>
            <p> {user?.username}</p>
          </div>
          <div className='history'>
            <span className='hitory_name'>
            Phone:
            </span>
            <p> {user.phonenumber}</p>
          </div>
          <div className='history'>
            <span className='hitory_name'>
            Receiver:
            </span>
            <p> {item?.receiverNumber}</p>
          </div>
          <div className='history'>
            <span className='hitory_name'>
              Name:
            </span>
            <p> {item?.receiverName}</p>
          </div>
          <div className='history'>
            <span className='hitory_name'>
            Amount:
            </span>
            <p> $ {item?.amount}</p>
          </div>
          <div className='history'>
            <span className='hitory_name'>
            Transaction ID:
            </span>
            <p> {item.transactNumber}</p>
          </div>
          <div className='history'>
            <span className='hitory_name'>
            Method:
            </span>
            <p> {item?.type}</p>
          </div>
          <div className='history'>
            <span className='hitory_name'>
            Type:
            </span>
            <p> {item?.name}</p>
          </div>
          <div className='history'>
            <span className='hitory_name'>
            Period:
            </span>
            <p> {item.createdAt}</p>
          </div>
        </div>
        })}
        <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
      </div>
    </div>
  )
}

export default NotificationHistory
