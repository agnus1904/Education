import React from "react"
import {Box, Button, FormControl, TextField, Typography} from "@material-ui/core";
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import FormStyle from "./FormStyle";

const CreateNewMovie = (props)=>{
    const {classes} = props;

    const [status, setStatus] = React.useState("");
    const [data, setData] = React.useState({
        movie_name: "",
        movie_name_banner: "",
        description: "",
        avatar: "",
        banner: "",
        release: "",
        language: "",
        main_type: "",
        country: "",
        duration: "",
    });

    function getToday(){
        let today =new Date();
        let dd =String(today.getDate()).padStart(2, '0');
        let mm =String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy =today.getFullYear();

        today =yyyy + '-' + mm + '-' + dd;
        return today;
    };

    React.useEffect(
        ()=>{
            let newData = {...data};
            newData.release = getToday();
            setData(newData);
        }, []
    )

    async function fetchData() {
        let dataFetch = new FormData();
        dataFetch.append("", data);
        dataFetch.append("", data);
        dataFetch.append("", data);
        dataFetch.append("", data);
        dataFetch.append("", data);
        dataFetch.append("", data);
        dataFetch.append("", data);
        dataFetch.append("", data);
        dataFetch.append("", data);
        dataFetch.append("", data);
        let response = await axios.post(
            `http://localhost/Cinema/Admin/CreateNewMovie`, fetchData
        );

        let res = await response.data;
        console.log(res);
    }

    const handleMovieName = (e)=>{
        const newData = {...data};
        newData.movie_name= e.target.value;
        setData(newData);
    }
    const handleMovieNameBanner = (e)=>{
        const newData = {...data};
        newData.movie_name_banner= e.target.value;
        setData(newData);
    }
    const handleMovieDescription = (e)=>{
        const newData = {...data};
        newData.description= e.target.value;
        setData(newData);
    }

    const handleAvatarSmall = (e)=>{
        const newData = {...data}
        newData.avatar = e.target.files[0];
         // = URL.createObjectURL(img);
        setData(newData);
    }
    const handleBanner = (e)=>{
        const newData = {...data}
        newData.banner = e.target.files[0];
        // = URL.createObjectURL(img);
        setData(newData);
    }
    const handleLanguage = (e)=>{
        const newData = {...data};
        newData.language= e.target.value;
        setData(newData);
    }

    const handleMainType = (e)=>{
        const newData = {...data};
        newData.main_type= e.target.value;
        setData(newData);
    }

    const handleCountry = (e)=>{
        const newData = {...data};
        newData.country= e.target.value;
        setData(newData);
    }

    const handleDuration = (e)=>{
        const newData = {...data};
        newData.duration= e.target.value;
        setData(newData);
    }

    const handleRelease = (e)=>{
        const newData = {...data};
        newData.release = e.target.value;
        setData(newData);
    }

    console.log(data);

    return(
        <Box display="flex" flexWrap="wrap">
            <Typography variant="h4" color="error" className={classes.status}>
                {status}
            </Typography>
            <FormControl className={classes.formControl} >
                <TextField
                    label="Movie Name"
                    value={data.movie_name}
                    onChange={handleMovieName}
                    className={classes.inputTextField}
                    InputLabelProps={{className: classes.label}}
                    InputProps={{className: classes.input}}
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField
                    label="Movie Name Banner"
                    value={data.movie_name_banner}
                    onChange={handleMovieNameBanner}
                    className={classes.inputTextField}
                    InputLabelProps={{className: classes.label}}
                    InputProps={{className: classes.input}}
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField
                    label="Language"
                    value={data.language}
                    onChange={handleLanguage}
                    className={classes.inputTextField}
                    InputLabelProps={{className: classes.label}}
                    InputProps={{className: classes.input}}
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <Typography variant="h4" className={classes.label}>
                    Avatar small
                </Typography>
                <br/>
                <Button
                    className={classes.inputImage}
                    variant="contained"
                    component="label"
                >
                    {data.avatar? "Done" : "Upload"}
                    <input
                        type="file"
                        name="avatar"
                        // value={data.avatar}
                        onChange={handleAvatarSmall}
                        // accept="image/*" multiple={false}
                        hidden
                    />
                </Button>
            </FormControl>
            <FormControl className={classes.formControl}>
                <Typography variant="h4" className={classes.label}>
                    Avatar banner
                </Typography>
                <br/>
                <Button
                    className={classes.inputImage}
                    variant="contained"
                    component="label"
                >
                    {data.banner? "Done" : "Upload"}
                    <input
                        type="file"
                        name="avatar"
                        // value={data.avatar}
                        onChange={handleBanner}
                        // accept="image/*" multiple={false}
                        hidden
                    />
                </Button>
            </FormControl>
            <FormControl className={classes.formControl}>
                <Typography variant="h4" className={classes.label}>
                    Release Date
                </Typography>
                <br/>
                <TextField
                    id="date"
                    type="date"
                    // defaultValue={data.release}
                    format={'yyyy-MM-DD'}
                    value={data.release}
                    onChange={handleRelease}
                    className={classes.inputTextField}
                    style={{
                        // backgroundColor: "white",
                        borderRadius: "5px",
                        // color: "white",
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        className: classes.inputTime,
                        inputProps: { min: getToday()}
                    }}
                    variant="filled"
                    // color="secondary"
                    // onChange={handleBookingTime}
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField
                    label="Duration"
                    value={data.duration}
                    onChange={handleDuration}
                    className={classes.inputTextField}
                    InputLabelProps={{className: classes.label}}
                    InputProps={{className: classes.input}}
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField
                    label="Main Type"
                    value={data.main_type}
                    onChange={handleMainType}
                    className={classes.inputTextField}
                    InputLabelProps={{className: classes.label}}
                    InputProps={{className: classes.input}}
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField
                    label="Country"
                    value={data.country}
                    onChange={handleCountry}
                    className={classes.inputTextField}
                    InputLabelProps={{className: classes.label}}
                    InputProps={{className: classes.input}}
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField
                    label="Description"
                    multiline
                    rows={3}
                    value={data.description}
                    onChange={handleMovieDescription}
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

export default withStyles(FormStyle)(CreateNewMovie);