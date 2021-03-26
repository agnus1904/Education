import React from 'react'
import { Route, Switch ,Redirect} from "react-router-dom";
import Admin from "./Admin";
import Home from "./Home";
import Movies from "./Movies";
import Movie from "./Movie";
import Actor from "./Actor";
import Login from "./Login";
import Booking from "./Booking";
import {ThemeProvider} from "@material-ui/core";


const Routes = () => (
    <main>
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/Admin" exact component={Admin} />
            <Route path="/" exact component={Home} />
            <Route path="/Movies" exact component={Movies} />
            <Route path="/Movie/:id" exact component={Movie} />
            <Route path="/Actor/:id" exact component={Actor} />
            <Route path="/Login/:id" exact component={Login} />
            <Route path="/Login" exact component={Login} />
            <Route path="/Booking/:id" exact component={Booking}/>
            <Route path="/Booking" exact component={Booking}/>
            {/*<Route component={Error} />*/}
        </Switch>
    </main>
)





export default Routes;