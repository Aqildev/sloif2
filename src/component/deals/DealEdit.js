import React, { useState, useEffect, useRef } from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { UpdateCall } from '../../Helper/OpenFlowCalls'
import { Link,useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    field: {
        marginTop: 20,
        marginBottom: 20,
        margin: 20,
        display: 'flex',
        flexDirection: 'column',
        // justifyContent:'center',
        // alignItems:'center',
        width: '100%'
    }

}));
export default function DealEdit(props) {
    let data = props.location.data[0]
    const [propdata, setPropData] = useState(props.location.data[1])
    console.log(propdata)
    const History=useHistory()
    console.log(data)
    console.log(props.location)
    const classes = useStyles();
    const [dealdata, setDealdata] = useState()
    const [mark, setMark] = useState(data ? data._mark?data._mark : false:false)
    const [move, setMove] = useState(data?data._move ? data._move : null:null)
    const handleChangeCheck = (event) => {
        // mark = event.target.checked
        setMark(event.target.checked);
    };
    const handleSubmit = async() => {
        data._mark=mark;
        data._move=move;
        console.log(data)
        await setDealdata(data)

        console.log(dealdata)
        console.log(await UpdateCall('entities',null,data))

        History.push({ 
            pathname: '/deals',
            data:propdata
           });
       

        // console.log(mark, move, answer, category, addCategory)

    }
    if (data) {
        return (

            <Container>
                <form className={classes.field} noValidate autoComplete="off" onSubmit={handleSubmit} >
                    {/* <TextField id="outlined-basic" label="ClientDescription" variant="outlined" multiline rows={4} /> */}
                    <FormControlLabel
                        control={<Checkbox checked={mark} onChange={handleChangeCheck} name="Mark" />}
                        label="Client Said Something"
                    />
                    {/* </FormGroup> */}
                    <FormControl>
                    </FormControl>
                    <FormControl className={classes.field}>
                        <FormLabel>Move to next stage</FormLabel>
                        <RadioGroup value={move} onChange={(e) => setMove(e.target.value)}>
                            <FormControlLabel value="Stay" control={<Radio />} label="Stay"></FormControlLabel>
                            <FormControlLabel value="Go" control={<Radio />} label="GO"></FormControlLabel>
                        </RadioGroup>
                    </FormControl>
                    {/* <Link to={{ pathname: '/deals' }}><Button color="primary" variant="contained" onClick={handleSubmit} >Submit</Button></Link> */}
                    {/* <Link to={{ pathname: '/deals',data:propdata }}><Button color="primary" variant="contained" onClick={handleSubmit} >Submit</Button></Link> */}
                    <Button color="primary" variant="contained" lablel="Submit" onClick={handleSubmit} >Submit</Button>
                    <Link to={{ pathname: '/deals',data:propdata }}><Button color="primary" variant="contained">Cancel</Button></Link>
                </form>
            </Container>
        )

    }
    else
        return null
}
