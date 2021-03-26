import React from 'react';
import {Link } from 'react-router-dom';

import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Box, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        paddingTop: 13,
        paddingBottom: 13,
        transition: "all 0.3s",
        backgroundColor: "inherit",
        color: "white",
    },
    appBarSticky: {
        padding: 0,
        backgroundColor: "white",
        transition: "all 0.3s",
    },
    toolBar: {
        justifyContent: "space-between",
        [theme.breakpoints.down("sm")]:{
            paddingLeft: 7,
            paddingRight: 7,
        },
    },
    appBarLeft: {
        display: "flex",
        alignItems: "center",
        zIndex: 10,
    },
    appBarLeftShow:{
        // backgroundColor: "white",
    },
    logo:{
        color: "white",
        fontSize: theme.typography.h3.fontSize,
        textDecoration: "none",
        marginRight: 20,
        marginLeft: 20,
        zIndex: 15,
    },
    logoSticky:{
        color: "black",
    },
    headerMenu: {
        transition: "all 0.3s",
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.up("sm")]:{
            "& li":{
                padding: 20,
                listStyle: "none",
                "& a": {
                    color: "white",
                    textDecoration: "none",
                }
            },
        },
        [theme.breakpoints.down("sm")]:{
            fontSize: "1.2rem",
            transform: "translateX(100%)",
            flexDirection: "column",
            justifyContent: "flex-start",
            position: "absolute",
            width: "100%",
            height: "100vh",
            zIndex: 5,
            top: 0,
            left: 0,
            backgroundColor: "white",
            paddingTop: 120,
            "& li":{
                padding: 15,
                margin: 10,
                listStyle: "none",
                "& a": {
                    color: "black",
                    textDecoration: "none",
                    "&:hover":{
                        color: theme.palette.secondary.light,
                    },
                },
            },
        },
    },

    headerMenuSticky:{
        "& li":{
            "& a":{
                color: "black"
            },
        },
    },

    appBarRight:{
        zIndex: 10,
    },
    appBarIconSearch: {
        color: "white",
        cursor: "pointer",
        position: "relative",
        height: 50,
        width: 180,
        [theme.breakpoints.down("sm")]:{
            width: 150,
            marginLeft: 0,
        },
    },
    appBarIconSearchSticky: {
        color: "black",
    },
    searchIcon:{
        position: "absolute",
        right: 0,
        top: 5,
        cursor: "pointer",
    },
    btn:{
        color: "white",
        [theme.breakpoints.up("sm")]:{
            marginRight: 0,
        },
        [theme.breakpoints.down("sm")]:{
            marginRight: 50,
        },
        [theme.breakpoints.down("xs")]:{
            marginRight: 20,
        },
        backgroundColor: theme.palette.error.main,
        "&:hover":{
            backgroundColor: theme.palette.error.light,
        },
    },
    menuShow:{
        display: "flex",
        transform: "translateX(0)",

    },
    menuShowSticky: {
        color: "black",
    },
    cursor: {
        cursor: "pointer",
    }
}));




export default function Header(props) {

    const [headerSticky, setHeaderSticky] = React.useState(true)

   const [menu, setMenu] = React.useState(false);

    const classes = useStyles();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    React.useEffect(() => {
        window.onscroll = () => {
            let height = window.pageYOffset;
            if(height === 0){
                setHeaderSticky(true);
            }else {
                setHeaderSticky(false);
            }
        }
    }, []);





    const scrollToTop= ()=> {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }

    const iconMenuClick = ()=>{
        const newMenu = menu;
        setMenu(!newMenu);
    }

    // console.log(props.match.params.page);
    //

    return (
        <AppBar
            position="fixed"
            className={
                classNames(classes.appBar, headerSticky ? "": classes.appBarSticky, !menu ? "": classes.appBarSticky)
            }
        >
            <Toolbar className={classes.toolBar}>
                <Typography variant="h6" 
                    className={
                        classNames(classes.appBarLeft, !menu ? "": classes.appBarLeftShow)
                    }
                    component="div">
                    <Link to="/" 
                        className={
                            classNames(classes.logo, headerSticky? "": classes.logoSticky, !menu? "": classes.logoSticky)
                        }
                        onClick={()=>{scrollToTop(); if(menu){iconMenuClick()}}}
                        >
                            AMC
                    </Link>
                    <ul 
                        className={
                            classNames(classes.headerMenu, 
                                headerSticky? "": classes.headerMenuSticky, 
                                !menu? "": classes.headerMenuSticky, 
                                !menu ? "": classes.menuShow
                            )
                        }
                    >
                        <li><Link 
                            to="/Movies"
                            onClick={
                                menu ? 
                                ()=> {iconMenuClick(); scrollToTop()} 
                                : ()=> scrollToTop() }
                        >
                            MOVIE
                        </Link></li>
                        <li><Link 
                            to="/Actor/1"
                            onClick={
                                menu ? 
                                ()=> {iconMenuClick(); scrollToTop()} 
                                : ()=> scrollToTop() }
                        >
                            ACTOR
                        </Link></li>
                        <li><Link 
                            to="/Booking"
                            onClick={
                                menu ? 
                                ()=> {iconMenuClick(); scrollToTop()} 
                                : ()=> scrollToTop() }
                        >BOOKING
                        </Link></li>
                        <li><Link 
                            to="/" 
                            onClick={
                                menu ? 
                                ()=> {iconMenuClick(); scrollToTop()} 
                                : ()=> scrollToTop() }
                        >EVENTS
                        </Link></li>
                        <li><Link 
                            to="/" 
                            onClick={
                                menu ? 
                                ()=> {iconMenuClick(); scrollToTop()} 
                                : ()=> scrollToTop() }
                        >CONTACT
                        </Link></li>
                    </ul>
                </Typography>
                <Box 
                    display="flex"
                    alignItems="center"
                    mr={3}
                    className={
                        classNames(classes.appBarRight, !menu ? "": classes.menuShow)
                    }
                >
                    <Box pt={1} mx={4} 
                        className={
                            classNames(classes.appBarIconSearch, headerSticky? "": classes.appBarIconSearchSticky,!menu? "": classes.appBarIconSearchSticky)
                        }
                    >
                        <SearchIcon fontSize="large" style={{cursor: "pointer"}} className={classes.searchIcon} />
                    </Box>
                    <Box>
                        <Button
                            href="/Admin/1"
                            variant="contained"
                            className={classes.btn}
                        >
                            MY AMC
                        </Button>
                    </Box>
                    {
                    isMobile  ? 
                        (
                            !menu ? 
                            <MenuIcon
                                className={
                                    classNames(classes.menuShow, 
                                        headerSticky? "": classes.menuShowSticky,
                                        classes.cursor        
                                    )
                                }
                                fontSize="large"
                                onClick={iconMenuClick}
                            />
                            :
                            <CloseIcon 
                                className={
                                    classNames(classes.menuShow, 
                                        headerSticky? "": classes.menuShowSticky, 
                                        !menu? "": classes.menuShowSticky,
                                        classes.cursor
                                    )
                                }
                                fontSize="large"
                                onClick={iconMenuClick}
                            /> 
                        )
                    :
                        ""
                }
                </Box>
                
            </Toolbar>
        
        </AppBar>
    );
}
