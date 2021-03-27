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
        width: 350,
        "& .MuiButton-root":{
            marginRight: 5,
            marginBottom: 8,
        }
    },
    headerRoom: {
        color: red[800],
        borderBottom: "2px solid white",
        marginTop: 5,
        marginBottom: 10,
        width: 100,
        paddingBottom: 5,
    },
    bookingFormFirm:{
        width: 300,
        // backgroundColor: "white",
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

const BookingRoom=()=>{
    const classes = useStyles();
    return(
        <Box className={classes.bookingFormRoom}>
            <Typography variant="h4" className={classes.headerRoom}>
                Room1
            </Typography>
            <Box>
                <Button variant="contained">06:30</Button>
                <Button variant="contained">12:00</Button>
                <Button variant="contained">16:30</Button>
                <Button variant="contained">19:30</Button>
            </Box>
            <Typography variant="h4" className={classes.headerRoom}>
                Room2
            </Typography>
            <Box>
                <Button variant="contained">06:30</Button>
                <Button variant="contained">12:00</Button>
                <Button variant="contained">16:30</Button>
            </Box>
            <Typography variant="h4" className={classes.headerRoom}>
                Room3
            </Typography>
            <Box>
                <Button variant="contained">06:30</Button>
                <Button variant="contained">12:00</Button>
                <Button variant="contained">16:30</Button>
                <Button variant="contained">19:30</Button>
                <Button variant="contained">22:00</Button>
            </Box>
        </Box>
    )
}

export default function HorizontalLabelPositionBelowStepper(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [movie, setMovie] = React.useState({});
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

    const {movieId} = props;

    console.log(province,"province");
    console.log(cinema,"cinema");
    console.log(bookingtime,"bookingtime");


    async function fetchProvince() {
        let response = await axios.post(
            `http://localhost/Cinema/PublicController/GetProvince`
        );
        let res = await response.data;

        let responseMovie = await axios.post(
            `http://localhost/Cinema/Movie/GetMovieItem/${movieId}`
        );
        let resMovie = await responseMovie.data;
        setMovie(resMovie["data"]);

        setProvinces(res["data"]);
    }
    console.log(movie);

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
            <Typography variant="h2">
                Choose your tickets
            </Typography>
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
                            <BookingRoom/>
                        ) : ""
                }
                {/*Firm item*/}
                <Box className={classes.bookingFormFirm}>
                    {
                        movieId===0 ? (
                                <FirmItem />
                            ):
                            (
                                <FirmItem
                                    id={movie.movie_id}
                                    itemUrl={movie.avatar_url}
                                    itemName={movie.movie_name}
                                    showTime={movie.release_date}
                                    maining={movie.main_type}
                                    liked={movie.liked}
                                    // onItemClick={handleOnItemOpeningClick}
                                />
                            )
                    }

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