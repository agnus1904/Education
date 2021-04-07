import React from "react"
import {Box, Button, FormControl, TextField, Typography} from "@material-ui/core";
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import FormStyle from "./FormStyle";

const CreateNewActor = (props)=>{

    const {classes} = props;

    const [status, setStatus] = React.useState("");
    const [data, setData] = React.useState({
        actor_name: "",
        actor_name_banner: "",
        avatar: "",
        banner: "",
        date_of_birth: "",
        location: "",
        occupation: "",
        biography: "",
    });

    async function fetchData() {
        let dataFetch = new FormData();
        dataFetch.append("actor_name", data.actor_name);
        dataFetch.append("actor_name_banner", data.actor_name_banner);
        dataFetch.append("location", data.location);
        dataFetch.append("avatar", data.avatar);
        dataFetch.append("banner", data.banner);
        dataFetch.append("date_of_birth", data.date_of_birth);
        dataFetch.append("occupation", data.occupation);
        dataFetch.append("biography", data.biography);
        let response = await axios.post(
            `http://localhost/Cinema/Admin/CreateNewActor`, dataFetch
        );

        let res = await response.data;
        setStatus(res.message);
    }

    function getToday(){
        let today =new Date();
        let dd =String(today.getDate()).padStart(2, '0');
        let mm =String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy =today.getFullYear();

        today =yyyy + '-' + mm + '-' + dd;
        return today;
    };

    console.log(data);

    React.useEffect(
        ()=>{
            let newData = {...data};
            newData.date_of_birth = getToday();
            setData(newData);
        }, []
    )

    const handleActorName = (e)=>{
        const newData = {...data};
        newData.actor_name= e.target.value;
        setData(newData);
    }
    const handleActorNameBanner = (e)=>{
        const newData = {...data};
        newData.actor_name_banner= e.target.value;
        setData(newData);
    }
    const handleActorLocation = (e)=>{
        const newData = {...data};
        newData.location= e.target.value;
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

    const handleActorDateOfBirth = (e)=>{
        const newData = {...data}
        newData.date_of_birth = e.target.value;
        // = URL.createObjectURL(img);
        setData(newData);
    }



    return(
        <Box display="flex" flexWrap="wrap">
            <Typography variant="h4" color="error" className={classes.status}>
                {status}
            </Typography>
            <FormControl className={classes.formControl}>
                <TextField
                    label="Actor Name"
                    value={data.actor_name}
                    onChange={handleActorName}
                    className={classes.inputTextField}
                    InputLabelProps={{className: classes.label}}
                    InputProps={{className: classes.input}}
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField
                    label="Actor Name Banner"
                    value={data.actor_name_banner}
                    onChange={handleActorNameBanner}
                    className={classes.inputTextField}
                    InputLabelProps={{className: classes.label}}
                    InputProps={{className: classes.input}}
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField
                    label="Location"
                    value={data.location}
                    onChange={handleActorLocation}
                    className={classes.inputTextField}
                    InputLabelProps={{className: classes.label}}
                    InputProps={{className: classes.input}}
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <Typography variant="h4" className={classes.label}>
                    Avatar Movie
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
                    Banner Image
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
                    Date of birth
                </Typography>
                <br/>
                <TextField
                    id="date"
                    type="date"
                    // defaultValue={data.release}
                    format={'yyyy-MM-DD'}
                    value={data.date_of_birth}
                    onChange={handleActorDateOfBirth}
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
                        inputProps: { max: getToday()}
                    }}
                    variant="filled"
                    // color="secondary"
                    // onChange={handleBookingTime}
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

export default withStyles(FormStyle)(CreateNewActor);