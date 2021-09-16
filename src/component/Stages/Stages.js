import React,{useState,useEffect} from 'react'
import { NoderedUtil } from '@openiap/openflow-api'
import {QueryCall} from '../../Helper/OpenFlowCalls'
export default function Stages() {
    
    const [stages,setStages]=useState()
    const [page,setPage]=useState(0)
    const getdeal=async()=>{
        let data=await QueryCall('pipedrive',{"_type":'stage'},20,page)
        setStages(data)

        console.log(stages)
        console.log(page)
    }
    useEffect(() => {
        console.log("hi")
         getdeal()
    },[page])
    if(stages)
    {
        return (
            <div>
            stagess
                {stages.map((deal)=>{
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
