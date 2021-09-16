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
    // data.mark=data.mark ? data.mark : null
    // data.move=data.move ? data.move : null
    // data.answer=data.answer ? data.answer : null
    // data.category=data.category ? data.category : null
    // data.categories=data.categories?data.categories:[]

    const classes = useStyles();
    const [dealdata, setDealdata] = useState()
    const [mark, setMark] = useState(data ? data.mark?data.mark : false:false)
    const [move, setMove] = useState(data?data.move ? data.move : null:null)
    const [answer, setAnswer] = useState(data ?data.answer ? data.answer : null :null)
    const [category, setCategory] = useState(data ? data.category ? data.category : null:null)
    let answers = ['Colleague', 'responsible', 'no answer', 'answering machine']
    let [addCategory, setAddCategory] = useState()
    let [categories, setCategories]= useState(data ?data.categories?data.categories:[] :[])
    console.log(mark,move,answer,category)
    // let mark, move, answer, category;
    // let addCategory
    // useEffect(() => {
    //     console.log("useeffect:",data)
    //     if(data)
    //     {
    //     data.mark=data.mark ? data.mark : false
    //     data.move=data.move ? data.move : null
    //     data.answer=data.answer ? data.answer : null
    //     data.category=data.category ? data.category : null
    //     data.categories=data.categories?data.categories:[]
    //     console.log(data)
    //     setMark(data.mark)
    //     setMove(data.move)
    //     setAnswer(data.answer)
    //     setCategory(data.category)
    //     setCategories(data.categories)
    //         console.log(mark,move,answer,category)
    
    
    //     }
    
    
    //     // categories=data.categories?data.categories:[]
    //     // console.log(categories)

    //     // data.mark=mark;
    //     // data.move=move;
    //     // data.answer=data.answer
    //     // data.category=category;
    //     // console.log(mark,move,answer,category)
    // },[])
    const handleChange = (event) => {
        // category = event.target.value
        setCategory(event.target.value);
    };
    const handleChangeCheck = (event) => {
        // mark = event.target.checked
        setMark(event.target.checked);
    };
    const handleSubmit = async() => {
        data.mark=mark;
        data.move=move;
        data.answer=answer
        data.category=category;
        data.categories=categories
        console.log(data)
        await setDealdata(data)

        console.log(dealdata)
        console.log(await UpdateCall('entities',null,data))
        // console.log(mark, move, answer, category, addCategory)

    }
    const handleAdd = (event) => {
        let temp = categories
        // temp.push(addCategory)
        setCategories(categories =>[...categories,addCategory])
        // setAddCategory('hi')
        // categories.push(addCategory)
        console.log(categories)
        // console.log(data)
        // console.log(dealdata)
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
                    <TextField
                        id=""
                        select
                        label="Select"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        helperText="How the answer is recieved"
                    >
                        {answers.map((option) => (
                            <MenuItem key={option.value} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <div>
                        <TextField
                            id="Categories"
                            select
                            label="Select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            helperText=""
                        >
                            {categories.map((option) => {
                                console.log(option)

                                return(
                                <MenuItem key={option.value} value={option}>
                                    {option}
                                </MenuItem>
                            )})}
                        </TextField>
                        <TextField id="AddCategory" label="Outlined" variant="outlined" onChange={(e) => setAddCategory(e.target.value)} />
                        <Button color="primary" variant="contained" onClick={(e) => handleAdd(e)} >Add</Button>


                    </div>
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
                    <Link to={{ pathname: '/deals',data:propdata }}><Button color="primary" variant="contained" onClick={handleSubmit} >Submit</Button></Link>
                    <Link to={{ pathname: '/deals',data:propdata }}><Button color="primary" variant="contained">Cancel</Button></Link>
                </form>
            </Container>
        )

    }
    else
        return null
}
