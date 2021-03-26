import { Box, Button, Grid, makeStyles, TextField, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import React from "react";
import { Link } from "react-router-dom";


const useStyle = makeStyles((theme)=>({
    root:{
        color: "white",
        
        backgroundColor: theme.palette.background.paper,
        [theme.breakpoints.down("sm")]:{
            paddingLeft: 20,
            paddingRight: 20,
        },
    },
    content: {
        maxWidth: 1490,
        margin: "0 auto",
    },
    footerTop:{
        marginTop: 90,
        marginBottom: 80,
    },
    inputTextField:{
        borderBottom: "1px solid #555",
        marginTop: 10,
        width: "80%",
    },
    label:{
        color: theme.palette.secondary.main,
        fontSize: theme.typography.subtitle1.fontSize,
    },
    input:{
        color: theme.palette.secondary.main,
        fontSize: theme.typography.subtitle1.fontSize,
        paddingBottom: 5
    },
    btn:{
        marginTop: 20,
        padding: 0,
        color: theme.palette.error.main,
        fontSize: theme.typography.subtitle1.fontSize,
    },
    footerBottom:{
        marginBottom: 100,
    },
    icon:{
        marginRight: 20,
        color: theme.palette.secondary.main,
    },
}));

const Footer = (props)=>{

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const classes = useStyle();
    if(props.match){
        if(props.match.params.page==="Admin"){
            return (
                <>
                </>
            );
        }
    }
    return(
        <Grid container className={classes.root}>

                {/* grid off */}
                <Grid item className={classes.out} 
                    xs="auto" 
                    sm={2} 
                    md={1} 
                    lg={2} />

                {/* main grid */}
                <Grid item className={classes.content} 
                    xs={12} 
                    sm={8} 
                    md={10} 
                    lg={8}>
                    {/* Footer-Top */}
                    <Box display="flex" className={classes.footerTop}>
                       <Box flex="2">
                            <Typography variant="h3">
                                AMC
                            </Typography>
                       </Box>
                       <Box flex={isMobile? "3" : "4"}>
                            {/* Top2 */}
                       </Box>
                       <Box flex="3">
                            <form>
                                <Typography>
                                    Subscribe now
                                </Typography>
                                <TextField
                                    label="your e-mail"
                                    className={classes.inputTextField}
                                    InputLabelProps={{className: classes.label}}
                                    InputProps={{className: classes.input}}
                                    color="secondary"
                                    />
                                <Button className={classes.btn}>
                                    SUBSCRIBE NOW
                                </Button>
                            </form>
                       </Box>
                    </Box>

                    {/* Footer-Bottom */}
                    <Box  className={classes.footerBottom} display="flex">
                       <Box 
                            // { isMobile ? `abcd` : `flex="6"`}
                            flex={isMobile? "5" : "6"}
                       >
                            <Typography variant="body1" color="secondary">
                                Copyright &copy; 2017 AMC. All right reverved 
                                <br/>
                                Terms and Condition | Privacy Policy
                            </Typography>
                       </Box>
                       <Box flex="3">
                            <Typography variant="body1">
                                <Link className={classes.icon} to="/facebook"><FacebookIcon /></Link>
                                <Link className={classes.icon} to="/instagram"><InstagramIcon /></Link>
                                <Link className={classes.icon} to="/twitter"><TwitterIcon /></Link>
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
    );
}

export default Footer;