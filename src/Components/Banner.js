import React  from "react";
import {makeStyles} from '@material-ui/core/styles';
import { Box, Button, Typography } from "@material-ui/core";
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    bannerHome:{
        position: "relative",
        height: "100vh",
    },
    bannerImg: {
        width: "100%",
        height:  "100%",
        position: "absolute",
        backgroundPosition: "center",
        backgroundSize: "cover",
    },
    overPlay: {
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: "#111",
        opacity: 0.4,
    },
    bannerText:{
        position: "absolute",
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        paddingLeft: 200,
        lineHeight: 50,
        [theme.breakpoints.down("sm")]:{
            paddingLeft: 70,
        },
        [theme.breakpoints.down("xs")]:{
            paddingLeft: 30,

        },
    },
    firmName:{
        fontSize: "7rem",
        color: "white",
        lineHeight: 1,
        [theme.breakpoints.down("sm")]:{
            fontSize: "5.5rem",
        },
        [theme.breakpoints.down("xs")]:{
            fontSize: "4rem",
        },
    },
    btn:{
        color: "white",
        backgroundColor: theme.palette.error.main,
        width: "fit-content",
        marginTop: 40,
        padding: 10,
        paddingRight: 25,
        paddingLeft: 25,
        "&:hover":{
            backgroundColor: theme.palette.error.light,
        }
    },
}));

const Banner = (props)=>{
    const classes = useStyles();
    const {
        id,
        url,
        bannerText,
        bannerType
    } = props;

    return(
        <Box className={classes.bannerHome}>
            < Box
                style={{backgroundImage:
                        `url(${ url?
                            url :
                            Banner.defaultProps.url
                        })`}}
                className={classes.bannerImg}
            >
            </ Box>
            <Box className={classes.overPlay} />
            <Box className={classes.bannerText}>
                <Typography variant="h1" className={classes.firmName} conponent="h1">
                    {
                        bannerText ?
                        ReactHtmlParser(bannerText) :
                            ReactHtmlParser(Banner.defaultProps.bannerText)
                    }
                </Typography>
                {
                    (bannerType==="home" || bannerType==="movie") ?
                    (<Button
                        href={`/Booking/${id}`}
                        variant="contained"
                        className={classes.btn}
                    >
                        BOOKING NOW
                    </Button>) :
                    ""           
                }
            </Box>
        </Box>
    )
}

Banner.propsTypes={
    id: PropTypes.string,
    url: PropTypes.string,
    bannerText: PropTypes.string,
    bannerType: PropTypes.string,
}

Banner.defaultProps={
    id: "14",
    url: "http://localhost/Cinema/Public/Imgs/banner_actor/banner_actor_default.png",
    bannerText: `404 <br/> Not found`,
    bannerType: "actor"
}

export default Banner;