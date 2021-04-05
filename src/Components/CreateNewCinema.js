import React from "react"
import {Box, Button, FormControl, InputLabel, Select, TextField, Typography} from "@material-ui/core";
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import FormStyle from "./FormStyle";


const CreateNewCinema = (props)=>{

    const {classes} = props;

    const [data , setData] = React.useState({
        cinema_name: "",
        province: "",
    });
    const [provinces, setProvinces] = React.useState(null);

    const [status, setStatus] = React.useState(null);

    async function fetchData() {
        let datafetch = new FormData();
        datafetch.append("province_id", data.province);
        datafetch.append("cinema_name", data.cinema_name);
        let response = await axios.post(
            `http://localhost/Cinema/Admin/CreateNewCinema`, datafetch
        );

        let res = await response.data;
        setStatus(res.message);
    }

    async function fetchProvince(){
        let response = await axios(
            `http://localhost/Cinema/PublicController/GetProvince`
        );

        let res = await response.data;

        setProvinces(res.data);
    }

    React.useEffect(
        ()=>{
            fetchProvince();
        },[]
    );

    const handleProvince = (e)=>{
        const newData = {...data};
        newData.province = e.target.value;
        setData(newData);
    }

    const handleCinema = (e)=>{
        const newData = {...data};
        newData.cinema_name = e.target.value;
        setData(newData);
    }

    return(
        <Box display="flex" flexWrap="wrap">
            <Typography variant="h4" color="error" className={classes.status}>
                {status}
            </Typography>
            <FormControl className={classes.formControl} >
                <InputLabel htmlFor="province">Province</InputLabel>
                <Select
                    native
                    value={data.province}
                    onChange={handleProvince}
                    inputProps={{
                        name: 'province',
                        id: 'province',
                    }}
                >
                    <option aria-label="None" value="" />
                    {
                        provinces!==null ?
                            provinces.map(
                                (province,index)=>(
                                    <option
                                        value={province.province_id}
                                        key={index}
                                    >
                                        {province.province_name}

                                    </option>
                                )
                            ) :
                            (<></>)
                    }
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                    <TextField
                        label="Cinema Name"
                        value={data.cinema_name}
                        onChange={handleCinema}
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

export default withStyles(FormStyle)(CreateNewCinema);