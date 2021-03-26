import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import FirmItem from "./FirmItem";
import axios from "axios";
import PropTypes from "prop-types";

const useStyle = makeStyles(theme=>({
    root: {
        minHeight: "100vh",
        "& hr":{
            marginTop: 10,
            marginBottom: 15,
            border: "1px solid #222"
        }
    },
    content: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        paddingBottom: 150,
        paddingTop: 60,
        [theme.breakpoints.down("sm")]:{
            paddingLeft: 15,
            paddingRight: 15,
        },
    },
    header:{
        marginBottom: 10,
    },
    contentTop:{
        flexDirection: "row",
        display: "flex",
        [theme.breakpoints.down("sm")]:{
            flexDirection: "column",
        },
    },
    contentLeft: {
        width: "50%",
        paddingRight: "15%",
        [theme.breakpoints.down("sm")]:{
            width: "100%",
            paddingRight: 0,
            marginTop: 250,
        },
    },
    contentRight:{
        width: "50%",
        marginTop: 280,
        [theme.breakpoints.down("sm")]:{
            width: "100%",
            marginTop: 50,
        },
    },
    avatar:{
        width: 280,
        height: 400,
        position: "absolute",
        top: -90,
        right: 0,
        backgroundSize: "cover",
        backgroundPosition: "center",
        [theme.breakpoints.down("sm")]:{
            right: 20,
        },
    },
    avatarSubs:{
        marginTop: 30,
        maxWidth: 300,
        [theme.breakpoints.down("sm")]:{
            marginLeft: 20,
        },
    },
    avatarSub:{
        width: 140,
        height: 200,
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginBottom: 20,
    },
    seeAll:{
        "& a":{
            color: "red",
            textDecoration: "none"
        }
    }
}));



const ContentActor = React.memo((props)=>{

    const classes = useStyle();
    const {
        actorID
    } = props;

    // console.log("content actor render");

    const [ movieItems, setmovieItems] = React.useState([])
    const [ actorImages, setActorImages] = React.useState([])
    const [ actor, setActor] = React.useState({})

    async function fetchData() {
        let resActorDetails = await axios(
            `http://localhost/Cinema/Actor/GetActorDetailsById/${actorID}`
        );
        let dataActorDetails = await resActorDetails.data;


        let resActorImages = await axios(
            `http://localhost/Cinema/Actor/GetActorImagesById/${actorID}`
        );
        let dataListActorImages = await resActorImages.data;

        let resMovieItems = await axios(
            `http://localhost/Cinema/Movie/GetMovieItemsByActorId/${actorID}/4`
        );
        let dataListMovieItems = await resMovieItems.data;

        // Actor imgs
        dataListActorImages["data"]!==[]?
            setActorImages(dataListActorImages["data"]) :
            setActorImages([]);

        dataListMovieItems["data"]?
            setmovieItems(dataListMovieItems["data"]) :
            setmovieItems([]);

        // Actor Details
        dataActorDetails["data"]!=={} ?
            setActor(dataActorDetails["data"]) :
            setActor({});
    }

    React.useEffect(() => {
        fetchData();
    },[]);

    // const handleOnItemClick = (id)=> {
    //     const findFirmItem = movieItems.find(
    //         firmItems=>(parseInt(firmItems.movieId) === id));
    //     const newFirmItem ={...findFirmItem};
    //
    //     const index = movieItems.findIndex(x => x.movieId === findFirmItem.movieId);
    //     newFirmItem.liked = newFirmItem.liked=== "0" ? "1" : "0";
    //     const newFirmItems = [...movieItems];
    //     newFirmItems[index] = newFirmItem;
    //     setmovieItems(newFirmItems);
    // }
    const handleOnItemClick = (id)=> {
        let findFirmItem = movieItems.find(
            firmItems=>(parseInt(firmItems.movie_id) === id));
        let newFirmItem ={...findFirmItem};
        let index = movieItems.findIndex(x => x.movie_id === findFirmItem.movie_id);
        newFirmItem.liked = newFirmItem.liked==="0" ? "1" : "0";
        // console.log(newFirmItem.liked, itemsOpening[index].liked);
        let newFirmItems = [...movieItems];
        newFirmItems[index] = newFirmItem;
        //
        setmovieItems(newFirmItems);
    }


    const itemsTop = (
        movieItems===[] ?
        (<Typography variant="h4" color="primary" >
            <br/><br/>
            No Firm
        </Typography>) :
        movieItems.map(
            (item, index)=>(
                <FirmItem
                    id={item.movie_id}
                    itemUrl={item.avatar_url}
                    itemName={item.movie_name}
                    showTime={item.release_date}
                    maining={item.main_type}
                    liked={item.liked}
                    key={index}
                    onItemClick={handleOnItemClick}
                />
            )
        ));


    const avatarSubs =

        (actorImages===[]) ? (<Typography variant="h4" color="primary" >
                No Img
            </Typography>) :

        actorImages.map((item,index)=>{
        return(
            <Box
                key={index}
                style={{backgroundImage: `url(${item})`}}
                className={classes.avatarSub}
            />
        )
    });
    
    return(
        <Grid container className={classes.root}>
            
            {/* Grid off */}
            <Grid item className={classes.out} 
                xs="auto" 
                sm={2} 
                md={1} 
                lg={2} />

            {/* Main Grid */}
            <Grid item className={classes.content} 
                xs={12} 
                sm={8} 
                md={10} 
                lg={8}>
                <Box 
                    style={{backgroundImage: `url(${
                        (!actor) ? 
                            "http://localhost/Cinema/Public/Imgs/avatar_small/avatar_actor_default.png"
                            : actor.avatar_small_url
                    })`}}
                    className={classes.avatar}
                />
                <Box className={classes.contentTop}>
                    {/* Content left */}
                    <Box className={classes.contentLeft}>

                            {/* header */}
                            <Typography color="primary" variant="h6" className={classes.header}>
                                DATE OF BIRTH
                            </Typography>
                            {/* item date of birth */}
                            <Box display="flex" justifyContent="space-between">
                                <Typography color="secondary" variant="subtitle1">
                                    {actor.date_of_birth}
                                </Typography>
                            </Box>
                            <hr/>
                            
                            {/* header */}
                            <Typography color="primary" variant="h6" className={classes.header}>
                                LOCATION
                            </Typography>
                            {/* item location */}
                            <Box display="flex" justifyContent="space-between">
                                <Typography color="secondary" variant="subtitle1">
                                    {actor.location}
                                </Typography>
                            </Box>
                            <hr/>

                            {/* header */}
                            <Typography color="primary" variant="h6" className={classes.header}>
                                OCCUPATION
                            </Typography>
                            {/* item occupation */}
                            <Box display="flex" justifyContent="space-between">
                                <Typography color="secondary" variant="subtitle1">
                                    {actor.occupation}
                                </Typography>
                            </Box>
                            <hr/>
                            
                            <Box className={classes.avatarSubs} pt={10} >
                                <Box display="flex" pb={4} justifyContent="space-between">
                                    <Typography color="primary" variant="h6" className={classes.header}>
                                        PHOTO GALLARY
                                    </Typography>
                                    <Typography className={classes.seeAll} variant="subtitle1">
                                        <Link to="/Actor">SEE ALL</Link>
                                    </Typography>
                                </Box>
                                <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                                    {avatarSubs}
                                </Box>
                            </Box>

                    </Box>
                    
                    {/* Content Right */}
                    <Box className={classes.contentRight}>
                        {/* Storyline */}
                        <Box>
                            <Typography color="primary" mb={4} variant="h5" className={classes.header}>
                                BIOGRAPHY
                            </Typography>
                            <Typography color="primary" variant="subtitle1">
                                {actor.biography}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box display="flex" mt={10} justifyContent="space-between">
                    <Typography color="primary" variant="h6" className={classes.header}>
                        FILMOGRAPHY
                    </Typography>
                    <Typography className={classes.seeAll} variant="subtitle1">
                        <Link to="/Actor">SEE ALL</Link>
                    </Typography>
                </Box>
                <Box className={classes.contentBottom} display="flex" justifyContent="flex-start" flexWrap="wrap">
                    {itemsTop}
                </Box>
            </Grid>

            {/* Grid off */}
            <Grid item className={classes.out} 
                xs="auto" 
                sm={2} 
                md={1} 
                lg={2} />
        </Grid>
    );
});

ContentActor.propTypes= {
    actorId: PropTypes.string,
}

ContentActor.defaultProps = {
    actorId: "0",
}


export default ContentActor;