import React from "react";
import {Box} from "@material-ui/core";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import CreateNewProvince from "../Components/CreateNewProvince";
import CreateNewCinema from "../Components/CreateNewCinema";
import CreateNewRoom from "../Components/CreateNewRoom";
import CreateNewMovie from "../Components/CreateNewMovie";
import CreateNewActor from "../Components/CreateNewActor";
import CreateNewShowtime from "../Components/CreateNewShowTime";


const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor: "#333",
        position: "relative",
        minHeight: 1000,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: theme.palette.primary.main,
    },
    left:{
        position:"absolute",
        top: 0,
        left: 0,
        height: "100%",
        paddingTop: 100,
        width: 250,
        zIndex: 10,
    },
    right:{
        position:"absolute",
        top:0,
        right: 0,
        width:"100%",
        height:"100%",
        paddingTop: 100,
        paddingLeft: 250,
    },
    content :{
        padding: "0 30px",
    },
    item: {
        padding:"10px 20px",
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
        display:"flex",
        justifyContent: "center",
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
}))(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        backgroundColor: "#333",
        display: "flex",
        alignItems:"center",
        flexDirection: "column",
        color: "#EEE",
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

const Admin = ()=>{

    const classes = useStyles();

    const [expanded, setExpanded] = React.useState('panel1');
    const [contentPage, setContentPage] = React.useState(0);


    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleContent =(value)=>{
        setContentPage(value);
    };

    return(
        <Box className={classes.root}>
            <Box className={classes.left}>
                <Accordion square expanded={expanded === `panel1`}
                           onChange={handleChange(`panel1`)}
                >
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography variant={"h3"}>Create New</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={classes.item} variant={"h5"}
                            onClick={()=>handleContent(1)}
                        >
                            New Province</Typography>
                        <Typography className={classes.item} variant={"h5"}
                            onClick={()=>handleContent(2)}
                        >
                            New Cinema</Typography>
                        <Typography className={classes.item} variant={"h5"}
                            onClick={()=>handleContent(3)}
                        >
                            New Room</Typography>
                        <Typography className={classes.item} variant={"h5"}
                            onClick={()=>handleContent(4)}
                        >
                            New Movie</Typography>
                        <Typography className={classes.item} variant={"h5"}
                            onClick={()=>handleContent(5)}
                        >
                            New Actor</Typography>
                        <Typography className={classes.item} variant={"h5"}
                            onClick={()=>handleContent(6)}
                        >
                            New Show Time</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion square expanded={expanded === `panel2`}
                           onChange={handleChange(`panel2`)}
                >
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography variant={"h3"}>Management</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={classes.item} variant={"h5"}>
                            Movie</Typography>
                        <Typography className={classes.item} variant={"h5"}>
                            Actor</Typography>
                        <Typography className={classes.item} variant={"h5"}>
                            Ticket</Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
            <Box className={classes.right}>
                <Box className={classes.content}>
                    {
                        contentPage===1? <CreateNewProvince/> :
                        contentPage===2? <CreateNewCinema /> :
                        contentPage===3? <CreateNewRoom /> :
                        contentPage===4? <CreateNewMovie /> :
                        contentPage===5? <CreateNewActor /> :
                        contentPage===6? <CreateNewShowtime /> :
                            <></>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default Admin;