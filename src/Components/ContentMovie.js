import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import PropTypes from 'prop-types';
import axios from "axios";




const useStyle = makeStyles(theme =>({
    root:{
        "& hr":{
            marginTop: 10,
            marginBottom: 15,
            border: "1px solid #222"
        }
    },
    content:{
        display: "flex",
        paddingBottom: 150,
        paddingTop: 150,
        [theme.breakpoints.down("sm")]:{
            flexDirection: "column",
            paddingLeft: 15,
            paddingRight: 15,
        },
    },
    contentLeft: {
        width: "50%",
        paddingRight: "15%",
        [theme.breakpoints.down("sm")]:{
            width: "100%",
            paddingRight: 0,

        },
    },
    contentRight:{
        width: "50%",
        [theme.breakpoints.down("sm")]:{
            width: "100%",
        },
    },
    header:{
        marginBottom: 40,
    }
}))

const ContentMovie = (props)=>{

    const {
        movie_id
    } = props;
    const classes = useStyle();


    // console.log(movie_id, "render");

    const [movie, setMovie] = React.useState({})
    const [actors, setActors] = React.useState([])

    async function fetchData() {
        let responseMovie = await axios(
            `http://localhost/Cinema/Movie/GetMovieDetailsById/${movie_id}`
        );
        let dataListMovie = await responseMovie.data;

        let responseActors = await axios(
            `http://localhost/Cinema/Actor/GetActorByMovieId/${movie_id}`
        );
        let dataListActors = await responseActors.data;

        // console.log(dataList["data"]);
        dataListMovie["data"] ? setMovie(dataListMovie["data"]) : setMovie({});
        dataListActors["data"] ? setActors(dataListActors["data"]) : setActors([]);

    }
    console.log(actors);

    const listActors =
        actors===[] ? "" :

        actors.map(
        (actor,index)=>(
            <Box mb={5} key={index} display="flex" alignItems="center">
                <Box mr={3}
                     style={{backgroundImage: `url(
                                 "http://localhost/Cinema/Public/Imgs/avatar_small/avatar_actor_default.png"
                                 )`,
                        width: "50px",
                         height: "50px",
                         backgroundSize: "cover",
                         backgroundPosition: "center"
                     }}
                />
                <Typography variant="h6" color="secondary">
                    {actor.actor_name}
                </Typography>
            </Box>
        )
    )

    React.useEffect(() => {
        fetchData();
    },[]);

    return(
        <>
            <Grid container className={classes.root}>
                {/* grid off */}
                <Grid item className={classes.out} 
                    xs="auto" 
                    sm={2} 
                    md={1} 
                    lg={2}
                />

                {/* Main grid */}
                <Grid item className={classes.content} 
                    xs={12} 
                    sm={8} 
                    md={10} 
                    lg={8}
                >
                    {/* Content left  */}
                    <Box className={classes.contentLeft}>

                        {/* Details */}
                        <Box>
                            {/* header */}
                            <Typography color="primary" variant="h5" className={classes.header}>
                                DETAILS
                            </Typography>
                            {/* item country */}
                            <Box display="flex" justifyContent="space-between">
                                <Typography color="secondary">
                                    COUNTRY
                                </Typography>
                                <Typography color="primary" variant="subtitle2" >
                                    {
                                        movie.country? movie.country : ""
                                    }
                                </Typography>
                            </Box>
                            <hr/>
                            {/* item language */}
                            <Box display="flex" justifyContent="space-between">
                                <Typography color="secondary">
                                    LANGUAGE
                                </Typography>
                                <Typography color="primary" variant="subtitle2" >
                                    {
                                        movie.language? movie.language : ""
                                    }
                                </Typography>
                            </Box>
                            <hr/>
                            {/* item release date */}
                            <Box display="flex" justifyContent="space-between">
                                <Typography color="secondary">
                                    RELEASE DATE
                                </Typography>
                                <Typography color="primary" variant="subtitle2" >
                                    {
                                        movie.release_date ?
                                        movie.release_date.slice(0,-9) : ""
                                    }
                                </Typography>
                            </Box>
                            <hr/>
                        </Box>

                        {/*Actor*/}
                        <Box mt={10}>
                            <Typography color="primary" variant="h5" className={classes.header}>
                                CAST
                            </Typography>
                            {listActors}
                        </Box>

                    </Box>

                    {/* Content right */}
                    <Box className={classes.contentRight}>
                        {/* Storyline */}
                        <Box>
                            <Typography color="primary" variant="h5" className={classes.header}>
                                STORYLINE
                            </Typography>
                            <Typography color="primary" variant="subtitle1">
                                {
                                    movie.description ? movie.description : ""
                                }
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                {/* grid off */}
                <Grid item className={classes.out} 
                    xs="auto" 
                    sm={2} 
                    md={1} 
                    lg={2} />
            </Grid>
        </>
    )
}

ContentMovie.propTypes={
    movie_id: PropTypes.string,
}

ContentMovie.defaultProps={
    movie_id: "0",
}

export default ContentMovie;

