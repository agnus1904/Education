import {createMuiTheme} from '@material-ui/core';


const Theme = createMuiTheme({
    palette: {
        primary:{
            main: "#CCC",
        },
        secondary: {
            main: "rgb(86,86,91)"
        },
        background: {
            default: "#191A1D",
            paper: "rgb(9,10,14)",
        },
    },
    typography:{
        h1:{
            fontSize: "3rem"
        },
        h2:{
            fontSize: "2.2rem"
        },
        h3: {
            fontSize: "1.3rem"
        },
        h4:{
            fontSize: "1.125rem"
        },
        h5:{
            fontSize: "1rem"
        },
        h6:{
            fontSize: "0.875rem"
        },
        subtitle1: {
            fontSize: "0.8rem",
        },
        subtitle2: {
            fontSize: "0.6rem"
        },
        body1:{
            fontSize: "0.7rem"
        }
    }
})

export default Theme;