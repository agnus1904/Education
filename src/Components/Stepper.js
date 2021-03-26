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

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.primary.main,
        padding: "80px 150px",
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
    formControl:{
        width: 250,
        marginTop: 35,
        display: "flex",
        flexDirection: "column",
        "& .MuiInputLabel-animated":{
            color: "white",
        },
        "& .MuiFormLabel-root":{
            fontSize: "1.6rem",
            color: red[800],
        },
        "& label + .MuiInput-formControl":{
            marginTop: 30,
        },
        "& .MuiFormLabel-filled":{
            // marginBottom: 10,
        },
        "& .MuiInputBase-root":{
            color: "white",
            fontSize: "1.3rem",
        },
        "& .MuiInput-underline:before":{
            borderBottom: "2px solid #CCC",
        },
        "& .MuiInput-underline:hover":{
            borderBottom: "2px solid #CCC",
        },
        "& .MuiSvgIcon-root": {
            width: "1.2rem",
            height: "1.2rem",
            marginRight: 5,
        },
        "& .MuiSelect-icon":{
            color: "white",
        },
    },
    textField: {
        marginTop: 40,
        width: 250,
        "& .MuiFormLabel-root":{
            color: red[800],
            fontSize: "1.5rem",
        },
        "& label + .MuiInput-formControl":{
            marginTop: 30,
        },
        "& .MuiInputBase-root":{
            color: "black",
            backgroundColor: "white",
            fontSize: "1rem",
        },
        "& .MuiInput-underline:before":{
            borderBottom: "2px solid #CCC",
        },
        "& .MuiInput-underline:hover":{
            borderBottom: "2px solid #CCC",
        },
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

const BookingLocation=(props)=>{
    const classes=useStyles();
    const [location, setLocation] = React.useState("");
    const [cinema, setCinema] = React.useState("");
    const [bookingtime, setBookingTime] = React.useState("2021-03-24");

    const {cinemasHN, cinemasHCM} = props;

    const options = (location==20)?
        cinemasHN.map(
            (cinema, index)=>(
                <option value={cinema.cinema_id} key={index}>{cinema.cinema_name}</option>
            )
        ):
        cinemasHCM.map(
            (cinema, index)=>(
                <option value={cinema.cinema_id} key={index}>{cinema.cinema_name}</option>
            )
        )
    const handleLocation= (e)=>{
        setLocation(e.target.value);
    }
    const handleCinema= (e)=>{
        setCinema(e.target.value);
    }
    const handleBookingTime= (e)=>{
        setBookingTime(e.target.value)
    }

    return(
        <Box className={classes.bookingFormPlace}>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="provice">Province</InputLabel>
                <Select
                    native
                    value={location}
                    onChange={handleLocation}
                    inputProps={{
                        name: 'province',
                        id: 'province',
                    }}
                >
                    <option aria-label="None" value="" />
                    <option value={10}>Ho Chi Minh</option>
                    <option value={20}>Ha Noi</option>
                    <option value={30}>Da Nang</option>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="cinema">Cinema</InputLabel>
                <Select
                    native
                    value={cinema}
                    onChange={handleCinema}
                    inputProps={{
                        name: 'cinema',
                        id: 'cinema',
                    }}
                >
                    <option aria-label="None" value="" />
                    {options}
                </Select>
            </FormControl>
            <TextField
                id="date"
                type="date"
                defaultValue={bookingtime}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    className: classes.multilineColor
                }}
                variant="filled"
                color="primary"
                onChange={handleBookingTime}
            />
        </Box>
    )
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

export default function HorizontalLabelPositionBelowStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const cinemasHCM = [
        {
            cinema_id: 1,
            cinema_name: "Tan Phu"
        },
        {
            cinema_id: 2,
            cinema_name: "Tan Binh"
        },
        {
            cinema_id: 3,
            cinema_name: "Phu Nhuan"
        },
    ];
    const cinemasHN = [
        {
            cinema_id: 4,
            cinema_name: "Cau Giay"
        },
        {
            cinema_id: 5,
            cinema_name: "Dong Da"
        },
        {
            cinema_id: 6,
            cinema_name: "Ho Guom"
        },
    ];

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
                <BookingLocation cinemasHN={cinemasHN} cinemasHCM={cinemasHCM}/>
                {
                    (activeStep === 1) ?
                        (
                            // choose room and time
                            <BookingRoom/>
                        ) : ""
                }
                {/*Firm item*/}
                <Box className={classes.bookingFormFirm}>
                    <FirmItem />
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