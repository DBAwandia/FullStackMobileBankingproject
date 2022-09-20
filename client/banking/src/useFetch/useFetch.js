import React, { useEffect, useState } from "react";
import { axiosInstance } from "../Config/Baseurl";

 const useFetch = (url)=>{
    const [data,setData] = useState([])
    const[loading, setLoading] = useState(false)
    const[error, setError] = useState(false)
    
    useEffect(()=>{
        const fetchData = async () =>{
            setLoading(true)
            try{
                const res = await axiosInstance.get(url)
                setData(res.data)
            }catch(err){
                console.log(err)
                setError(true)
            }
            setLoading(false)

        }
        return fetchData()
    },[url])

    //reFecth
    // useEffect(()=>{
        const reFetch = async () =>{
            setLoading(true)
            try{
                const res = await axiosInstance.get(url)
                setData(res.data)
                setLoading(false)
            }catch(err){
                console.log(err)
                setError(true)
            }
        }
        return { data, error, loading, reFetch }
    // },[url])
}

export default useFetch

