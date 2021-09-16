import React, { useState, useEffect } from 'react'
import { NoderedUtil } from '@openiap/openflow-api'
// import {QueryCall} from '../../Helper/OpenFlowCalls'
import { QueryCall } from '../../Helper/OpenFlowCalls';
import { Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
// import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import DealDetails from './DealDetails';



export default function Deal(props) {
    // let propdata=props? props.location?props.location.data?props.location.data:null:null:null

    const [propdata, setPropData] = useState(props? props.location?props.location.data?props.location.data:null:null:null)
    console.log(propdata)
    const [deals, setdeals] = useState()
    const [page, setPage] = useState(0)
    const getdeal = async () => {
        let data = await QueryCall('pipedrive',{"_type":"deal"} ,page,20)

        setdeals(data)

        console.log(deals)
        console.log(page)
    }
    const getReportDetail=async(id_array)=>{

        console.log(propdata)
        console.log(id_array)
        let data = await QueryCall('pipedrive',{"_id":{"$in":id_array}})

        setdeals(data)

        // console.log(deals)
        console.log(page)
    }
    useEffect(() => {

        if(propdata)
        {

            let id_array=[]
            for(let i=20*page;i<20*page+20;i++)
            {
                if(propdata[i])
                {
                    id_array.push(propdata[i]._id)
                    console.log(propdata[i]._id)
    
                }
            }

            getReportDetail(id_array)
        }
        else
        {
            getdeal()

        }
    }, [page])
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();

    if (deals) {
        return (
            <Container>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Organization</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Pipeline</TableCell>
                            <TableCell align="center">Stage</TableCell>
                            <TableCell align="center">Category</TableCell>
                            <TableCell align="center">View</TableCell>
                            <TableCell align="center">Edit</TableCell>
                            <TableCell align="center">View versions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {deals.map((deal) => (
                            <TableRow key={deal._id}>
                                <TableCell component="th" scope="row">
                                    {deal.name}
                                </TableCell>
                                <TableCell align="center">{deal.org_name}</TableCell>
                                <TableCell align="center">{deal.status}</TableCell>
                                <TableCell align="center">{deal.pipeline_id}</TableCell>
                                <TableCell align="center">{deal.stage_id}</TableCell>
                                <TableCell align="center">{deal.category? deal.category : 'N/A'}</TableCell>
                                <TableCell align="center"><Link to={{pathname:'/DealDetail',data:[deal,propdata]}}><Button variant="contained" color="primary">View</Button></Link></TableCell>
                                <TableCell align="center"><Link to={{pathname:'/DealEdit',data:[deal,propdata]}}><Button variant="contained" color="primary">Edit</Button></Link></TableCell>
                                <TableCell align="center"><Button variant="contained" color="primary">View Versions</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button variant="contained" color="primary" onClick={() => setPage(page - 1)}>back</Button>
                <Button variant="contained" color="primary" onClick={() => setPage(page + 1)}>next</Button>
            </TableContainer>
            <Router>
            </Router>
            </Container>
        );
    }
    else
        return null
    // <Container>
    //         {deals.map((deal)=>{
    //             return(
    //             <Grid><li key={deal.id}>{deal.name}</li></Grid>
    //             )
    //         })}
    //         <Button variant="contained" color="primary" onClick={()=>setPage(page-1)}>back</Button>
    //         <Button variant="contained" color="primary" onClick={()=>setPage(page+1)}>next</Button>
    //     </Container>



}
