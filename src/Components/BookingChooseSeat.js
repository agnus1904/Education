import React from "react"
import {makeStyles} from "@material-ui/core/styles";
import {Box, Typography} from "@material-ui/core";
import axios from "axios";
import Snackbar from "./Snackbar/Snackbar";


const useStyle= makeStyles(theme=>({
    root: {
        flex: 1,
        // border: "2px solid red",
        display: "flex",
        flexDirection: "column",
        height: 600,
        paddingTop: 20,
        marginBottom: 50,
        paddingRight: 150,
        paddingLeft: 150,
    },
    screen:{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
    },
    screenTop:{
        backgroundColor: "#333",
        height: 30,
        width: 300,
    },
    screenBottom:{
        clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0 100%)",
        background: "linear-gradient(rgba(255,255,255,1) 25%, rgba(255,255,255,0) 90%)",
        height: 50,
        width: "90%",
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
        width: 350,
        display: "flex",
        justifyContent: "start",
        flexWrap: "wrap",
    },
    lane:{
        width: 50,
        height: 50,
    },
    seat:{
        width: 30,
        height: 30,
        margin: "10px 2px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#666",
        borderRadius: 5,
        cursor: "pointer",
        fontSize: 12,
    },

}));


const BookingChooseSeat = (props)=>{
    const classes = useStyle();
    const [seats, setSeats] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [color, setColor] = React.useState("danger");
    const [status, setStatus] = React.useState("");

    const {
        showTimeId
    } = props

    const fetDataStart = async ()=>{
        let response = await axios(
            `http://localhost/Cinema/PublicController/GetSeatStatus/${showTimeId}`
        );
        let res = await response.data.data;
        setSeats(res);
    }

    React.useEffect(
        ()=>{
            fetDataStart();
        },[]
    );
    if(open===true){
        setTimeout(function() {
            setOpen(false);
        }, 6000);
    }

    let newArr=[];
    for(let b of seats){
        newArr.push(Object.values(b));
    }

    let picking = newArr.map(
        (item)=>{
            if(item[1]==="4"){
                return item[0]
            }
        }
    ).filter(Boolean);


    console.log(picking, "this is picking");

    const handleSeatStatusClick = (seat_status_id,seat_status,index)=>{
        if(seat_status==="1"){
            if(picking.length>4){
                setStatus("Max number of seat can book is 5");
                setOpen(true);
                setColor("danger") ;
                return;
            }
            const newSeats = [...seats];
            newSeats[index].seat_status = "4";
            setSeats(newSeats);
        }
        if(seat_status==="4"){
            const newSeats = [...seats];
            newSeats[index].seat_status = "1";
            setSeats(newSeats);
        }
        if(seat_status==="2"){
            setStatus("This Seat is booking by some one, Please Wait");
            setOpen(true);
            setColor("danger") ;
            return;
        }
        if(seat_status==="3"){
            setStatus("This seat is already booked, Please choose another seat");
            setOpen(true);
            setColor("danger") ;
            return;
        }

    }


    return(
        <Box className={classes.root}>
            <Snackbar
                place="bl"
                message={status}
                open={open}
                closeNotification={() => setOpen(false)}
                close
                color={color}
            />
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
                        {
                            newArr.map(
                                (arrIndex, index)=>(
                                    <React.Fragment
                                        key={index}
                                    >
                                    <Box
                                        className={classes.seat}
                                        style={
                                            arrIndex[1]==="2" || arrIndex[1]=== 2 ?
                                            {backgroundColor:"yellow",color: "black"} :
                                                arrIndex[1]==="3" || arrIndex[1]=== 3 ?
                                                {backgroundColor:"red",color: "black"} :
                                                    arrIndex[1]==="4" || arrIndex[1]=== 4 ?
                                                    {backgroundColor:"blue",color: "white"} :
                                                    {}
                                        }
                                        onClick={()=>handleSeatStatusClick(
                                                        arrIndex[0],
                                                        arrIndex[1],
                                                        index
                                                    )
                                        }
                                    >
                                        {"A"+(index+1)}
                                    </Box>
                                    </React.Fragment>
                                )
                            )
                        }
                </Box>
            </Box>
        </Box>
    )
}

export default BookingChooseSeat;