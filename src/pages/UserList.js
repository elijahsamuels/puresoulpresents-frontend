import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
// import { Link } from "r  eact-router-dom";
import { fetchMusicianData } from "../actions/userActions";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import userSamplePhoto from "../images/userSamplePhoto.png";

const useStyles = makeStyles({
  // table: {
  //     minWidth: 3,
  // },
});

function UserList () {
  const dispatch = useDispatch()
  const classes = useStyles();
  
  // console.log("dispatch: ", dispatch)
  // console.log("fetchMusicianData: ", dispatch(fetchMusicianData()))

  const userTernary = (userData, missingItem) => {
    return userData.localItem
      ? { true: userData.localItem }
      : { false: <font color="red" key={"items_missing_for_user_" + userData.id}>Missing {missingItem}</font> };
  };

  const editUser = (userData) => {
    // console.log(userData)
    userData.localItem = userData.id;
    let editUserLink = "user/"+userData.id+"/edit";
    return <Button variant="contained" size="small" disableElevation href={editUserLink} onClick={() => {
      handleClick();
    }}>
      Edit
    </Button>;
  };

  const handleClick = () => {
    // alert("userData.id: ", userData.id)
  };

  const userName = (userData) => {
    let missingItem = "Name";
    // console.log(userData)
    userData.localItem = userData.first_name + " " + userData.last_name;
    return Object.values(userTernary(userData, missingItem));
  };

  const userPhone = (userData) => {
    let missingItem = "Phone";
    userData.localItem = userData.phone;
    return Object.values(userTernary(userData, missingItem));
  };

  const userInstrument = (userData) => {
    let missingItem = "Instrument";
    userData.localItem = userData.instrument;
    return Object.values(userTernary(userData, missingItem));
  };

  const userCity = (userData) => {
    let missingItem = "City";
    userData.localItem = userData.city;
    return Object.values(userTernary(userData, missingItem));
  };

  const userBio = (userData) => {
    let missingItem = "Bio";
    userData.localItem = userData.bio;
    return Object.values(userTernary(userData, missingItem));
  };

  const userEmail = (userData) => {
    let missingItem = "Email";
    userData.localItem = userData.email;
    return Object.values(userTernary(userData, missingItem));
  };

  const userW9URL = (userData) => {
    let missingItem = "W9";

    if (userData["W9"] === undefined) {
      return <font color="red">Missing {missingItem}</font>;
    } else if (userData["W9"][0].url) {
      userData.localItem = userData["W9"][0].url;
      return (
        <a href={`${Object.values(userTernary(userData, missingItem))}`}>
          User {missingItem}
        </a>
      );
    }
  };

  const userHeadshot = (userData) => {
    // let missingItem = "Headshot";

    if (userData["Headshot"]) {
      userData.localItem = userData["Headshot"][0].url;
      return (
        <img src={`${userData["Headshot"][0].url}`} alt="User" width="100" />
      );
    } else {
      return <img src={userSamplePhoto} alt="User" width="100" />;
    }
  };

  const userHeadshotThumbnails = (userData) => {
    return userData["Headshot"] ? (
      <span>
        <a
          href={`${
            Object.values(userData["Headshot"][0]["thumbnails"])[0].url
          }`}
        >
          Small
        </a>{" "}
        <a
          href={`${
            Object.values(userData["Headshot"][0]["thumbnails"])[1].url
          }`}
        >
          Medium
        </a>{" "}
        <a
          href={`${
            Object.values(userData["Headshot"][0]["thumbnails"])[2].url
          }`}
        >
          Large
        </a>
      </span>
    ) : (
      false
    );
  };

  const missingData = (userData) => {
        // filter out user items that are undefined, and list those items. undefinded items are missing,
        // once the list is generated, use this info to send user an email requesting that info.
        
    let items = [];

    if (typeof userPhone(userData)[0] !== "string") {
      items.push("Phone");
    }

    if (typeof userEmail(userData)[0] !== "string") {
      items.push("Email");
    }

    if (!Array.isArray(userInstrument(userData)[0])) {
      items.push("Instrument");
    }

    if (typeof userCity(userData)[0] !== "string") {
      items.push("City");
    }

    if (typeof userBio(userData)[0] !== "string") {
      items.push("Bio");
    }

    if (userW9URL(userData).props.href === undefined) {
      items.push("W9");
    }

    if (userHeadshot(userData).props.src.includes("userSamplePhoto")) {
      items.push("Headshot");
    }

    if (items.length > 0) {
      let missingItemsList = items.map((item) => 
      <li 
        id={"user_" + (item + "_" + userData.id).toLowerCase()} 
        key={"user_" + (item + "_" + userData.id).toLowerCase()}
        >
          {item}
      </li>);
      return <font color="red">Items Missing: {missingItemsList}</font>;
    } else {
      return <font color="green">Good</font>;
    }
  };

  // const sendUserEmailAboutMissingData = (userData) => {
  //   // console.log("missingData Func: ", missingData(userData).props.children[1] === "o")
  //   if (missingData(userData).props.children[1] === "o") {
  //     // console.log("All good! Nothing to email about")
  //   } else {
  //     let missingInfo = missingData(userData).props.children[1];

  //     let emailLink =
  //       "mailto:" +
  //       Object.values(userEmail(userData)) +
  //       "?cc=elijah@puresoulpresents.com, billy@puresoulpresents.com" +
  //       "&subject=" +
  //       encodeURIComponent("PureSoul Presents - Missing Musician Info") +
  //       "&body=" +
  //       encodeURIComponent(
  //         "Email body here \n We're missing the following information from you: "
  //       ) +
  //       missingInfo;
  //     // console.log(missingData(userData).props.children[1])
  //     // console.log(Object.values(userEmail(userData))[0])
  //   }

  //   // window.location.href = emailLink;
  // };

  //         let email = document.getElementById(`${userData.Email}`);
  //         let subject = ('PureSoul Presents - Missing Musician Info');
  //         let body = ('Hello! We seem to be missing some important infomation about you.');
  //         document.write('<a href="mailto:' + '?subject=' + subject + '&body=' + body + '>' + 'Click here to send email as well' + '<'+'/a>');
  // }
  // const emailUserAboutMissingData = (userData) => {
    //     missingData(userData)

    const [localUsers, setLocalUsers] = useState(null);
    
    useEffect(() => {

      fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((payload) => setLocalUsers(payload) )
      .catch((error) => console.log(error));

      console.log("useEffect has run successfully")

      // dispatch(fetchMusicianData())
      // console.log("thing:", setLocalUsers(dispatch(fetchMusicianData())))
      // setLocalUsers(dispatch(fetchMusicianData()));
      // setLocalUsers(fetchMusicianData());
      // console.log("thing:", setLocalUsers(dispatch(fetchMusicianData())))
      // setLocalUsers([dispatch(fetchMusicianData())])
      // ************** setLocalUsers NEEDS AN ARRAY OF OBJECTS 
      // setLocalUsers([{
      //   first_name: "John",
      //   last_name: "Doe",
      //   phone: "1234567890",
      //   email: "john@doe.com",
      //   city: "London",
      // }])
    }, []);
    
              
              // const handleClick = () => {
                //   console.log("clicked!");
  //   // console.log(setPageUsers());
  //   // setPageUsers();
  // };
  // {console.log(props)}

  return (
    <div className="userList">

      <h1 align="center">PureSoul Presents Musician List</h1>
      {/* <button onClick={handleClick}>Next</button> */}

      <TableContainer
        key={"tableContainer"}
        id={"tableContainer"}
        component={Paper}
      >
        <Table
          key={"table"}
          id={"table"}
          className={classes.table}
          sx={{ minWidth: 650 }}
          size="small"
        >
          <TableHead key={"table_head"} id={"table_head"}>
            <TableRow key={"tableRow"} id={"tableRow"}>
              <TableCell key={"allgood"} id={"allgood"} align="left" width="10%">
                All Good?
              </TableCell>
              <TableCell key={"edit_user"} id={"edit_user"} align="center" width="10%">
                Edit
              </TableCell>
              <TableCell key={"firstname"} id={"firstname"} align="center" width="10%">
                Name
              </TableCell>
              <TableCell key={"phone"} id={"phone"} align="center" width="10%">
                Phone
              </TableCell>
              <TableCell key={"email"} id={"email"} align="center" width="10%">
                Email
              </TableCell>
              <TableCell key={"instrument"} id={"instrument"} align="center" width="10%">
                Instrument
              </TableCell>
              <TableCell key={"city"} id={"city"} align="center" width="10%">
                City
              </TableCell>
              <TableCell key={"bio"} bio={"bio"} align="center" height="10">
                Bio
              </TableCell>
              <TableCell key={"w9"} id={"w9"} align="center" width="5%">
                W9
              </TableCell>
              <TableCell key={"headshot"} id={"headshot"} align="center">
                Headshot
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody key={"table_body"} id={"table_body"}>

            {/* {localUsers && console.log("localUsers: ", localUsers)} */}

            {localUsers && localUsers.map((user) => (
              <TableRow key={"user_row_"+user.id } id={"user_row_"+user.id }>
              {/* {console.log("user: ", user)} */}
                  <TableCell
                    key={"user_missingData_" + user.id}
                    id={"userMissingData_" + user.id}
                    align="left"
                  >
                    {missingData(user)}
                    <br />
                    {/* {sendUserEmailAboutMissingData(user.fields)} */}
                    {/* <button onclick={sendUserEmailAboutMissingData(user)}>Send Email</button> */}
                  </TableCell>
                  <TableCell align="center" id={"edit_user_" + user.id} key={"edit_user_" + user.id} >{editUser(user)}</TableCell>
                  <TableCell align="center" id={"user_name_" + user.id} key={"user_name_" + user.id} >{userName(user)}</TableCell>
                  <TableCell align="center" id={"user_phone_" + user.id} key={"user_phone_" + user.id} >{userPhone(user)}</TableCell>
                  <TableCell align="center" id={"user_email_" + user.id} key={"user_email_" + user.id} >{userEmail(user)}</TableCell>
                  <TableCell align="center" id={"user_instrument_" + user.id} key={"user_instrument_" + user.id} >{userInstrument(user)}</TableCell>
                  <TableCell align="center" id={"user_city_" + user.id} key={"user_city_" + user.id} >{userCity(user)}</TableCell>
                  <TableCell align="center" id={"user_bio_" + user.id} key={"user_bio_" + user.id}  width="" height="10">{userBio(user)}</TableCell>
                  <TableCell align="center" id={"user_w9url_" + user.id} key={"user_w9url_" + user.id} >{userW9URL(user)}</TableCell>
                  <TableCell align="center" id={"user_headshot_" + user.id} key={"user_headshot_" + user.id} >
                    {userHeadshot(user)}
                    <br />
                    {userHeadshotThumbnails(user)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading, 
    users: state.users
  };
};

// connects to reducer
// const mapDispatchToProps = (dispatch) => {
//   return {
//     // fetchMusicianData: (data) => dispatch({type: 'SET_USERS', data})
//   }
// }

export default connect(mapStateToProps)(UserList);
// export default connect(mapStateToProps, { fetchMusicianData })(UserList);