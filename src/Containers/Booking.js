import React from "react";
import {Box} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useCookies } from 'react-cookie';
import axios from "axios";
import Stepper from "../Components/Stepper";

const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    bottom:{
        height: 500,
        color: theme.palette.primary.main,
    }
}));

const Booking = (props)=> {

    const [cookies, setCookie] = useCookies(['name']);
    const [login, setLogin] = React.useState(0);

    const classes = useStyles();

    const handleLogOut= ()=>{
        setCookie('idLogin', false, { path: '/' });
        props.history.push("/Login");
    }

    async function fetchData() {

        if(cookies["idLogin"] || cookies["idLogin"]!==""){
            let response = await axios.post(
                `http://localhost/Cinema/Login/CheckLogIn/`, JSON.stringify(
                    {
                        id_log_in: cookies["idLogin"]
                    }
                )
            );
            let res = response.data;

            // console.log(res);
            if(!res[1]["login-status"]) {
                props.history.push(`/Login/${
                    props.match.params.id ? props.match.params.id : ""
                }`);
            }else{
                setLogin(1);
            }
        }else{
            props.history.push(`/Login/${
                props.match.params.id ? props.match.params.id : ""
            }`);
        }
    }

    React.useEffect(() => {
        fetchData();
    },[]);

    if(login===0){
        return(
            <Box className={classes.root} />
        )
    }else{
        if(props.match.params.id){
            return(
                <Box className={classes.root}>
                    <Stepper movieId={
                        props.match.params.id ? props.match.params.id : 0
                    }
                        handleLogout={handleLogOut}
                    />
                </Box>
            )
        }else{
            props.history.push("/Movies/booking");
            return 0;
        }
    }
}

export default Booking;




