import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
import { fetchEventData, fetchEventsList } from "../actions/eventActions";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@mui/material/CircularProgress";
// import TextsmsIcon from "@mui/icons-material/Textsms";
// import PhoneIcon from "@mui/icons-material/Phone";
// import EmailIcon from "@mui/icons-material/Email";
// import Tooltip from "@mui/material/Tooltip";

const useStyles = makeStyles({
  // table: {
  //     minWidth: 3,
  // },
});

function EventList(props) {
  const classes = useStyles();

  // console.log("props.events.events: ", props.events.events);
  // console.log("props.fetcheventsList: ", props.fetcheventsList());

  const eventTernary = (eventData, missingItem) => {
    return eventData.localItem
      ? { true: eventData.localItem }
      : {
          false: (
            <font color="red" key={"items_missing_for_event_" + eventData.id}>
              Missing {missingItem}
            </font>
          ),
        };
  };

  const editEventButton = (eventData) => {
    // eventData.localItem = eventData.id;
    let editEventLink = "events/" + eventData.id;
    return (
      <Button
        variant="contained"
        size="small"
        disableElevation
        href={editEventLink}
        // onClick={() => {
        //   handleClick(eventData.id);
        // }}
      >
        Edit
      </Button>
    );
  };

  const eventDate = (eventData) => {
    let missingItem = "Date";
    eventData.localItem = eventData.event_date;
    return Object.values(eventTernary(eventData, missingItem));
  };

  const eventLocation = (eventData) => {
    let missingItem = "Location";
    eventData.localItem = eventData.city + ", " + eventData.state;
    return Object.values(eventTernary(eventData, missingItem));
  };

  const eventPaymentStatus = (eventData) => {
    // let missingItem = "Payment";

    if (eventData.total_amount > eventData.deposit_amount) {
      return <font color="red">Monies due!</font>;
    } else {
      return <font color="green">All paid!</font>;
    }
  }

  const eventBandSize = (eventData) => {
    // let missingItem = "Band Size";
    // let bandSize = 5
    let musicianCount = 4

    if (musicianCount > eventData.band_size) {
      return <font color="red">{musicianCount}</font>;
    } else {
      return <font color="green">{eventData.band_size}</font>;
    }
  }

  const eventPrimaryContact = (eventData) => {
    let missingItem = "Primary Contact";
    let primaryContact = "Jane Doe"
    // let primaryContactPhone = "123-456-7890"

    if (primaryContact) {
      return <font >{primaryContact}</font>;
    } else {
      return <font color="red">{missingItem}</font>;
    }
  }

  const eventType = (eventData) => {
    // let missingItem = "Event Type/Program";
    // let event_type = "candlelight" // others could be more generic: wedding, concert, private, etc.
    // let program = "Ella Fitzgerald"

    if (eventData.event_type) {
      return <font >{eventData.event_type} - <em>{eventData.program}</em></font>;
    } else  {
      return <font color="red">Not Selected</font>;
    }
  }

  //   eventData.localItem = eventData.balance_amount;
  //   return Object.values(eventTernary(eventData, missingItem));
  // };

  // const eventLocation = (eventData) => {
  //   let missingItem = "City";
  //   eventData.localItem = eventData.city;
  //   return Object.values(eventTernary(eventData, missingItem));
  // };

  // const eventPrimaryContactTooltip = (eventData) => {
  //   if (!!eventData.primary_contact) {
  //     return eventData.primary_contact
  //   } else {
  //     return "Contact info is missing"
  //   }
  // };

  const missingData = (eventData) => {
    // filter out event items that are undefined, and list those items. undefinded items are missing,
    // once the list is generated, use this info to send event an email requesting that info.

    let items = [];

    // check for:
    // event_date
    // city
    // state
    // band_size === musician_count
    // hire_order_recevied
    // invoice_sent
    // invoice_paid
    // musician_invoices_received?
    // musician_invoices_sent?
  


    // if (eventPhone(eventData).props === undefined) {
    //   items.push("Phone");
    // }

    // if (eventEmail(eventData).props === undefined) {
    //   items.push("Email");
    // }

    // if (eventInstrument(eventData).props === undefined) {
    //   items.push("Instrument");
    // }

    // if (eventCity(eventData) === undefined) {
    //   items.push("City");
    // }

    // if (eventBio(eventData).props === undefined) {
    //   items.push("Bio");
    // }

    // if (eventW9URL(eventData).props.href === undefined) {
    //   items.push("W9");
    // }

    // if (eventPhoto(eventData).props.alt === "Default Image") {
    //   items.push("Photo");
    // }

    if (items.length > 0) {
      let missingItemsList = items.map((item) => (
        <li
          id={"event_" + (eventData.id + "_" + item).toLowerCase()}
          key={"event_" + (eventData.id + "_" + item).toLowerCase()}
        >
          {item}
        </li>
      ));
      return <font color="red">Missing: {missingItemsList}</font>;
    } else {
      return <font color="green">Good</font>;
    }
  };

  // const sendeventEmailAboutMissingData = (eventData) => {
  //   // console.log("missingData Func: ", missingData(eventData).props.children[1] === "o")
  //   if (missingData(eventData).props.children[1] === "o") {
  //     // console.log("All good! Nothing to email about")
  //   } else {
  //     let missingInfo = missingData(eventData).props.children[1];

  //     let emailLink =
  //       "mailto:" +
  //       Object.values(eventEmail(eventData)) +
  //       "?cc=elijah@puresoulpresents.com, billy@puresoulpresents.com" +
  //       "&subject=" +
  //       encodeURIComponent("PureSoul Presents - Missing Musician Info") +
  //       "&body=" +
  //       encodeURIComponent(
  //         "Email body here \n We're missing the following information from you: "
  //       ) +
  //       missingInfo;
  //     // console.log(missingData(eventData).props.children[1])
  //     // console.log(Object.values(eventEmail(eventData))[0])
  //   }

  //   // window.location.href = emailLink;
  // };

  //         let email = document.getElementById(`${eventData.Email}`);
  //         let subject = ('PureSoul Presents - Missing Musician Info');
  //         let body = ('Hello! We seem to be missing some important infomation about you.');
  //         document.write('<a href="mailto:' + '?subject=' + subject + '&body=' + body + '>' + 'Click here to send email as well' + '<'+'/a>');
  // }
  // const emaileventAboutMissingData = (eventData) => {
  //     missingData(eventData)

  const [localevents, setLocalevents] = useState(null);

  useEffect(() => {
    setLocalevents(props.fetchEventsList());
  }, []);

  return !!props.loading ? (
    // If the state is still loading
    <div className="loading">
      UGH! WE'RE LOADING!
      <CircularProgress color="error" />
    </div>
  ) : (
    // If the state is not loading
    <div className="eventList">
      <h1 align="center">PureSoul Presents Musician List</h1>
      {/* <button onClick={handleClick}>Next</button> */}

      <TableContainer
        key={"tableContainer"}
        id={"tableContainer"}
        component={Paper}
      >
        <Table
          key={"events_table"}
          id={"events_table"}
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
                width="10%">
                All Good?
              </TableCell>

              <TableCell
                key={"edit_event"}
                id={"edit_event"}
                align="center"
                width="10%">
                Edit
              </TableCell>

              <TableCell
                key={"event_date"}
                id={"event_date"}
                align="center"
                width="10%">
                Event Date
              </TableCell>

              <TableCell 
                key={"event_location"} 
                id={"event_location"} 
                align="center" 
                width="10%">
                Location
              </TableCell>

              <TableCell 
                key={"event_type"} 
                id={"event_type"} 
                align="center" 
                width="10%">
                Type/Program
              </TableCell>

              <TableCell 
                key={"event_payment_status"} 
                id={"event_payment_status"} 
                align="center" 
                width="10%">
                Payment Status
              </TableCell>

              <TableCell 
                key={"event_band_size"} 
                id={"event_band_size"} 
                align="center" 
                width="10%">
                Band Size
              </TableCell>

              <TableCell 
                key={"event_primary_contact"} 
                id={"event_primary_contact"} 
                align="center" 
                width="10%">
                {/* <Tooltip title={eventPrimaryContactTooltip(event)}> */}
                {/* <Tooltip title={"Fix this later"}> */}
                  Primary Contact
                {/* </Tooltip> */}
              </TableCell>

            </TableRow>
          </TableHead>

          <TableBody key={"table_body"} id={"table_body"}>
            {/* {console.log("props: ", props.events)} */}
            {props.events.map((event) => (

              <TableRow
                key={"event_" + event.id + "_row"}
                id={"event_" + event.id + "_row"}
                >
                <TableCell
                  key={"event_" + event.id + "_missingData"}
                  id={"event_" + event.id + "_missingData"}
                  align="left"
                >
                    {missingData(event)}
                  <br />
                </TableCell>

                <TableCell
                  align="center"
                  id={"edit_" + event.id + "_event"}
                  key={"edit_" + event.id + "_event"}
                >
                  {editEventButton(event)}
                </TableCell>

                <TableCell
                  align="center"
                  id={"event_" + event.id + "_date"}
                  key={"event_" + event.id + "_date"}
                >
                  {eventDate(event)}
                </TableCell>

                <TableCell
                  align="center"
                  id={"event_" + event.id + "_location"}
                  key={"event_" + event.id + "_location"}
                >
                  {eventLocation(event)}
                </TableCell>

                <TableCell
                  align="center"
                  id={"event_" + event.id + "_type"}
                  key={"event_" + event.id + "_type"}
                >
                  {eventType(event)}
                </TableCell>

                <TableCell
                  align="center"
                  id={"event_" + event.id + "_payment_status"}
                  key={"event_" + event.id + "_payment_status"}
                >
                  {/* <Tooltip title={eventBioTooltip(event)}> */}
                    <span>{eventPaymentStatus(event)}</span>
                  {/* </Tooltip> */}
                </TableCell>

                <TableCell
                  align="center"
                  id={"event_" + event.id + "_band_size"}
                  key={"event_" + event.id + "_band_size"}
                >
                  {/* <Tooltip title={eventBioTooltip(event)}> */}
                    <span>{eventBandSize(event)}</span>
                  {/* </Tooltip> */}
                </TableCell>

                <TableCell
                  align="center"
                  id={"event_" + event.id + "_primary_contact"}
                  key={"event_" + event.id + "_primary_contact"}
                >
                  {/* <Tooltip title={eventBioTooltip(event)}> */}
                    <span>{eventPrimaryContact(event)}</span>
                  {/* </Tooltip> */}
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
  console.log("state.events.events: ",state.events.events);
  return {
    loading: state.loading,
    events: state.events.events,
    event: state.event,
  };
};

export default connect(mapStateToProps, { fetchEventsList, fetchEventData })(EventList);