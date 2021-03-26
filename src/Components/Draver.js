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
                                <Typography>Collapsible Group Item #1</Typography>
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
                                <Typography>Collapsible Group Item #2</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </Typography>
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
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                </Box>
            </main>
        </div>
    );
}