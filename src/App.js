import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EventDetails from "./pages/EventDetails";
import EventList from "./pages/EventList";
import UserDetails from "./pages/UserDetails";
import UserList from "./pages/UserList";
import CreateUser from "./pages/CreateUser";
import Contact from "./pages/Contact";
import Index from "./pages/Index";
import ErrorPage from "./pages/Error";
import Nav from "./components/Nav";

// import { Test } from "./pages/Test";
// import { getAllPureSoulPresentsMusicians } from "./actions/userActions";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/events/:id/" component={EventDetails} />
          <Route exact path="/eventlist" component={EventList} />
          <Route exact path="/users/:id/" component={UserDetails} />
          <Route exact path="/userlist" component={UserList} />
          <Route exact path="/createuser" component={CreateUser} />
          <Route exact path="/contact" component={Contact} />
          <Route component={ErrorPage} />
          {/* <Route exact path="/test" component={Test} /> */}
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    users: state.users,
  };
};

export default connect(mapStateToProps)(App);
