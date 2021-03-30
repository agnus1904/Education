import React, {useState} from "react";
import {Box, Button, Typography} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import { useCookies } from 'react-cookie';

const useStyles = makeStyles((theme) => ({
    root:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    form: {
        border: "2px solid white",
        padding: "20px 150px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#444",
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    inputTextField:{
        fontSize: "1.3rem",
        minWidth: 250,
        "& .MuiInput-underline":{
            borderBottom: "1px solid white",
            "&::before":{
                borderBottom: "1px solid white"
            },
        },
        "&:hover":{
            "& .MuiInput-underline":{
                borderBottom: "1px solid white",
            },
        }
    }
    ,
    label:{
        fontSize: "1.1rem",
        color: "white",
        "&.Mui-focused":{
            color: "white"
        }
    },
    input:{
        fontSize: "1.1rem",
        color: "white",
        "&.Mui-focused":{
            color: "white"
        }
    },
    register:{
        display: "flex",
        marginTop: 25,
        alignItems: "center",
    }
}));

const Login = (props)=>{
    const classes = useStyles();
    const [user, setUser] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [time, setTime] = React.useState("");
    const [cookies, setCookie] = useCookies(['name']);
    const [error , setError] = React.useState("");
    const data =
        {
            customer_email: user,
            customer_password: password,
        }
    const match = props.match;

    async function fetchData() {
         let response = await axios.post(
            `http://localhost/Cinema/Login/LoginUser/`, JSON.stringify(data)
        );

        let res = await response.data;
        console.log(res);
        if(res.status){
            setCookie('idLogin', res["customer_id"], { path: '/' });
            // console.log(cookies["idLogin"]);
            // props.history.push("/Booking/12")
            if(match!==""){
                props.history.push(`/Booking/${
                    match.params.id ? match.params.id : ""
                }`);
            }else{
                props.history.push(`/`);
            }
            setError("");
        }
        else{
            setError(res.error);
        }
        // console.log(res.error);
    }

    const handleForm= (e)=>{
        e.preventDefault();
        if( e.key === "Enter" || e.target.value==="submit"){
            // console.log("form submited", user, password);
            fetchData();
        }
    }

    const handleChangeUser= (e)=>{
        setUser(e.target.value)
    }

    const handleChangePassword= (e)=>{
        setPassword(e.target.value)
    }

    const handleChangeTime= (e)=>{
        setTime(e.target.value);
        console.log(e.target.value);
    }

    return(
        <Box style={{minHeight: "100vh"}} className={classes.root}>
            <br/><br/><br/><br/><br/>

            <form
                className={classes.form}
                noValidate autoComplete="off"
                onKeyDown={handleForm}
            >
                <Typography variant="h2" color="primary">
                    Login
                </Typography>
                <Typography variant="h5" color="error">
                    {error}
                </Typography>
                <TextField label="Username"
                           value={user}
                           onChange={handleChangeUser}
                           className={classes.inputTextField}
                           InputLabelProps={{className: classes.label}}
                           InputProps={{className: classes.input}}
                />
                <TextField label="Password"
                           value={password}
                           onChange={handleChangePassword}
                           className={classes.inputTextField}
                           InputLabelProps={{className: classes.label}}
                           InputProps={{className: classes.input}}
                />
                <Button type="button"
                        variant="contained"
                        color="primary"
                        value="submit"
                        onClick={handleForm}>submit</Button>
                <Typography className={classes.register}
                            variant="h5" color="primary">
                    Don't have an account
                    <Button type="button"
                       variant="contained"
                       color="primary"
                       value="submit"
                        href="/Register"
                    >Click here</Button>
                </Typography>
            </form>
        </Box>
    );
}

export default Login;
