import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { red, yellow, green } from '@material-ui/core/colors';
import {Box} from "@material-ui/core";
import FirmItem from "./FirmItem";
import BookingFormLocation from "./BookingFormLocation";
import axios from "axios";
import BookingChooseSeat from "./BookingChooseSeat";
import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";
import Snackbar from "./Snackbar/Snackbar";


const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.primary.main,
        padding: "70px 150px",
        width: '100%',
        "& .MuiStepper-root":{
            backgroundColor: theme.palette.background.default,
        },
        "& .MuiStepLabel-label":{
            color: theme.palette.primary.main,
        },
        "& .MuiStepIcon-root":{
            color: red[300],
            "&.MuiStepIcon-active":{
                color: yellow[400],
            },
            "&.MuiStepIcon-completed":{
                color: green[200],
            }
        }
    },
    booking:{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    bookingFormPlace:{
        // minHeight: 400,
        paddingBottom: 50,
        transition: "all 0.3s ease-in"
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    multilineColor:{
        color:'white'
    },
    bookingFormRoom:{
        paddingTop: 30,
        paddingLeft: 20,
        width: 400,
        "& .MuiButton-root":{
            marginRight: 10,
            marginBottom: 10,
        },
        "& .MuiButton-label":{
            // textTransform: "none",
        }
    },
    headerRoom: {
        color: red[800],
        marginTop: 5,
        marginBottom: 15,
        paddingBottom: 5,
        borderBottom: "2px solid white",
        width: "50%",
    },
    bookingFormFirm:{
        // width: 300,
        // backgroundColor: "white",
    },
    btnLogOut:{
        cursor: "pointer",
        paddingLeft: 15,
        paddingRight: 15,
        "&:hover":{
            backgroundColor: "#cacaca",
        }
    }
}));

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(red[700]),
        backgroundColor: red[700],
        '&:hover': {
            backgroundColor: red[900],
        },
    },
}))(Button);

function getSteps() {
    return [
        'Choose Location and Date',
        'Choose Time',
        'Choose Seat',
        'Payment'
    ];
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return 'Choose province, cinema and the day you want to go';
        case 1:
            return 'Choose the time in the room you want to watch in';
        case 2:
            return 'Choose seats you want to sit in';
        case 3:
            return 'You must pay to get the ticket';
        default:
            return 'Unknown stepIndex';
    }
}

const BookingRoom=(props)=>{
    const classes = useStyles();
    const [showTimeRoom, setShowTimeRoom] = React.useState([]);
    const {
        cinema_id,
        booking_time,
        movie_id,
        handleShowTimeClick,
        activeShowTime
    }= props;

    // console.log("booking room render", cinema_id, booking_time, movie_id);

    async function fetchShowTimeRoom(cinemaId) {
        let response = await axios(
            `http://localhost/Cinema/PublicController/GetShowTime/
            ${cinema_id}/
            ${movie_id}/
            ${booking_time}
            `
        );
        let res = await response.data;
        setShowTimeRoom(res["data"]);
    }



    React.useEffect(() => {
        fetchShowTimeRoom();
    },[]);

    let group =
        showTimeRoom ?
            showTimeRoom.reduce((r, a) => {
                r[a.room_name] = [...r[a.room_name] || [], a];
                return r;
            }, {}) : [];

    let size = Object.values(group).length;
    console.log(group, "this is groups");

    let room=[];
        Object.entries(group).forEach(([key, value]) =>{
            room.push(
            <Box key={key}>
                <Typography variant="h4" className={classes.headerRoom}>
                    {key}
                </Typography>
                {
                    value.map(
                        (item, index)=>(
                            <Button
                                color={
                                    activeShowTime===item.show_time_id ?
                                        "secondary" : "default"
                                }
                                variant="contained" key={index}
                                onClick={()=>handleShowTimeClick(item.show_time_id)}
                            >
                                {item.show_time_date.slice(-8,-3)}
                            </Button>
                        )
                    )
                }
            </Box>
            )
        }
        )
    return(
        <Box className={classes.bookingFormRoom}>
            {
                size===0? "Have no Show Time" : room
            }
        </Box>
    )
}

export default function HorizontalLabelPositionBelowStepper(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [color, setColor] = React.useState("danger");
    const [status, setStatus] = React.useState("");
    const [activeStep, setActiveStep] = React.useState(0);
    const [province, setProvince] = React.useState("");
    const [provinces, setProvinces] = React.useState([]);
    const [cinema, setCinema] = React.useState("");
    const [cinemas, setCinemas] = React.useState([]);
    const [showTimeId, setShowTimeId] = React.useState(0);
    const [cookies, setCookie] = useCookies(['name']);
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
    const steps = getSteps();

    const {
        movieId,
        handleLogout
    } = props;

    if(open===true){
        setTimeout(function() {
            if (open===true){
                setOpen(false);
            }
        }, 6000);
    }

    const handleShowTimeClick = (show_time_id)=>{
        setShowTimeId(show_time_id);
    }

    console.log("stepper render");
    console.log(activeStep, "this is active step");

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

    React.useEffect(
        ()=>{
            setActiveStep(0);
        },[province,cinema,bookingtime]
    )

    const onItemClickLocation = (proviceId)=>{
        setProvince(proviceId);
        fetchCinema(proviceId);
    }

    const onItemClickCinema = (cinemaId)=>{
        setCinema(cinemaId);
    }

    const onItemClickTime = (NewBookingTime)=>{
        setBookingTime(NewBookingTime);
    }

    const handleNext = () => {
        if(activeStep===0 && (province===""||cinema==="")){
            setColor("danger");
            setStatus("Please choose province and cinema to continue");
            setOpen(true);
            return;
        }
        if(activeStep===1 && showTimeId===0) {
            setColor("danger");
            setStatus("Please choose ShowTime to continue");
            setOpen(true);
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset= ()=>{
        setActiveStep(0);
    };

    // const handleLogout= ()=>{
    //     setCookie('idLogin', false , { path: '/' })
    // }


    return (
        <div className={classes.root}>
            <Snackbar
                place="bl"
                message={status}
                open={open}
                closeNotification={() => setOpen(false)}
                close
                color={color}
            />
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box display="flex" justifyContent="space-between" mr={3} >
                <Typography variant="h2">
                    Choose your tickets

                </Typography>
                {/*account name*/}
                <Box>
                    <Typography
                        // style={{color:""}}
                        variant="h4"
                        color="primary"
                    >
                        Ha Anh Khoa
                    </Typography>
                    <Typography
                        // style={{color:""}}
                        variant="h5"
                        onClick={handleLogout}
                    >
                        <Link to="/"
                            style={{color:"red",textDecoration: "none"}}
                        >Logout</Link>
                    </Typography>
                </Box>
            </Box>
            <Box className={classes.booking}>
                {
                    (activeStep <= 1) ?(<BookingFormLocation
                        provinces={provinces}
                        onItemClickLocation={onItemClickLocation}
                        cinemas={cinemas}
                        onItemClickCinema={onItemClickCinema}
                        bookingTime={bookingtime}
                        onItemClickTime={onItemClickTime}
                    />) : ""
                }
                {
                    (activeStep === 1) ?
                        (
                            // choose room and time
                            <BookingRoom
                                cinema_id={cinema}
                                booking_time={bookingtime}
                                movie_id={movieId}
                                handleShowTimeClick={handleShowTimeClick}
                                activeShowTime={showTimeId}
                            />
                        ) : ""
                }
                {
                    (activeStep ===2)? (
                        <BookingChooseSeat
                            showTimeId={showTimeId}
                        />
                    ) : ""
                }
                {/*Firm item*/}
                <Box className={classes.bookingFormFirm}>
                    <FirmItem
                        movieId={movieId}
                    />
                </Box>
            </Box>
                {/*Stepper*/}
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>All steps completed</Typography>
                            <ColorButton onClick={handleReset}>Reset</ColorButton>
                        </div>
                    ) : (
                        <div>
                            <Typography variant="h4" className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                            <div>
                                <ColorButton
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.backButton}
                                    color="secondary"
                                >
                                    Back
                                </ColorButton>
                                {
                                    (activeStep === steps.length)?
                                        (
                                            <ColorButton variant="contained" disabled color="secondary" onClick={handleNext}>
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                            </ColorButton>
                                        ):
                                        (
                                            <ColorButton variant="contained"  color="secondary" onClick={handleNext}>
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                            </ColorButton>
                                        )
                                }

                            </div>
                        </div>
                    )}
                </div>
        </div>
    );
}