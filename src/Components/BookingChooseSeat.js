import React from "react"
import {makeStyles} from "@material-ui/core/styles";
import {Box, Typography} from "@material-ui/core";

const useStyle= makeStyles(theme=>({
    root: {
        flex: 1,
        border: "2px solid red",
        display: "flex",
        flexDirection: "column",
        height: 600,
    },
    screen:{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
    },
    screenTop:{
        // border: "1px solid blue",
        backgroundColor: "#333",
        height: 50,
        width: 540,
    },
    screenBottom:{
        // border: "1px solid blue",
        clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0 100%)",
        backgroundColor: "#555",
        height: 80,
        width: "100%",
        textAlign: "center",
    },
    room:{
        height: "100%",
        border: "2px solid blue",
    }
}));


const BookingChooseSeat = ()=>{
    const classes = useStyle();

    return(
        <Box className={classes.root}>
            <Box className={classes.screen}>
                <Box className={classes.screenTop}>

                </Box>
                <Box className={classes.screenBottom}>
                    <br/>
                    <Typography variant="h2">
                        Screen
                    </Typography>
                </Box>
            </Box>
            <Box className={classes.room}>
                room
            </Box>
        </Box>
    )
}

export default BookingChooseSeat;