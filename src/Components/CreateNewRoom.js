import React from "react"
import {Box, Button, FormControl, InputLabel, Select, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import FormStyle from "./FormStyle";


const CreateNewRoom = (props)=>{

    const {classes} = props;

    const [status, setStatus] = React.useState("");
    const [provinces, setProvinces] = React.useState([]);
    const [cinemas, setCinemas] = React.useState([]);
    const [data, setData] = React.useState({
        province_id: "",
        cinema_id: "",
        room_type: "",
        seat_number: "",
    });


    async function fetchProvince(){
        let response = await axios(
            `http://localhost/Cinema/PublicController/GetProvince`
        );

        let res = await response.data;

        setProvinces(res.data);
    }

    async function fetchCinema(cinemaId) {
        let response = await axios.post(
            `http://localhost/Cinema/PublicController/GetCinema/${cinemaId}`
        );
        let res = await response.data;

        setCinemas(res["data"]);
    }

    async function fetchData(){
        let dataFetch = new FormData();
        dataFetch.append("province_id", data.province_id);
        dataFetch.append("cinema_id", data.cinema_id);
        dataFetch.append("room_type", data.room_type);
        dataFetch.append("seat_number", data.seat_number);
        let response = await axios.post(
            `http://localhost/Cinema/Admin/CreateNewRoom`, dataFetch
        );
        let res = await response.data;
        setStatus(res.message);
    }

    React.useEffect(
        ()=>{
            fetchProvince();
        },[]
    );

    const handleProvince = (e)=>{
        const newData = {...data};
        newData.province_id = e.target.value;
        // console.log(e.target.value);
        setData(newData);
        fetchCinema(e.target.value);
    }

    const handleCinema = (e)=>{
        const newData = {...data};
        newData.cinema_id = e.target.value;
        setData(newData);
    }

    const handleRoomType = (e)=>{
        const newData = {...data};
        newData.room_type = e.target.value;
        setData(newData);
    }
    const handleSeateNumber = (e)=>{
        const newData = {...data};
        newData.seat_number = e.target.value;
        setData(newData);
    }

    console.log(data);

    return(
        <Box display="flex" flexWrap="wrap">
            <Typography variant="h4" color="error" className={classes.status}>
                {status}
            </Typography>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="provice">Province</InputLabel>
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
                        provinces!==[] ?
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
                <InputLabel htmlFor="cinema">Cinema</InputLabel>
                <Select
                    native
                    value={data.cinema_id}
                    onChange={handleCinema}
                    inputProps={{
                        name: 'cinema',
                        id: 'cinema',
                    }}
                >
                    <option aria-label="None" value="" />
                    {
                        (cinemas!==[] && cinemas!==undefined) ?
                            cinemas.map(
                                (cinemas, index)=>(
                                    <option
                                        value={cinemas.cinema_id}
                                        key={index}
                                    >
                                        {cinemas.cinema_name}

                                    </option>
                                )
                            ) :
                            (<></>)
                    }
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="room">Room Type</InputLabel>
                <Select
                    native
                    value={data.room_type}
                    onChange={handleRoomType}
                    inputProps={{
                        name: 'room_type',
                        id: 'room',
                    }}
                >
                    <option aria-label="None" value="" />
                    <option
                        value={1}
                    >Nomal
                    </option>
                    <option
                        value={2}
                    >Vip
                    </option>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField
                    label="Number of Seat"
                    value={data.seat_number}
                    onChange={handleSeateNumber}
                    className={classes.inputTextField}
                    InputLabelProps={{className: classes.label}}
                    InputProps={{className: classes.input,
                    }}
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

export default withStyles(FormStyle)(CreateNewRoom);