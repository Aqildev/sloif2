import { NoderedUtil } from "@openiap/openflow-api"
export const QueryCall=async(collection,query={},page=0,records=20,projection=null,jwt)=>{
    console.log(jwt)
    let data=await NoderedUtil.Query(
        collection,
        query,
        projection,
        null,
        records,
        page*records,
        jwt,
        null,
        null,
        2)
    // console.log(data)    
    return data    
}
export const AggregateCall=async()=>{

}
export const UpdateCall= async(collection,query,item)=>{
    let data= await NoderedUtil.UpdateOne(collection,query,item)
    return data
}
