import React from "react";
import { Link } from "react-router-dom";
import userSamplePhoto from "../images/puresoulpresents.png";

function Nav() {
  return (
    <div className="userDetails">
      <Link to="/">
      <img src={userSamplePhoto} alt="User" width="80" />
       </Link>
      <Link to="/">Home </Link>
      {" - "}
      <Link to="/userlist">User List</Link>
      {" - "}
      {/* <Link to="/userdetails">User Details</Link>
      {" - "} */}
      <Link to="/contact">Contact</Link>
    </div>
  );
}

export default Nav;
