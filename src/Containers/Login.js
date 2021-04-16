import React, {useState} from "react";
import {Box, Button, Typography} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import { useCookies } from 'react-cookie';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from "../Components/Snackbar/Snackbar";

const useStyles = makeStyles((theme) => ({
    root:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('http://localhost/Cinema/Public/Imgs/login.jpeg')",
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
    const [cookies, setCookie] = useCookies(['name']);
    const [open, setOpen] = React.useState(false);
    const [color, setColor] = React.useState("danger");
    const [status, setStatus] = React.useState("");
    const [error , setError] = React.useState("");
    const data =
        {
            customer_email: user,
            customer_password: password,
        }
    const match = props.match;


    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    async function fetchData() {
         let response = await axios.post(
            `http://localhost/Cinema/Login/LoginUser/`, JSON.stringify(data)
        );

        let res = await response.data;
        console.log(res);
        if(res.status){
            setCookie('idLogin', res["customer_id"], { path: '/' });
            setOpen(true);
            setColor("success");
            setStatus("Login Success");
            setTimeout(function () {
                if(match!==""){
                    props.history.push(`/Booking/${
                        match.params.id ? match.params.id : ""
                    }`);
                }else{
                    props.history.push(`/`);
                }
            }, 3000);

            setError("");
        }
        else{
            setColor("danger");
            setStatus(res.error);
            setOpen(true);
            setError(res.error);
        }
        // console.log(res.error);
    }

    const handleForm= (e)=>{
        if( e.key === "Enter"){
            e.preventDefault();
            fetchData();
            // console.log(e.target.value);
            // e.target.value="";
            // console.log("form submited", user, password);
        }
    }

    const handleFormSubmit= ()=>{
        fetchData();
    }

    const handleChangeUser= (e)=>{
        setUser(e.target.value)
    }

    const handleChangePassword= (e)=>{
        setPassword(e.target.value)
    }

    return(
        <Box style={{minHeight: "100vh"}} className={classes.root}>
            <br/><br/><br/><br/><br/>
            <Snackbar
                place="bl"
                message={status}
                open={open}
                closeNotification={() => setOpen(false)}
                close
                color={color}
            />
            <form
                className={classes.form}
                noValidate autoComplete="off"
                onKeyDown={handleForm}
            >
                <Typography variant="h2" color="primary">
                    Login
                </Typography>
                <Typography variant="h5" color="error">
                    {/*{error}*/}
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
                           type="password"
                           onChange={handleChangePassword}
                           className={classes.inputTextField}
                           InputLabelProps={{className: classes.label}}
                           InputProps={{className: classes.input}}
                />
                <Button type="button"
                        variant="contained"
                        color="primary"
                        value="submit"
                        onClick={handleFormSubmit}
                >submit</Button>
                <Typography className={classes.register}
                            variant="h5" color="primary">
                    Don't have an account &nbsp;&nbsp;
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
