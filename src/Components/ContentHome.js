import { Box, CssBaseline, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import FirmItem from "./FirmItem";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root:{
        // maxWidth: 1550,
        minHeight: "100vh",
        margin: "0 auto",
        paddingTop: 80,
        paddingBottom: 150,
        [theme.breakpoints.down("sm")]:{
            paddingLeft: 15,
            paddingRight: 15,
        },
    },
    header: {
        color: theme.palette.primary.main,
        marginBottom: 50,
    },
    out:{
        width: "100%",
    },
    item:{
        width: "fit-content",
    }
}));


const ContentHome = ()=>{
    const classes = useStyles();
    const [itemsOpening, setItemsOpening] = React.useState([])
    const [itemsComing, setItemsComing] = React.useState([])


    async function fetchData() {
        let responseOpening = await axios(
            `http://localhost/Cinema/Movie/GetMovieItemsSortByView/8`
        );
        let dataListOpening = await responseOpening.data;

        let responseComing = await axios(
            `http://localhost/Cinema/Movie/GetMovieItemsSortByView/4`
        );
        let dataListComing = await responseComing.data;

        dataListOpening["data"] ? setItemsOpening(dataListOpening["data"]) : setItemsOpening([]);
        dataListComing["data"]? setItemsComing(dataListComing["data"]) : setItemsComing([]);
    }

    React.useEffect(() => {
        fetchData();
    },[]);



    const itemsTop = (itemsOpening===[] ?
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
        ));

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
        <>
            <CssBaseline />

            {/* Opening */}
            <Grid container className={classes.root}>
                <Grid item className={classes.out} 
                    xs="auto" 
                    sm={2} 
                    md={1} 
                    lg={2} />
                <Grid item className={classes.content} 
                    xs={12} 
                    sm={8} 
                    md={10} 
                    lg={8}>
                    <Typography variant="h1" className={classes.header}>
                        Opening this week
                    </Typography>
                    <Box display="flex" justifyContent="flex-start" flexWrap="wrap">
                        {itemsTop}
                    </Box>
                </Grid>
                <Grid item className={classes.out} 
                    xs="auto" 
                    sm={2} 
                    md={1} 
                    lg={2}
                    />
            </Grid>

            {/* Comingsoon */}
            <Grid container className={classes.root}>
                <Grid item className={classes.out} 
                    xs="auto" 
                    sm={2} 
                    md={1} 
                    lg={2} />
                <Grid item className={classes.content} 
                    xs={12} 
                    sm={8} 
                    md={10} 
                    lg={8}>
                    <Typography variant="h1" className={classes.header}>
                        Comming soon
                    </Typography>
                    <Box display="flex" justifyContent="flex-start" flexWrap="wrap">
                        {itemsBottom}
                    </Box>
                </Grid>
                <Grid item className={classes.out} 
                    xs="auto" 
                    sm={2} 
                    md={1} 
                    lg={2}
                    />
            </Grid>
            <br/>
        </>
    )
}

export default ContentHome;