import React, { useState, useEffect, useRef } from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { QueryCall, UpdateCall } from '../../Helper/OpenFlowCalls'
import { Link,Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
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
export default function ActivitiesEdit(props) {
    let history = useHistory();

    let cat
    let data = props.location.data[0]
    const [propdata, setPropData] = useState(props.location.data[1])
    const [categoriesdata, setCategoriesData] = useState(props.location.data[1])
    console.log(propdata)
    const History=useHistory()
    console.log(data)
    console.log(props.location)
    const classes = useStyles();
    const [Activitiesdata, setActivitiesdata] = useState()
    const [status, setstatus] = useState(data ?data._status ? data._status : null :null)
    const [category, setCategory] = useState(data ? data._category ? data._category : null:null)
    let statuss = ['Colleague', 'responsible', 'no answer', 'answering machine']
    let [addCategory, setAddCategory] = useState()
    // let [categories, setCategories]= useState(data ?data.categories?data.categories:[] :[])
    let [categories, setCategories]= useState()
    const handleSubmit = async() => {
        console.log(categoriesdata)
        data._status=status
        data._category=category;
        // data.categories=categories
        console.log(data)
        setActivitiesdata(data)

        setCategoriesData(categoriesdata=>categoriesdata._categories=categories)

        console.log(Activitiesdata)
        console.log(categoriesdata)
        console.log(await UpdateCall('entities',null,data))
        console.log(await UpdateCall('entities',null,categoriesdata))
         history.push({ 
            pathname: '/activities',
            data:propdata
           });
       
        // return <Redirect to={ {pathname: '/activities',data:propdata}}/>
        // console.log(mark, move, status, category, addCategory)

    }
    const handleAdd = async (event) => {
        if(addCategory.length>0)
        {
            console.log(categoriesdata)

            let temp = categories
            console.log(temp)
            temp.push(addCategory)
            console.log(temp)
            setCategories([...new Set(temp)])
            console.log(categories)
            setAddCategory("")

        }
    
    }
    const getCategories=async ()=>{
        let temp=await QueryCall('entities',{"_type":"categories"})
        console.log(temp[0]._categories)
        setCategories(temp[0]._categories)
        setCategoriesData(temp[0])
        console.log(temp)
        console.log(categoriesdata)

    }
    useEffect(()=>{
       getCategories() 
       console.log("hi")

    },[])
    // useEffect(()=>{
    //     console.log(categories)

    // },[categories])
    if (data && categories) {
        return (

            <Container>
                <form className={classes.field} noValidate autoComplete="off" onSubmit={handleSubmit} >
                    <TextField
                        id=""
                        select
                        label="Select"
                        value={status}
                        onChange={(e) => setstatus(e.target.value)}
                        helperText="How the status is recieved"
                    >
                        {statuss.map((option) => (
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
                        <TextField id="AddCategory" label="Outlined" variant="outlined" value={addCategory} onChange={(e) => setAddCategory(e.target.value)} />
                        <Button color="primary" variant="contained" onClick={(e) => handleAdd(e)} >Add</Button>


                    </div>
                    {/* <Link to={{ pathname: '/Activitiess' }}><Button color="primary" variant="contained" onClick={handleSubmit} >Submit</Button></Link> */}
                    {/* <Link to={{ pathname: '/activities',data:propdata }}><Button color="primary" variant="contained" onClick={handleSubmit} >Submit</Button></Link> */}
                    {/* <Redirect to={{ pathname: '/activities',data:propdata }}><Button color="primary" variant="contained" onClick={handleSubmit} >Submit</Button></Redirect> */}
                    <Button color="primary" variant="contained" lablel="Submit" onClick={handleSubmit} >Submit</Button>
                    <Link to={{ pathname: '/activities',data:propdata }}><Button color="primary" variant="contained">Cancel</Button></Link>
                </form>
            </Container>
        )

    }
    else
        return null
}
