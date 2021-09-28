import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { getAllPureSoulPresentsMusicians } from "./actions/userActions";
import { UserDetails } from "./pages/UserDetails";
import { UserList } from "./pages/UserList";
import { Contact } from "./pages/Contact";
import { Test } from "./pages/Test";
import { Index } from "./pages/Index";
import { ErrorPage } from "./pages/Error";
import { Nav } from "./components/Nav";


function App() {
    return (
        <div className="App">
            <Router>
                
            <Nav />
                <Switch>
                    <Route exact path="/" component={ Index } />
                    <Route exact path="/userdetails" component={UserDetails} />
                    <Route exact path="/userlist" component={UserList} />
                    <Route exact path="/contact" component={Contact} />
                    <Route component={ErrorPage} />
                    {/* <Route exact path="/test" component={Test} /> */}
                </Switch>
            </Router>
        </div>
    );
}

export default App;
