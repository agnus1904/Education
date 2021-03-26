import React from "react";
import {Box, Typography} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import FirmItem from "../Components/FirmItem";

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
}));


const Movies = ()=>{

    const classes = useStyles();

    const [itemsOpening, setItemsOpening] = React.useState([])
    const [itemsComing, setItemsComing] = React.useState([])


    async function fetchData() {
        let response = await axios(
            `http://localhost/Cinema/home/GetHomeContent`
        );
        let dataList = await response.data;

        // console.log(dataList[1]);

        setItemsOpening(dataList[1]);
        setItemsComing(dataList[2]);
    };

    React.useEffect(() => {
        fetchData();
    },[]);

    const handleOnItemOpeningClick = (id)=> {
        let findFirmItem = itemsOpening.find(
            firmItems=>(parseInt(firmItems.movie_id) === id));
        let newFirmItem ={...findFirmItem};
        let index = itemsOpening.findIndex(x => x.movie_id === findFirmItem.movie_id);
        newFirmItem.liked = newFirmItem.liked==="0" ? "1" : "0";
        // console.log(newFirmItem.liked, itemsOpening[index].liked);
        let newFirmItems = [...itemsOpening];
        newFirmItems[index] = newFirmItem;
        setItemsOpening(newFirmItems);
    }

    const itemsTop = (itemsOpening===[] ?
        (<Typography variant="h4" color="primary" >
            <br/><br/>
            No Firm
        </Typography>) :
        itemsOpening.map(
            (item, index)=>(
                <FirmItem
                    id={item.movie_id}
                    itemUrl={item.avatar_url}
                    itemName={item.movie_name}
                    showTime={item.show_time}
                    maining={item.main_type}
                    liked={item.liked}
                    key={index}
                    onItemClick={handleOnItemOpeningClick}
                />
            )
        ));

    const handleOnItemComingClick = (id)=> {
        let findFirmItem = itemsComing.find(
            firmItems=>(parseInt(firmItems.movie_id) === id));
        let newFirmItem ={...findFirmItem};

        let index = itemsComing.findIndex(x => x.movie_id === findFirmItem.movie_id);
        newFirmItem.liked = newFirmItem.liked==="0" ? "1" : "0";
        // console.log(newFirmItem.liked, itemsOpening[index].liked);
        let newFirmItems = [...itemsComing];
        newFirmItems[index] = newFirmItem;
        //
        setItemsComing(newFirmItems);
    }

    const itemsBottom = (itemsComing===[] ?
        (<Typography variant="h4" color="primary" >
            <br/><br/>
            No Firm
        </Typography>) :
        itemsComing.map(
            (item, index)=>(
                <FirmItem
                    id={item.movie_id}
                    itemUrl={item.avatar_url}
                    itemName={item.movie_name}
                    showTime={item.show_time}
                    maining={item.main_type}
                    liked={item.liked}
                    key={index}
                    onItemClick={handleOnItemComingClick}
                />
            )
        ));


    return(
        <Box className={classes.root}>
            <Typography variant="h1" color="primary" className={classes.header}>
                Opening this week
            </Typography>
            <Box mt={4} mb={10} className={classes.top}>
                {itemsTop}
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