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
        color: "white",
        "& .MuiDrawer-paper":{
            position: "relative",
            paddingTop: 60,
            color: "#EEE",
            zIndex: 0,
            backgroundColor: theme.palette.background.default,
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
        backgroundColor: theme.palette.background.default,
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
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.main,
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
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.main,
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
                    <Typography>{children}</Typography>
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

    console.log(province,"province");
    console.log(cinema,"cinema");
    console.log(bookingtime,"bookingtime");


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
                                    <Tab label="Item One" {...a11yProps(0)} />
                                    <Tab label="Item Two" {...a11yProps(1)} />
                                </Tabs>
                            </AccordionDetails>
                        </Accordion>
                    </ListItem>
                    <ListItem button>
                        <Accordion square expanded={expanded === `panel2`}
                                   onChange={handleChange(`panel2`)}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
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
                                    <Tab label="Item Three" {...a11yProps(2)} />
                                    <Tab label="Item For" {...a11yProps(3)} />
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
                    <TabPanel value={value} index={0}>
                        Item One
                        <BookingFormLocation
                            provinces={provinces}
                            onItemClickLocation={onItemClickLocation}
                            cinemas={cinemas}
                            onItemClickCinema={onItemClickCinema}
                            bookingTime={bookingtime}
                            onItemClickTime={onItemClickTime}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        Item For
                    </TabPanel>
                </Box>
            </main>
        </div>
    );
}