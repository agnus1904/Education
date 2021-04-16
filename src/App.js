import './App.css';
import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Header from "./Components/Header";
import Home from "./Containers/Home";
import Movie from "./Containers/Movie";
import Movies from "./Containers/Movies";
import Actor from './Containers/Actor';
import Booking from "./Containers/Booking";
import Login from "./Containers/Login";
import Register from "./Containers/Register";
import Footer from './Components/Footer';
import Admin from "./Containers/Admin";

import Theme from "./Theme";
import { Box, CssBaseline, ThemeProvider } from '@material-ui/core';

function App(props) {

    return (
        <Router>
            <Box className="App" >
                <ThemeProvider theme={Theme}>
                    <CssBaseline />
                    <Header />
                    <Route path="/Admin/:id" exact component={Admin} />
                    <Route path="/" exact component={Home} />
                    <Route path="/Movies" exact component={Movies} />
                    <Route path="/Movies/booking" exact component={Movies} />
                    <Route path="/Movie/:id" exact component={Movie} />
                    <Route path="/Actor/:id" exact component={Actor} />
                    <Route path="/Login/:id" exact component={Login} />
                    <Route path="/Login" exact component={Login} />
                    <Route path="/Register" exact component={Register} />
                    <Route path="/Booking/:id" exact component={Booking}/>
                    <Route path="/Booking" exact component={Booking}/>
                    <Footer />
                </ThemeProvider>
            </Box>
        </Router>
    );
}
export default App;

