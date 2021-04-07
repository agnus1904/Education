import React from "react"
import {makeStyles} from "@material-ui/core/styles";
import {Box, Typography} from "@material-ui/core";

const useStyle= makeStyles(theme=>({
    root: {
        flex: 1,
        // border: "2px solid red",
        display: "flex",
        flexDirection: "column",
        height: 600,
        paddingTop: 20,
        marginBottom: 50,
    },
    screen:{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
    },
    screenTop:{
        backgroundColor: "#333",
        height: 50,
        width: 540,
    },
    screenBottom:{
        clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0 100%)",
        background: "linear-gradient(rgba(255,255,255,1) 25%, rgba(255,255,255,0) 90%)",
        height: 80,
        width: "100%",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
    },
    room:{
        height: "100%",
        // border: "2px solid blue",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 120,
        position: "relative",
    },
    door:{
        height: 100,
        position: "absolute",
        top: 20,
        left: 0,
        background: "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 60%)",
        width: 50,
        clipPath: "polygon(0 20%, 45% 0, 45% 100%, 0 78%)",
    },
    table: {
        // border: "2px solid green",
        width: 650,
    },
    row:{
        display: "flex",
        // border: "2px solid yellow",

        flexDirection: "row",
        width: "100%",
        justifyContent:'space-around',
        marginBottom: 15,
    },
    lane:{
        width: 50,
        height: 50,
    },
    seat:{
        width: 50,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#666",
        borderRadius: 10,
        cursor: "pointer",
    },

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
                    <Typography variant="h2" color="secondary">
                        Screen
                    </Typography>
                </Box>
            </Box>
            <Box className={classes.room}>
                <Box className={classes.door}>
                </Box>
                <Box className={classes.table}>
                    <Box className={classes.row}>
                        <Box className={classes.seat}>A1</Box>
                        <Box className={classes.seat}>A2</Box>
                        <Box className={classes.seat}>A3</Box>
                        <Box className={classes.seat}>A4</Box>
                        <Box className={classes.seat}>A5</Box>
                        <Box className={classes.lane} />
                        <Box className={classes.seat}
                             style={{backgroundColor:"red",color: "black"}}
                        >A6</Box>
                        <Box className={classes.seat}
                             style={{backgroundColor:"red",color: "black"}}
                        >A7</Box>
                        <Box className={classes.seat}>A8</Box>
                        <Box className={classes.seat}>A9</Box>
                        <Box className={classes.seat}>A10</Box>
                    </Box>
                    <Box className={classes.row}>
                        <Box className={classes.seat}>A1</Box>
                        <Box className={classes.seat}>A2</Box>
                        <Box className={classes.seat}>A3</Box>
                        <Box className={classes.seat}>A4</Box>
                        <Box className={classes.seat}>A5</Box>
                        <Box className={classes.lane} />
                        <Box className={classes.seat}
                            style={{backgroundColor:"yellow",color: "black"}}
                        >A6</Box>
                        <Box className={classes.seat}>A7</Box>
                        <Box className={classes.seat}>A8</Box>
                        <Box className={classes.seat}>A9</Box>
                        <Box className={classes.seat}>A10</Box>
                    </Box>
                    <Box className={classes.row}>
                        <Box className={classes.seat}>A1</Box>
                        <Box className={classes.seat}>A2</Box>
                        <Box className={classes.seat}>A3</Box>
                        <Box className={classes.seat}>A4</Box>
                        <Box className={classes.seat}>A5</Box>
                        <Box className={classes.lane} />
                        <Box className={classes.seat}>A6</Box>
                        <Box className={classes.seat}>A7</Box>
                        <Box className={classes.seat}>A8</Box>
                        <Box className={classes.seat}>A9</Box>
                        <Box className={classes.seat}>A10</Box>
                    </Box>
                    <Box className={classes.row}>
                        <Box className={classes.seat}>A1</Box>
                        <Box className={classes.seat}>A2</Box>
                        <Box className={classes.seat}>A3</Box>
                        <Box className={classes.seat}>A4</Box>
                        <Box className={classes.seat}>A5</Box>
                        <Box className={classes.lane} />
                        <Box className={classes.seat}>A6</Box>
                        <Box className={classes.seat}>A7</Box>
                        <Box className={classes.seat}>A8</Box>
                        <Box className={classes.seat}>A9</Box>
                        <Box className={classes.seat}>A10</Box>
                    </Box>
                    <Box className={classes.row}>
                        <Box className={classes.seat}>A1</Box>
                        <Box className={classes.seat}>A2</Box>
                        <Box className={classes.seat}>A3</Box>
                        <Box className={classes.seat}>A4</Box>
                        <Box className={classes.seat}>A5</Box>
                        <Box className={classes.lane} />
                        <Box className={classes.seat}>A6</Box>
                        <Box className={classes.seat}>A7</Box>
                        <Box className={classes.seat}>A8</Box>
                        <Box className={classes.seat}>A9</Box>
                        <Box className={classes.seat}>A10</Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default BookingChooseSeat;