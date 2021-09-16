import React,{useState,useEffect} from 'react'
import { NoderedUtil } from '@openiap/openflow-api'
import {QueryCall} from '../../Helper/OpenFlowCalls'
export default function Organizations() {
    
    const [Oraganization,setOraganization]=useState()
    const [page,setPage]=useState(0)
    const getdeal=async()=>{
        let data=await QueryCall('pipedrive',{"_type":"organization"},20,page)
        setOraganization(data)

        console.log(Oraganization)
        console.log(page)
    }
    useEffect(() => {
        console.log("hi")
         getdeal()
    },[page])
    if(Oraganization)
    {
        return (
            <div>
            oraganizations
                {Oraganization.map((deal)=>{
                    return(
                        <li key={deal.id}>{deal.name}</li>
                    )
                })}
                <button onClick={()=>setPage(page-1)}>back</button>
                <button onClick={()=>setPage(page+1)}>next</button>
            </div>
        )
    }
    else
    return null

}
