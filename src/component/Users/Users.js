import React,{useState,useEffect} from 'react'
import { NoderedUtil } from '@openiap/openflow-api'
import {QueryCall} from '../../Helper/OpenFlowCalls'
export default function Users(jwt) {
    
    const [users,setUsers]=useState()
    const [page,setPage]=useState(0)
    const getUser=async()=>{
        console.log(jwt.location.jwt)
        let data=await QueryCall('pipedrive',{"_type":'user'},20,page,null,jwt.location.jwt)
        setUsers(data)

        console.log(users)
        console.log(page)
    }
    useEffect(() => {
         getUser()
    },[page])
    if(users)
    {
        return (
            <div>
                {users.map((user)=>{
                    return(
                        <li key={user.id}>{user.name}</li>
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
