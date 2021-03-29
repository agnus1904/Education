import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { red, blue, yellow, green } from '@material-ui/core/colors';
import {Box, FormControl, InputLabel, Select, TextField} from "@material-ui/core";
import FirmItem from "./FirmItem";
import BookingFormLocation from "./BookingFormLocation";
import axios from "axios";

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
        // marginTop: 5,
        // marginBottom: 10,
        // paddingBottom: 5,
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
    return ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return 'Select campaign settings...';
        case 1:
            return 'What is an ad group anyways?';
        case 2:
            return 'This is the bit I really care about!';
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
        movie_id
    }= props;

    console.log("booking room render", cinema_id, booking_time, movie_id);

    async function fetchShowTimeRoom(cinemaId) {
        let response = await axios.post(
            `http://localhost/Cinema/PublicController/GetShowTime/
            ${cinema_id}/
            ${movie_id}/
            ${booking_time}
            `
        );
        let res = await response.data;

        setShowTimeRoom(res["data"]);
    };

    console.log(showTimeRoom);

    React.useEffect(() => {
        fetchShowTimeRoom();
    },[]);
    var roomName="";
    return(
        <Box className={classes.bookingFormRoom}>
            {

                showTimeRoom.map(
                    (room, index)=>
                        (
                            <React.Fragment key={index}>
                                <Button variant="contained">
                                    <Typography variant="h4" className={classes.headerRoom}>
                                        {room.room_name} &nbsp;
                                    </Typography>
                                    {
                                    room.show_time_date.slice(-8,-3)
                                }</Button>
                            </React.Fragment>
                        )
                )
            }
        </Box>
    )
}

export default function HorizontalLabelPositionBelowStepper(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
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
    const steps = getSteps();

    const {
        movieId
    } = props;

    console.log("stepper render");
    console.log(province,"province",
        bookingtime,"bookingtime",
        cinema,"cinema"
        ,movieId, "movie id");


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
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset= ()=>{
        setActiveStep(0);
    };


    return (
        <div className={classes.root}>
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
                        color="error"
                    >
                        Ha Anh Khoa
                    </Typography>
                </Box>
            </Box>
            <Box className={classes.booking}>
                <BookingFormLocation
                    provinces={provinces}
                    onItemClickLocation={onItemClickLocation}
                    cinemas={cinemas}
                    onItemClickCinema={onItemClickCinema}
                    bookingTime={bookingtime}
                    onItemClickTime={onItemClickTime}
                />
                {
                    (activeStep === 1) ?
                        (
                            // choose room and time
                            <BookingRoom
                                cinema_id={cinema}
                                booking_time={bookingtime}
                                movie_id={movieId}
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
                                    (activeStep === steps.length - 1)?
                                        (
                                            <ColorButton variant="contained" disabled color="secondary" onClick={handleNext}>
                                                {activeStep === steps.length - 2 ? 'Finish' : 'Next'}
                                            </ColorButton>
                                        ):
                                        (
                                            <ColorButton variant="contained"  color="secondary" onClick={handleNext}>
                                                {activeStep === steps.length - 2 ? 'Finish' : 'Next'}
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