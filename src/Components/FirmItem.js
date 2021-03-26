import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';


const useStyles = makeStyles((theme)=>({
    root:{
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.default,
        width: 200,
        marginTop: 25,
        boxShadow: "none",
        marginLeft: 15,
        marginRight: 15,
    },
    actionArea:{
        position: "relative",
    },
    media: {
    height: 300,
    backgroundSize: "cover",
    backgroundPosition: "center",
    },
    overplay: {
        position: "absolute",
        top: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0)",
        transition: "all 0.3s",
        "&:hover":{
            backgroundColor: "rgba(0,0,0,0.3)",
            "& $overplayIcon":{
                opacity:1,
                transform: "scale(1.2)",
            },
        }
    },
    overplayIcon:{
        fontSize: "3rem",
        color: "white",
        transform: "scale(0.8)",
        opacity: 0,
        transition: "all 0.3s",
    },
    
      action:{
          padding: 0,
      },
      
      icon: {
        cursor: "pointer",
        transition: "0.3s",
      },
}));

const FirmItem =  React.memo((props)=>{
  const classes = useStyles();
  const {
      id,
      itemUrl,
      itemName,
      showTime,
      liked,
      maining,
      onItemClick,
  } = props;

    const scrollToTop= ()=> {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    const idNumber = parseInt(id);
    const likedNumber = parseInt(liked)
    // console.log("item redner")
    // console.log(idNumber,"idnum");

  return (
        <Card className={classes.root}>
            <Link to={(idNumber!==0)? `/movie/${idNumber}` : "/"} onClick={scrollToTop}>
                <CardActionArea className={classes.actionArea} component="div">
                    <CardMedia
                        className={classes.media}
                        image={
                            (!itemUrl || itemUrl==="") ?
                                FirmItem.defaultProps.itemUrl
                                : itemUrl
                        }
                        title="Contemplative Reptile"
                    />
                    <Box className={classes.overplay}>
                        <PlayCircleFilledIcon
                            className={classes.overplayIcon}
                        />
                    </Box>
                </CardActionArea>
            </Link>
            <CardActions className={classes.action}>
                <Box display="flex" width="100%">
                    <Box flexGrow={4} >
                        <Typography variant='h6' mb={1} style={{margin: "15px 0 10px 0"}}>
                            {
                                (!itemName || itemName==="") ?
                                    FirmItem.defaultProps.itemName
                                    : itemName
                            } <br/>
                        </Typography>
                        <Typography variant="subtitle2" color="secondary">
                            {showTime}
                            &nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;
                            {
                                (!maining || maining==="") ?
                                    FirmItem.defaultProps.maining
                                    : maining
                            }
                        </Typography>
                    </Box>
                    <Box flexGrow={1} display="flex" justifyContent="flex-end" pt="15px">
                            <FavoriteIcon className={classes.icon}
                                color={ likedNumber ? "error" : "disabled"}
                                onClick={
                                    ()=>{
                                        onItemClick(idNumber);
                                    }
                                }
                            />
                    </Box>
                </Box>
            </CardActions>
        </Card>
  );
})


FirmItem.propTypes= {
    id: PropTypes.string,
    itemUrl: PropTypes.string,
    itemName: PropTypes.string,
    showTime: PropTypes.string,
    maining: PropTypes.string,
    liked: PropTypes.string,
    onItemClick : PropTypes.func,
}

FirmItem.defaultProps = {
    id: "0",
    itemUrl: "http://localhost/Cinema/Public/Imgs/firm_small/movie_small_default.png",
    itemName: "Not found",
    showTime: "Not found",
    maining: "NOT FOUND",
    liked: "0",
    onItemClick : null,
}

export default FirmItem;