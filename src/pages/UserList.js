import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
import { fetchUserData, fetchUsersList } from "../actions/userActions";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import userSamplePhoto from "../images/userSamplePhoto.png";
import TextsmsIcon from '@mui/icons-material/Textsms';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import LoadingCircularProgress from '../components/staticComponents/LoadingCircularProgress.js';

const useStyles = makeStyles({
  // table: {
  //     minWidth: 3,
  // },
});

function UserList(props) {
  const classes = useStyles();
  // const userRole = "fever" // props.user.role
  const userRole = "admin" // props.user.role

  const [searchCity, setSearchCity] = useState("")
  const [searchInstrument, setSearchInstrument] = useState("")
  const [searchPhone, setSearchPhone] = useState("")
  const [searchEmail, setSearchEmail] = useState("")
  const [searchName, setSearchName] = useState("")
  const [searchRating, setSearchRating] = useState("")

  const userTernary = (userData, missingItem) => {
    return userData.localItem
      ? { true: userData.localItem }
      : {
          false: (
            <font color="red" key={"items_missing_for_user_" + userData.id}>
              Missing {missingItem}
            </font>
          ),
        };
  };

  const editUserButton = (userData) => {
    // userData.localItem = userData.id;
    let editUserLink = "users/" + userData.id;
    return (
      <Button
        variant="contained"
        size="small"
        disableElevation
        href={editUserLink}
        // onClick={() => {
        //   handleClick(userData.id);
        // }}
      >
        Edit
      </Button>
    );
  };

  const userName = (userData) => {
    let missingItem = "Name";
    userData.localItem = userData.first_name + " " + userData.last_name;
    return Object.values(userTernary(userData, missingItem));
  };

  const userStaffRating = (userData) => {

    if (userData.user_staff_rating === "1"){
      return <font color="green"> {userData.user_staff_rating} </font>
    } else if (userData.user_staff_rating > 1){
      return <font color="red"> {userData.user_staff_rating} </font>
    }
    // let missingItem = "Staff Rating";
    // userData.localItem = userData.first_name + " " + userData.last_name;
    // return Object.values(userTernary(userData, missingItem));
  };

  const userPhone = (userData) => {
    let missingItem = "Phone";
    userData.localItem = userData.phone;
    let phoneNumber = userData.phone

    const phoneUser = (phoneNumber) => {
      return `tel:${phoneNumber}`;
    };

    const smsUser = (phoneNumber) => {
      return `sms:${phoneNumber}`;
    };

    if (userData.localItem) {
      return <div>
          {phoneNumber}
          <br />
          <a href={phoneUser(phoneNumber)}>
            <PhoneIcon />
          </a>
          {" "}
          <a href={smsUser(phoneNumber)}>
            <TextsmsIcon />
          </a>
        </div>
    } else {
      return Object.values(userTernary(userData, missingItem));
    }
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

  const userState = (userData) => {
    let missingItem = "State";
    userData.localItem = userData.state;
    return Object.values(userTernary(userData, missingItem));
  };

  const userBio = (userData) => {
    let missingItem = "Bio";
    userData.localItem = userData.bio;
    if (userData.localItem){
      // eventually make this a modal or something to open a preview of the bio
      return <font color="green">{missingItem}</font>
    } else {
      return Object.values(userTernary(userData, missingItem));
    }
  };

  const userBioTooltip = (userData) => {
    if (!!userData.bio) { 
      return userData.bio
    } else {
      return "Bio is missing"
    }
  }

  const userEmail = (userData) => {
    let missingItem = "Email";
    userData.localItem = userData.email;
    let userEmail = userData.email;

    const emailUser = (userEmail) => {
      return `mailto:${userEmail}`;
    };

    if (userData.localItem) {
      return <div>
        {userEmail} 
        <a href={emailUser(userEmail)}>
          <br /><EmailIcon />
        </a>
        </div>
        } else  {
      return Object.values(userTernary(userData, missingItem));
    }
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

  const userPhoto = (userData) => {
    // let missingItem = "Headshot";

    if (userData.photo) {
      // userData.localItem = userData.photo;
      return <img src={`${userData.photo}`} alt="User" height="50" width="50" />
    } else {
      return <img src={userSamplePhoto} alt="Default" height="50" width="50" />;
    }
  };

  const userPhotoThumbnails = (userData) => {
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

    if (userPhone(userData).props === undefined) {
      items.push("Phone");
    }

    if (userEmail(userData).props === undefined) {
      items.push("Email");
    }
    
    // if (userInstrument(userData).props === undefined) {
    //   items.push("Instrument");
    // }
    
    if (userCity(userData) === undefined) {
      items.push("City");
    }

    if (userBio(userData).props === undefined) {
      items.push("Bio");
    }

    // if (userW9URL(userData).props.href === undefined) {
    //   items.push("W9");
    // }

    if (userPhoto(userData).props.alt === "Default Image") {
      items.push("Photo");
    }

    if (items.length > 0) {
      let missingItemsList = items.map((item) => (
        <li
          id={"user_" + (userData.id + "_" + item).toLowerCase()}
          key={"user_" + (userData.id + "_" + item).toLowerCase()}
        >
          {item}
        </li>
      ));
      return <font color="red">Missing: {missingItemsList}</font>;
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

  const [localUsers, setLocalUsers] = useState(props.users.users);

  useEffect(() => {
    setLocalUsers(props.fetchUsersList());
  // }, [localUsers, props]);
  }, []);

  return !!props.loading ? (
    <LoadingCircularProgress />
  ) : (
    // If the state is not loading

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

              <TableCell
                key={"allgood"}
                id={"allgood"}
                align="left"
                width="10%"
              >
                All Good?
              </TableCell>

              {/* TODO: this ternary logic should be refactored to be reusable. */}
              {userRole === "admin" ? 
                <TableCell
                  key={"edit_user"}
                  id={"edit_user"}
                  align="center"
                  width="10%"
                >
                  Edit
                </TableCell>
               : "" }

              <TableCell key={"firstname"} id={"firstname"} align="center" width="10%">
                Name
                <TextField
                    label="Filter"
                    id="outlined-size-small"
                    size="small"
                    placeholder="Name filter..." 
                    onChange={(e) => {setSearchName(e.target.value)}}
                    autoComplete="disabled"
                  />
              </TableCell>

              <TableCell key={"user_staff_rating"} id={"user_staff_rating"} align="center" width="10%">
                  Staff Rating
                  <TextField
                    label="Filter"
                    id="outlined-size-small"
                    size="small"
                    placeholder="Rating filter..." 
                    onChange={(e) => {setSearchRating(e.target.value)}}
                    autoComplete="disabled"
                  />
              </TableCell>
              <TableCell key={"phone"} id={"phone"} align="center" width="10%">
                Phone
                <TextField
                    label="Filter"
                    id="outlined-size-small"
                    size="small"
                    placeholder="Phone filter..." 
                    onChange={(e) => {setSearchPhone(e.target.value)}}
                    autoComplete="disabled"
                  />
              </TableCell>
              <TableCell key={"email"} id={"email"} align="center" width="10%">
                Email
                <TextField
                    label="Filter"
                    id="outlined-size-small"
                    size="small"
                    placeholder="Email filter..." 
                    onChange={(e) => {setSearchEmail(e.target.value)}}
                    autoComplete="disabled"
                  />
              </TableCell>
              <TableCell key={"instrument"} id={"instrument"} align="center" width="10%">
                Instrument
                <TextField
                    label="Filter"
                    id="outlined-size-small"
                    size="small"
                    placeholder="Instrument filter..." 
                    onChange={(e) => {setSearchInstrument(e.target.value)}}
                    autoComplete="disabled"
                    disabled
                  />
              </TableCell>
              <TableCell key={"city"} id={"city"} align="center" width="10%">
                City
                <TextField
                    label="Filter"
                    id="outlined-size-small"
                    size="small"
                    placeholder="City filter..." 
                    onChange={(e) => {setSearchCity(e.target.value)}}
                    autoComplete="disabled"
                  />
              </TableCell>
              <TableCell key={"bio"} bio={"bio"} align="center" height="10">
                Bio
              </TableCell>
              <TableCell key={"w9"} id={"w9"} align="center" width="5%">
                W9
              </TableCell>
              <TableCell key={"headshot"} id={"headshot"} align="center">
                <span>Headshot</span>
              </TableCell>
            </TableRow>
          </TableHead>
            
          <TableBody key={"table_body"} id={"table_body"}>
            {/* {(localUsers || props.users.users).sort((a,b) => a.toString().localeCompare(b)) */}
             {props.users.users
             .sort((a,b) => a.first_name.toString().localeCompare(b.first_name))
            // City/State Filter
            .filter(val => {
              if (searchCity === "") {
                return val;
              } else if (val.city.toLowerCase().includes(searchCity.toLowerCase()) ||
              val.state.toLowerCase().includes(searchCity.toLowerCase())){
                return val;
              } else if (val.city === "") {
                return val;
              }
              return false;
            })
            // Instrument Filter
            .filter(val => {
              if (searchInstrument === "") {
                return val;
              } else if (val.instrument.toLowerCase().includes(searchInstrument.toLowerCase())){
                return val;
              } else if (val.instrument === "") {
                return val;
              }
              return false;
            })
            // Phone Filter
            .filter(val => {
              if (searchPhone === "") {
                return val;
              } else if (val.phone.toLowerCase().includes(searchPhone.toLowerCase())){
                return val;
              } else if (val.phone === "") {
                return val;
              }
              return false;
            })
            // Email Filter
            .filter(val => {
              if (searchEmail === "") {
                return val;
              } else if (val.email.toLowerCase().includes(searchEmail.toLowerCase())){
                return val;
              } else if (val.email === "") {
                return val;
              }
              return false;
            })
            // Name Filter
            .filter(val => {
              if (searchName === "") {
                return val;
              } else if (val.first_name.toLowerCase().includes(searchName.toLowerCase()) || val.last_name.toLowerCase().includes(searchName.toLowerCase())){
                return val;
              }
              return false;
            })
            // Staff Rating Filter
            .filter(val => {
              if (searchRating === "") {
                return val;
              } else if (val.user_staff_rating.includes(searchRating)){
                return val;
              // } else if (val.user_staff_rating === null ) {
              //   return val;
            // } else if ((val.user_staff_rating === ("" || null))) {
            //   return val;
              }
              return false;
            })
            .map((user) => (
              
              <TableRow
                key={"user_" + user.id + "_row"}
                id={"user_" + user.id + "_row"}
              >
                <TableCell
                  key={"user_" + user.id + "_missingData"}
                  id={"user_" + user.id + "_missingData"}
                  align="left"
                >
                  {missingData(user)}
                  <br />
                </TableCell>
                {userRole === "admin" ? 

                <TableCell
                  align="center"
                  id={"edit_" + user.id + "_user"}
                  key={"edit_" + user.id + "_user"}
                >
                  {editUserButton(user)}
                </TableCell>
                : ""}

                <TableCell
                  align="center"
                  id={"user_" + user.id + "_name"}
                  key={"user_" + user.id + "_name"}
                >
                  {userName(user)}
                </TableCell>
                <TableCell
                  align="center"
                  id={"user_" + user.id + "_staff_rating"}
                  key={"user_" + user.id + "_staff_rating"}
                >
                  {userStaffRating(user)}
                </TableCell>
                <TableCell
                  align="center"
                  id={"user_" + user.id + "_phone"}
                  key={"user_" + user.id + "_phone"}
                >
                  {userPhone(user)}
                </TableCell>
                <TableCell
                  align="center"
                  id={"user_" + user.id + "_email"}
                  key={"user_" + user.id + "_email"}
                >
                  {userEmail(user)}
                </TableCell>
                <TableCell
                  align="center"
                  id={"user_" + user.id + "_instrument"}
                  key={"user_" + user.id + "_instrument"}
                >
                  {userInstrument(user)}
                </TableCell>
                <TableCell
                  align="center"
                  id={"user_" + user.id + "_city"}
                  key={"user_" + user.id + "_city"}
                >
                  {userCity(user)}, {userState(user)}
                </TableCell>
                <TableCell
                  align="center"
                  id={"user_" + user.id + "_bio"}
                  key={"user_" + user.id + "_bio"}
                  width=""
                  height="10"
                >
                  <Tooltip title={userBioTooltip(user)}>
                    <span>{userBio(user)}</span>
                  </Tooltip>
                </TableCell>
                <TableCell
                  align="center"
                  id={"user_" + user.id + "_w9url"}
                  key={"user_" + user.id + "_w9url"}
                >
                  {userW9URL(user)}
                </TableCell>
                <TableCell
                  align="center"
                  id={"user_" + user.id + "_headshot"}
                  key={"user_" + user.id + "_headshot"}
                >
                  <span>{userPhoto(user)}</span>
                  <br />
                  {userPhotoThumbnails(user)}
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
  console.log("state.users: ",state.users);
  return {
    loading: state.loading,
    users: state.users,
    user: state.user,
  };
};

export default connect(mapStateToProps, { fetchUsersList, fetchUserData })(UserList);
