import { Button,TextField, MenuItem, Table,TableHead,TableRow,TableCell, TableBody } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { QueryCall } from '../../Helper/OpenFlowCalls'

export default function Reports() {
    const [pipelineData, setPipelineData] = useState()
    const [pipeline_id, setPipeline_id] = useState()
    const [dealData, setDealData] = useState()
    const [stageData, setStageData] = useState()
    const getData = async () => {
        let pipeline = await QueryCall('pipedrive', { "_type": "pipeline" }, 0, 20)
        // setPipelineData(pipeline)
        console.log(pipeline)
        let deals = [], stages
        if (pipeline_id) {
            stages = await QueryCall('pipedrive', { "_type": "stage", "pipeline_id": pipeline_id }, null, null, { "pipeline_id": 1, "id": 1 })
            for (let index = 0; index < stages.length; index++) {


                deals[index] = await QueryCall('pipedrive', { "_type": "deal", "pipeline_id": pipeline_id, "stage_id": stages[index].id }, null, null, { "pipeline_id": 1, "stage_id": 1, "category": 1,"move":1 })


            }
        }
        else {
            stages = await QueryCall('pipedrive', { "_type": "stage", "pipeline_id": pipeline[0].id }, null, null, { "pipeline_id": 1, "id": 1 })
            for (let index = 0; index < stages.length; index++) {


                deals[index] = await QueryCall('pipedrive', { "_type": "deal", "pipeline_id": pipeline[0].id, "stage_id": stages[index].id }, null, null, { "pipeline_id": 1, "stage_id": 1, "category": 1,"move":1 })


            }
        }
        console.log(deals)
        setStageData(stages)
        setDealData(deals)
        setPipelineData(pipeline)

        // deals=await QueryCall('pipedrive',{"_type":"deal","pipeline_id":pipeline[0].id},null,null,{"pipeline_id":1,"stage_id":1,"category":1})


        console.log(deals)
        console.log(stages)
    }
    useEffect(() => {
        // setDealData(null)
        getData()
    }, [pipeline_id])
    useEffect(() => {
        // setDealData(null)
        // getData()
    }, [dealData])
    if (pipelineData)
        return (
            <div>
                <form>
                    <TextField select value={pipeline_id} onChange={(e) => setPipeline_id(e.target.value)}>
                        {pipelineData.map((option) =>
                        (
                            <MenuItem key={option.id} value={option.id}>
                                {option.id}
                            </MenuItem>

                        )
                        )}
                    </TextField>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <TableCell align="center"></TableCell>
                            {stageData.map((option)=>{
                                return(
                                    <TableCell align="center">Stage{option.id}</TableCell>
                                )
                            })}
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                            <TableCell align="center">Stay</TableCell>
                            {stageData.map((option,count)=>{
                                let staycount=dealData[count]?dealData[count].filter( (ob)=>{
                                    return(
                                        ob.move==='Stay'

                                    )
                                }):[]
                               {/* console.log(count)
                               console.log(staycount) */}
                               

                                return(
                                    <TableCell align="center">{staycount.length}</TableCell>
                                )
                            })}
                            </TableRow>
                            <TableRow>
                            <TableCell align="center">Go</TableCell>
                            {stageData.map((option,count)=>{
                                let staycount=dealData[count]?dealData[count].filter( (ob)=>{
                                    return(
                                        ob.move=='Go'

                                    )
                                }):[]
                               {/* console.log(count)
                               console.log(staycount) */}
                               

                                return(
                                    <TableCell align="center">{staycount.length}</TableCell>
                                )
                            })}
                            </TableRow>
                            <TableRow>
                            <TableCell align="center">N/A</TableCell>
                            {stageData.map((option,count)=>{
                                let staycount=dealData[count]?dealData[count].filter( (ob)=>{
                                    return(
                                        typeof ob.move==='undefined'

                                    )
                                }):[]
                               {/* console.log(count)
                               console.log(staycount) */}
                               

                                return(
                                    <TableCell align="center">{staycount.length}</TableCell>
                                )
                            })}

                            </TableRow>
                            <TableRow>
                            <TableCell align="center">Cat-Stay</TableCell>
                            {stageData.map((option,count)=>{
                                let staycount=dealData[count]?dealData[count].filter( (ob)=>{
                                    return(
                                        ob.move==='Stay'

                                    )
                                }):[]
                               {/* console.log(count)
                               console.log(staycount) */}
                               let categories=''
                                for(let i=0;i<staycount.length;i++)
                                {
                                    if(staycount[i].category)
                                    {
                                        console.log(staycount[i].category)
                                        categories+=staycount[i].category+','
                                    }
                                }
                                categories=categories.length>0 ? categories+='...':'N/A'
                                console.log(staycount)
                              

                                return(
                                    <TableCell align="center"><Link to={{ pathname: '/deals',data:staycount  }}><Button>{categories}</Button></Link></TableCell>
                                )
                                    {/* <TableCell align="center">{staycount.length>0?staycount[0].category? staycount[0].category+'...':'N/A':'N/A'}</TableCell>
                                ) */}
                            })}
                            </TableRow>
                            <TableRow>
                            <TableCell align="center">Cat-Go</TableCell>
                            {stageData.map((option,count)=>{
                                let staycount=dealData[count]?dealData[count].filter( (ob)=>{
                                    return(
                                        ob.move==='Go'

                                    )
                                }):[]
                                let categories=''
                                for(let i=0;i<staycount.length;i++)
                                {
                                    if(staycount[i].category)
                                    {
                                        categories+=staycount[i].category
                                    }
                                }
                                categories=categories.length>0 ? categories:'N/A'
                               {/* console.log(count)
                               console.log(staycount) */}
                                return(
                                    <TableCell align="center"><Link to={{ pathname: '/deals',data:staycount  }}><Button>{categories}</Button></Link></TableCell>
                                )
                                    {/* <TableCell align="center">{staycount.length>0?staycount[0].category? staycount[0].category+'...':'N/A':'N/A'}</TableCell>

                                ) */}
                                    {/* <TableCell align="center">{staycount.length>0?staycount[0].category? staycount[0].category+'...':'N/A':'N/A'}</TableCell> */}
                                
                            })}
                            </TableRow>
                            <TableRow>
                            <TableCell align="center">Cat-N/A</TableCell>
                            {stageData.map((option,count)=>{
                                let staycount=dealData[count]?dealData[count].filter( (ob)=>{
                                    return(
                                        typeof ob.move==='undefined'

                                    )
                                }):[]
                               {/* console.log(count)
                               console.log(staycount) */}
                               let categories=''
                                for(let i=0;i<staycount.length;i++)
                                {
                                    if(staycount[i].category)
                                    {
                                        categories+=staycount[i].category
                                    }
                                }
                                categories=categories.length>0 ? categories:'N/A'
                               

                                return(
                                    <TableCell align="center"><Link to={{ pathname: '/deals',data:staycount }}><Button>{categories}</Button></Link></TableCell>
                                )
                                    {/* <TableCell align="center">{staycount.length>0?staycount[0].category? staycount[0].category+'...':'N/A':'N/A'}</TableCell>
                                ) */}
                            })}

                            </TableRow>
                        </TableBody>
                    </Table>
                </form>
            </div>
        )
    else
        return null
}
