import {makeStyles} from "@material-ui/core/styles";

const FormStyle = {
    formControl:{
        width: 350,
        marginTop: 35,
        paddingBottom: 30,
        padding: 5,
        display: "flex",
        flexDirection: "column",
        "& .MuiTextField-root":{
            width: "100%",
        },
        "& .MuiInputLabel-formControl":{
            top: "auto",
        },
        "& .MuiInputLabel-animated":{
            color: "white",
        },
        "& .MuiFormLabel-root":{
            fontSize: "1.6rem",
            color: "white",
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
            width: "100%",
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
    inputImage:{
        width: "100%",
        height: 60,
    },
    inputTime:{
        color: "black",
    },
    status:{
        width: "100%",
    },
    submitBox:{
        width: "100%",
        marginTop: 20,
        display: "flex",
        justifyContent: "center",
    },
    submit:{
        height: 50,
        width: 200,
        // backgroundColor: red[900],
    }
}

export default FormStyle;
