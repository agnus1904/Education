import React from "react";
import Box from "@material-ui/core/Box";
import {FormControl, InputLabel, Select, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";

const useStyles= makeStyles(theme=>({
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
}))

const BookingFormLocation =(props)=>{
    const classes= useStyles();
    const [location, setLocation] = React.useState("");
    const [cinema, setCinema] = React.useState("");
    const [bookingtime, setBookingtime] = React.useState("");

    const {
        onItemClickLocation,
        onItemClickCinema,
        onItemClickTime,
        provinces,
        cinemas,
        bookingTime,
    } = props;

    const handleLocation= (e)=>{
        setLocation(e.target.value);
        onItemClickLocation(e.target.value);
    }
    const handleCinema= (e)=>{
        setCinema(e.target.value);
        onItemClickCinema(e.target.value);
    }
    const handleBookingTime= (e)=>{
        setBookingtime(e.target.value);
        onItemClickTime(e.target.value);
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
                    <option aria-label="None" value="0" />
                    {
                        provinces!==[] ?
                            provinces.map(
                                (province,index)=>(
                                    <option
                                        value={province.province_id}
                                        key={index}
                                    >
                                        {province.province_name}

                                    </option>
                                )
                            ) :
                            (<></>)
                    }
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
                    <option aria-label="None" value="0" />
                    {
                        cinemas!==[] ?
                            cinemas.map(
                                (cinema,index)=>(
                                    <option
                                        value={cinema.cinema_id}
                                        key={index}
                                    >{cinema.cinema_name}
                                    </option>
                                )
                            )
                            : (<></>)
                    }
                </Select>
            </FormControl>
            <Box display="flex" flexDirection="column">
                <TextField
                    id="date"
                    type="date"
                    defaultValue={bookingTime}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        className: classes.multilineColor,
                        inputProps: { min: "2021-03-27" }
                    }}
                    variant="filled"
                    color="primary"
                    onChange={handleBookingTime}
                />
                {/*<TextField*/}
                {/*    id="time"*/}
                {/*    type="time"*/}
                {/*    defaultValue="07:30"*/}
                {/*    className={classes.textField}*/}
                {/*    variant="filled"*/}
                {/*    color="primary"*/}
                {/*    InputLabelProps={{*/}
                {/*        shrink: true,*/}
                {/*    }}*/}
                {/*    InputProps={{*/}
                {/*        className: classes.multilineColor,*/}
                {/*    }}*/}
                {/*    inputProps={{*/}
                {/*        step: 300, // 5 min*/}
                {/*    }}*/}
                {/*/>*/}
            </Box>
        </Box>
    )
}

export default BookingFormLocation