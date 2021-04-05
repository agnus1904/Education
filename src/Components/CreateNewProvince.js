import React from "react"
import {Box, Button, FormControl, TextField, Typography} from "@material-ui/core";
import {red} from "@material-ui/core/colors";
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import FormStyle from "./FormStyle";


const CreateNewProvince = (props)=>{

    const {classes} = props;

    const [data , setData] = React.useState({
        province_name: ""
    });
    const [status, setStatus] = React.useState(null);

    async function fetchData() {
        let dataFetch = new FormData();
        dataFetch.append("province_name", data.province_name);
        let response = await axios.post(
            `http://localhost/Cinema/Admin/CreateNewProvince`, dataFetch
        );

        let res = await response.data;
        setStatus(res.message);
        // console.log(res);
    }

    const handleProvince = (e)=>{
        const newData = {...data};
        newData.province_name = e.target.value;
        setData(newData);
    }

    return(
        <Box display="flex" flexWrap="wrap">
            <Typography variant="h4" color="error" className={classes.status}>
                {status}
            </Typography>
            <FormControl className={classes.formControl}>
                <TextField
                    label="Province Name"
                    value={data.province_name}
                    onChange={handleProvince}
                    className={classes.inputTextField}
                    InputLabelProps={{className: classes.label}}
                    InputProps={{className: classes.input}}
                />
            </FormControl>
            <Box className={classes.submitBox}>
                <Button type="button"
                        variant="contained"
                        value="submit"
                        onClick={fetchData}
                        className={classes.submit}
                >Submit</Button>
            </Box>
    </Box>
    )
}

export default withStyles(FormStyle)(CreateNewProvince);