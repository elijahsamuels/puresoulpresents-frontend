import React from "react";
import { Link } from "react-router-dom";
import PureSoulLogo from "../images/puresoulpresents.png";

let user_id = 1

function Nav() {
  return (
    <div className="userDetails">
      <Link to="/">
      <img src={PureSoulLogo} alt="User" width="80" />
       </Link>
      <Link to="/">Home</Link>
      {" - "}
      <Link to="/eventlist">Event List</Link>
      {" - "}
      <Link to="/createevent">Create Event</Link>
      {" - "}
      <Link to="/userlist">User List</Link>
      {" - "}
      <Link to={`/users/${user_id}/events`}>User GigList</Link>
      {" - "}
      <Link to="/createuser">Create New User</Link>
      {" - "}
      <Link to="/contact">Contact</Link>
    </div>
  );
}

export default Nav;
