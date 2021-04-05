import React from "react"
import {Box, Button, FormControl, TextField, Typography} from "@material-ui/core";
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import FormStyle from "./FormStyle";

const CreateNewActor = (props)=>{

    const {classes} = props;

    return(
        <Box display="flex" flexWrap="wrap">
            <FormControl className={classes.formControl}>
                <TextField
                    label="Language"
                    // value={data.language}
                    // onChange={handleLanguage}
                    className={classes.inputTextField}
                    InputLabelProps={{className: classes.label}}
                    InputProps={{className: classes.input}}
                />
            </FormControl>
        </Box>
    )
}

export default withStyles(FormStyle)(CreateNewActor);