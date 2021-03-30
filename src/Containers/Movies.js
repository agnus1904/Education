import React from "react";
import {Box, Button, TextField, Typography} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import FirmItem from "../Components/FirmItem";
import { red } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "150px 200px",
    },
    top:{
        display: "flex",
        flexWrap: "wrap",
        justifyItems: "flex-start",
        width: "100%",
    },
    bottom:{
        display: "flex",
        flexWrap: "wrap",
        justifyItems: "flex-start",
        width: "100%",
    },
    form:{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
    },
    inputTextField:{
        borderBottom: "2px solid white",
        marginTop: 20,
        marginLeft: 10,
        width: 350,
    },

    label:{
        color: red[800],
        fontSize: theme.typography.h5.fontSize,
        "&.MuiFormLabel-colorSecondary.Mui-focused":{
            color: red[800],
        },
    },
    input:{
        color: "white",
        fontSize: theme.typography.h5.fontSize,
        paddingBottom: 5,

    },
    searchBtn:{
        marginTop: 20,
    }
}));


const Movies = ()=>{

    const classes = useStyles();

    const [itemsOpening, setItemsOpening] = React.useState([])
    const [itemsComing, setItemsComing] = React.useState([])
    const [inputOpening, setInputOpening] = React.useState("")
    const [inputComing, setInputComing] = React.useState("")

    async function fetchData() {
        let responseOpening = await axios(
            `http://localhost/Cinema/Movie/GetMovieItemsSortByViewOpening/8`
        );
        let dataListOpening = await responseOpening.data;

        let responseComing = await axios(
            `http://localhost/Cinema/Movie/GetMovieItemsSortByViewComing/4`
        );
        let dataListComing = await responseComing.data;

        dataListOpening["data"] ? setItemsOpening(dataListOpening["data"]) : setItemsOpening([]);
        dataListComing["data"]? setItemsComing(dataListComing["data"]) : setItemsComing([]);
    }

    async function fetchNewOpening(){
        let responseOpening = await axios(
            `http://localhost/Cinema/Movie/GetMovieItemsSortByViewAndNameOpening/8/${inputOpening}`
        );
        let dataListOpening = await responseOpening.data;

        dataListOpening["data"] ? setItemsOpening(dataListOpening["data"]) : setItemsOpening([]);
    }

    React.useEffect(() => {
        fetchData();
    },[]);
    //
    // const handleOnItemOpeningClick = (id)=> {
    //     let findFirmItem = itemsOpening.find(
    //         firmItems=>(parseInt(firmItems.movie_id) === id));
    //     let newFirmItem ={...findFirmItem};
    //     let index = itemsOpening.findIndex(x => x.movie_id === findFirmItem.movie_id);
    //     newFirmItem.liked = newFirmItem.liked==="0" ? "1" : "0";
    //     // console.log(newFirmItem.liked, itemsOpening[index].liked);
    //     let newFirmItems = [...itemsOpening];
    //     newFirmItems[index] = newFirmItem;
    //     setItemsOpening(newFirmItems);
    // }
    //
    // const handleOnItemComingClick = (id)=> {
    //     let findFirmItem = itemsComing.find(
    //         firmItems=>(parseInt(firmItems.movie_id) === id));
    //     let newFirmItem ={...findFirmItem};
    //
    //     let index = itemsComing.findIndex(x => x.movie_id === findFirmItem.movie_id);
    //     newFirmItem.liked = newFirmItem.liked==="0" ? "1" : "0";
    //     // console.log(newFirmItem.liked, itemsOpening[index].liked);
    //     let newFirmItems = [...itemsComing];
    //     newFirmItems[index] = newFirmItem;
    //     //
    //     setItemsComing(newFirmItems);
    // }

    console.log(itemsOpening, "this is item opening");
    const handleOpeningChange = (e)=>{
        setInputOpening(e.target.value);
    }

    const handleForm= (e)=>{
        e.preventDefault();
            // console.log("form submited", user, password);
        if( e.key === "Enter" || e.target.value==="submit"){
            // console.log("form submited", user, password);
        }
        if(inputOpening!==""){
            fetchNewOpening();
        }else {
            fetchData();
        }
    }
    // console.log(itemsTop);


    const itemsBottom = (itemsComing===[] ?
        (<Typography variant="h4" color="primary" >
            <br/><br/>
            No Firm
        </Typography>) :
        itemsComing.map(
            (item, index)=>(
                <FirmItem
                    movieId={item.movie_id}
                    key={index}
                />
            )
        ));


    return(
        <Box className={classes.root}>
            <Typography variant="h1" color="primary" className={classes.header}>
                Opening this week
            </Typography>
            <form
                className={classes.form}
                noValidate autoComplete="off"
                onSubmit={handleForm}
            >
                <TextField
                    label="Input Name"
                    className={classes.inputTextField}
                    InputLabelProps={{className: classes.label}}
                    InputProps={{className: classes.input}}
                    color="secondary"
                    value={inputOpening}
                    onChange={handleOpeningChange}
                />
                <Button type="button"
                        variant="contained"
                        color="primary"
                        value="submit"
                        className={classes.searchBtn}
                        onClick={handleForm}>Search</Button>
            </form>
            <Box mt={4} mb={10} className={classes.top}>
                {
                    itemsOpening===[] ?
                        (<Typography variant="h4" color="primary" >
                            <br/><br/>
                            No Firm
                        </Typography>) :
                        itemsOpening.map(
                            (item, index)=>(
                                <FirmItem
                                    movieId={item.movie_id}
                                    key={index}
                                />
                            )
                        )
                }
            </Box>
            <Typography variant="h1" color="primary" className={classes.header}>
                Coming soon
            </Typography>
            <Box mt={4} className={classes.bottom}>
                {itemsBottom}
            </Box>
        </Box>
    )
};

export default Movies;