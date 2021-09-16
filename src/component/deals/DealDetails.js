import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { Container } from '@material-ui/core';

export default function DealDetails(props) {
    const [data, setData] = useState(props.location.data[0])
    console.log(props.location.data)
    // let keys=data ? Object.keys(data).filter(
    //     (key) => typeof data[key] !== 'object'
    // ):[]
    let keys = data ? Object.keys(data) : []




    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }));

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    // let keys=Object.keys(data)
    console.log(keys)
    return (
        <Container>
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
        >
            {keys.map(function (key, index) {
                let isObject=typeof data[key] !== 'object'
                    return (
                        <ListItem button>
                    <ListItemText primary ={key} 
                    secondary={isObject ? data[key]:null} />
                </ListItem>

                    )

            })
            }
        </List>
        </Container>
    )
            // DealDetail
    {/* <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.root}
            >
                <ListItem button>
                    <ListItemText primary="Sent mail" />
                </ListItem>
                <ListItem button onClick={handleClick}>
                    <ListItemText primary="Inbox" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemText primary="Starred" />
                        </ListItem>
                    </List>
                </Collapse>
            </List> */}
    {/* </div> */ }
    // )
}
