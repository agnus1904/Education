import React from "react";
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Draver from "../Components/Draver";


const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: theme.palette.primary.main,
    },
}));

const Admin = ()=>{

    const classes = useStyles();

    return(
        <Box className={classes.root}>
            <Draver />
        </Box>
    )
}

export default Admin;