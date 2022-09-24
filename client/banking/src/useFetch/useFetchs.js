import React, { useEffect, useState } from "react";
import { axiosInstance } from "../Config/Baseurl"

const useFetchs = (url) =>{
    const [data, setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [ err, setErr] = useState(false)
    useEffect(()=>{
        const fetchData = async() =>{
            setLoading(true)
            try{
                const res = await axiosInstance.get(url)
                setData(res.data)
                setLoading(false)

            }catch(err){
                setErr(true)
                setLoading(false)

            }
        }
        fetchData()
    },[url])

    const reFetch = async ()=>{
        setLoading(true)
        try{
            const res = await axiosInstance.get(url)
            setData(res.data)
            setLoading(false)

        }catch(err){
            setErr(true)
            setLoading(false)

        }
    }

    return {data, err, loading, reFetch}

}

export default useFetchs