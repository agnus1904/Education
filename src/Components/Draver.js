import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';

import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import BookingFormLocation from "./BookingFormLocation"
import axios from "axios";
import {FormControl, TextField} from "@material-ui/core";
import CreateNewMovie from "./CreateNewMovie";
import CreateNewProvince from "./CreateNewProvince";
import CreateNewCinema from "./CreateNewCinema";
import CreateNewRoom from "./CreateNewRoom";
import CreateNewActor from "./CreateNewActor";
import CreateNewShowtime from "./CreateNewShowTime";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: "100%",
        // paddingLeft: 240,
        minHeight: "100vh"
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        color: "black",
        "& .MuiDrawer-paper":{
            position: "relative",
            paddingTop: 60,
            color: "#EEE",
            zIndex: 0,
            backgroundColor: "#333",
        },
        "& .MuiTypography-body1":{
            fontSize: "1rem",
        },

    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: "#333",
        padding: theme.spacing(3),
    },
}));


const Accordion = withStyles({
    root: {
        margin: "auto",
        cursor: "pointer",
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);
const AccordionSummary = withStyles((theme)=>({
    root: {
        backgroundColor: "#333",
        color: "#EEE",
        borderBottom: '1px solid #DDD',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
}))(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        backgroundColor: "#333",
        color: "#EEE",
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'div'}>
                        {children}
                    </Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


export default function PermanentDrawerLeft() {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState('panel1');
    const [province, setProvince] = React.useState("");
    const [provinces, setProvinces] = React.useState([]);
    const [cinema, setCinema] = React.useState("");
    const [cinemas, setCinemas] = React.useState([]);
    const [bookingtime, setBookingTime] = React.useState(
        ()=>{
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();

            today = yyyy + '-' + mm + '-' + dd;
            return today;
        }
    );

    const [bookingHour, setBookingHour] = React.useState();
    //
    // console.log(province,"province");
    // console.log(cinema,"cinema");
    // console.log(bookingtime,"bookingtime");


    async function fetchProvince() {
        let response = await axios.post(
            `http://localhost/Cinema/PublicController/GetProvince`
        );
        let res = await response.data;

        setProvinces(res["data"]);
    }

    async function fetchCinema(cinemaId) {
        let response = await axios.post(
            `http://localhost/Cinema/PublicController/GetCinema/${cinemaId}`
        );
        let res = await response.data;

        setCinemas(res["data"]);
    }

    React.useEffect(() => {
        fetchProvince();
    },[]);

    const onItemClickLocation = (proviceId)=>{
        // console.log(proviceId);
        setProvince(proviceId);
        fetchCinema(proviceId);
    }

    const onItemClickCinema = (cinemaId)=>{
        setCinema(cinemaId);
        // console.log(cinemaId);
        // fetchCinema(cinemaId);
    }

    const onItemClickTime = (NewBookingTime)=>{
        setBookingTime(NewBookingTime);
        // console.log(cinemaId);
        // fetchCinema(cinemaId);
    }

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const [value, setValue] = React.useState(0);

    const handleChangePage = (event, newValue) => {
        setValue(newValue);
    };

    // console.log(cinema, bookingtime);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <List>
                    {/*{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (*/}
                    <ListItem button>
                        <Accordion square expanded={expanded === `panel1`}
                                   onChange={handleChange(`panel1`)}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography>Create New</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Tabs
                                    orientation="vertical"
                                    variant="scrollable"
                                    value={value}
                                    onChange={handleChangePage}
                                    aria-label="Vertical tabs example"
                                    className={classes.tabs}
                                >
                                    <Tab label="New Province" {...a11yProps(0)} />
                                    <Tab label="New Cinema" {...a11yProps(1)} />
                                    <Tab label="New Room" {...a11yProps(2)} />
                                    <Tab label="New Movie" {...a11yProps(3)} />
                                    <Tab label="New Actor" {...a11yProps(4)} />
                                    <Tab label="New Show Time" {...a11yProps(5)} />
                                </Tabs>
                            </AccordionDetails>
                        </Accordion>
                    </ListItem>
                    <ListItem >
                        <Accordion square expanded={expanded === `panel2`}
                                   onChange={handleChange(`panel2`)}>
                            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                                <Typography>Management</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Tabs
                                    orientation="vertical"
                                    variant="scrollable"
                                    value={value}
                                    onChange={handleChangePage}
                                    aria-label="Vertical tabs example"
                                    className={classes.tabs}
                                >
                                    <Tab label="Item Three" {...a11yProps(6)} />
                                    <Tab label="Item For" {...a11yProps(7)} />
                                </Tabs>
                            </AccordionDetails>
                        </Accordion>
                    </ListItem>
                    {/*))}*/}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Box>
                    {/*<React.StrictMode>*/}
                    <TabPanel value={value} index={0}>
                        Create New Province
                        <br/>
                        <CreateNewProvince />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Create New Cinema
                        <br/>
                        <CreateNewCinema />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Create New Room
                        <br/>
                        <CreateNewRoom />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        Create New Movie
                        <br/>
                        <CreateNewMovie />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        Create New Actor
                        <br/>
                        <CreateNewActor />
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        Create New Show Time
                        <br/>
                        <CreateNewShowtime />
                    </TabPanel>
                    {/*</React.StrictMode>*/}
                </Box>
            </main>

        </div>
    );
}