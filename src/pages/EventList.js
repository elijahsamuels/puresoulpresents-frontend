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
import TextField from '@mui/material/TextField';
import LoadingCircularProgress from '../components/staticComponents/LoadingCircularProgress.js';
import Box from '@mui/material/Box';
import eventTypesFunction from "../components/eventComponents/EventTypes"
// import { DataGrid } from '@mui/x-data-grid';
import EventDictionary from "../../src/dictionaries/EventDictionary";
import SettingsIcon from '@mui/icons-material/Settings';


import Tooltip from "@mui/material/Tooltip";
import { green } from '@mui/material/colors';
import { blue } from '@mui/material/colors';
import { orange } from '@mui/material/colors';
import { red } from '@mui/material/colors';
import { yellow } from '@mui/material/colors';

const green50 = green[50]
const green100 = green[100]
const green200 = green[200]
const green300 = green[300]
const green400 = green[400]
const blue50 = blue[50]
const orange50 = orange[50]
const red50 = red[50]
const yellow50 = yellow[50]

const useStyles = makeStyles({
  // table: {
  //     minWidth: 3,
  // },
});

function EventList(props) {
  const classes = useStyles();
  const [searchLocationText, setSearchLocationText] = useState("")
  const [searchContactText, setSearchContactText] = useState("")
  const [searchEventType, setSearchEventType] = useState("")
  const [searchDate, setSearchDate] = useState("")
  const [searchInquiryStatus, setSearchInquiryStatus] = useState("")
  
  const [eventCount, setEventCount] = useState(0)

  // const eventCounter = (theEvent) => {
  //   let count = 0
  //   for (let i = 0; !!theEvent; i++){
  //     count + 1
  //     i++
  //   }
  // }

  const eventTernary = (eventData, missingItem) => {
    return eventData.localItem
      ? { true: eventData.localItem }
      : { false: (
            <font color="red" key={"items_missing_for_event_" + eventData.id}>
              Missing {missingItem}
            </font>
          ),
        };
  };

  const editEventButton = (eventData) => {
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
        <SettingsIcon fontSize={"small"}/>
        {/* {"  ID: "}{eventData.id} */}
      </Button>
    );
  };

  const eventDate = (eventData) => {
    let missingItem = "Date";
    // console.log("eventData.event_date:", eventData.event_date)
    eventData.localItem = new Date(eventData.event_date).toLocaleString('en-US', { weekday: 'short', day: 'numeric', year: 'numeric', month: 'short'});
    return Object.values(eventTernary(eventData, missingItem));
  };

  const eventLocation = (eventData) => {
    let missingItem = "Location";
    eventData.localItem = `${eventData.city}, ${eventData.state}`;
    return Object.values(eventTernary(eventData, missingItem));
  };

  const eventPaymentStatus = (eventData) => {
    // let missingItem = "Payment";
    if (eventData.total_amount > eventData.deposit_amount) {
      return <font color="red">Monies due!</font>;
    } else {
      return <font color="green">All paid! <div>${eventData.total_amount}</div></font>;
    }
  }

  const eventInquiryStatus = (eventData) => {

    switch (eventData.status) {
      case "Inquiry": // Inquiry
      // case "1": // Inquiry
      // return <font color="green">{eventData.status}</font>;
        // return <Box sx={{ p: 0.8, border: '2px dashed green', borderRadius: 2 }}>{eventData.status}</Box>;
        return <Box sx={{ p: 0.8, border: '2px dashed green', borderRadius: 2 }}>Inquiry</Box>;

        // case "2": // Quote
      case "Quote": // Quote
        return <Box sx={{ p: 0.8, border: `2px solid ${green100}`, bgcolor: green100, borderRadius: 2  }}>Quote</Box>;
      
      // case "3": // Tentative Booking
      case "Tentative Booking": // Tentative Booking
        return <Box sx={{ p: 0.8, border: `2px solid ${green50}`, bgcolor: green50, borderRadius: 2  }}>Tentative Booking</Box>;
      
      // case "4": // Tentative Expired
      case "Tentative Expired": // Tentative Expired
        return <Box sx={{ p: 0.8, border: `2px solid ${yellow50}`, bgcolor: yellow50, borderRadius: 2  }}>Tentative Expired</Box>;
      
      // case "5": // Awaiting Deposit
      case "Awaiting Deposit": // Awaiting Deposit
        return <Box sx={{ p: 0.8, border: `2px solid ${green200}`, bgcolor: green200, borderRadius: 2  }}>Awaiting Deposit</Box>;
      
      // case "6": // Confirmed
      case "Confirmed": // Confirmed
        return <Box sx={{ p: 0.8, border: `2px solid ${green400}`, bgcolor: green400, borderRadius: 2  }}>Confirmed</Box>;
  
      // case "7": // Green Light
      case "Green Light": // Green Light
        return <Box sx={{ p: 0.8, border: `2px solid ${green400}`, bgcolor: green400, borderRadius: 2  }}>Green Light</Box>;
        
      // case "8": // Completed
      case "Completed": // Completed
        return <Box sx={{ p: 0.8, border: `2px solid ${blue50}`, bgcolor: blue50, borderRadius: 2  }}>Completed</Box>;
        
      // case "9": // TBD
      case "TBD": // TBD
        return <Box sx={{ p: 0.8, border: `2px solid ${orange50}`, borderRadius: 2  }}>TBD</Box>;
      
      // case "10": // Postponed
      case "Postponed": // Postponed
        return <Box sx={{ p: 0.8, border: `2px solid ${orange50}`, bgcolor: orange50, borderRadius: 2  }}>Postponed</Box>;
      
      // case "11": // Cancelled
      case "Cancelled": // Cancelled
        return <Box sx={{ p: 0.8, border: `2px solid ${red50}`, bgcolor: red50, borderRadius: 2  }}>Cancelled</Box>;

      default: return <font color="red">Unknown</font>;
  
    }
  }

  const eventBandSize = (eventData) => {
    let missingItem = "Missing Musicians";
    let musicianCount = eventData.users?.length || 0

    if (musicianCount < eventData.band_size) {
      return <font color="red">{musicianCount}<br />(Need {eventData.band_size - musicianCount})</font>;
    } else if (eventData.band_size == null) {
      return <font color="red">Band size missing</font>;
    } else {
      return <font color="green">{eventData.band_size}<br />Complete</font>;
    }
  }

  const eventPrimaryContact = (eventData) => {
    let missingItem = "Primary Contact";
    let primaryContact = `${eventData.primary_contact_first_name} ${eventData.primary_contact_last_name}`

    if (primaryContact) {
      return <font >{primaryContact}</font>;
    } else {
      return <font color="red">{missingItem}</font>;
    }
  }

// if the event_type is wedding, list the event type but not program
// else list the event type AND the program, if specified or "missing"

// if ((eventData.event_type.toLowerCase().includes(...'candlelight', ...'concert') === "candlelight concert") && program)

  // const eventType = (eventData) => {
  //   let missingItem = "Event Type";
  //   eventData.localItem = eventData.event_program;
  //   if (eventData.event_type){
  //     if (eventData.event_type.toLowerCase().includes('wedding' || 'private' || 'corporate'|| 'showcase'|| 'other'|| 'tbd') ) {
  //       return <div>{eventData.event_type} <br />Client Names Placeholder</div>
  //     } else if (eventData.event_type.toLowerCase().includes(...'candlelight', ...'concert') ) {
  //       return <div>{eventData.event_type}<br /><em>{eventProgram(eventData)}</em></div> 
  //     }
  //   } else {
  //     return Object.values(eventTernary(eventData, missingItem));
  //   }
  //   return false
  // }
  
  const dictionaryKeyReturnsValue = ( dictionary, key ) => {
    return Object.values(dictionary)[key-1]
  }

  const eventType = (eventData) => {
    
    switch (eventData.event_type) {
    
      case "1": // Wedding
      return `${dictionaryKeyReturnsValue(EventDictionary, eventData.event_type)}`
      
      case "2": // Corporate
      return `${dictionaryKeyReturnsValue(EventDictionary, eventData.event_type)}`
      
      case "3": // Candlelight Concert
      return `${dictionaryKeyReturnsValue(EventDictionary, eventData.event_type)} - ${eventData.program}`
      
      case "4": // Concert
      return `${dictionaryKeyReturnsValue(EventDictionary, eventData.event_type)}`
      
      case "5": // Showcase
      return `${dictionaryKeyReturnsValue(EventDictionary, eventData.event_type)}`
      
      case "6": // Other
      return `${dictionaryKeyReturnsValue(EventDictionary, eventData.event_type)}`
      
      case "7": // TBD
      return `${dictionaryKeyReturnsValue(EventDictionary, eventData.event_type)}`
      
      case "8": // TBD
      return `${dictionaryKeyReturnsValue(EventDictionary, eventData.event_type)}`
      
      case "9": // TBD
      return `${dictionaryKeyReturnsValue(EventDictionary, eventData.event_type)}`
      
      default: 
      return <font color="red">Unknown</font>;

    }
  }
      
    

  const eventProgram = (eventData) => {
    let missingItem = "Event Program";
    eventData.localItem = eventData.program;
    return Object.values(eventTernary(eventData, missingItem));
  }

  const eventMusicians = (eventData) => {
    let musicians = [];

    for (let i = 1; i < parseInt(eventData.band_size)+1; i++) {
      // console.log(eventData.musician_[i])
      // musicians.push(eventData.musician_+i)
    }
    // eventData.users.length
    // eventData.band_size

    return musicians
  }

  const missingData = (eventData) => {
    // filter out event items that are undefined, and list those items. undefinded items are missing,
    // once the list is generated, use this info to send event an email requesting that info.

    let items = [];

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
    <LoadingCircularProgress />
  ) : (
    // If the state is not loading
    <div className="eventList">
      <h1 align="center">PureSoul Presents Events List</h1>
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
                width="1%">
                All Good?
              </TableCell>

              <TableCell
                key={"edit_event"}
                id={"edit_event"}
                align="center"
                width="1%">
                Edit
              </TableCell>

              <TableCell
                key={"event_date"}
                id={"event_date"}
                align="center"
                width="4%">
                  <Tooltip 
                    placement="top" 
                    title={"Search by abbreviated day of the week or number for date, month or year."}>
                    <div>Date</div>
                  </Tooltip>

                <div>
                  <TextField
                    label="Filter"
                    id="outlined-size-small"
                    size="small"
                    placeholder="Date filter..." 
                    onChange={(e) => {setSearchDate(e.target.value)}}
                    autoComplete='off'

                  />
                </div>
              </TableCell>

              <TableCell 
                key={"event_location"} 
                id={"event_location"} 
                align="center" 
                width="5%">
                  <Tooltip placement="top" title={"Search city with upper or lowercase. Search state by using upper case state abbreviation (CA, FL, TX, etc.)"}>
                    <div>Location</div>
                  </Tooltip>
                <div>
                  <TextField
                    label="Filter"
                    id="outlined-size-small"
                    size="small"
                    placeholder="Location filter..." 
                    onChange={(e) => {setSearchLocationText(e.target.value)}}
                    autoComplete='off'

                  />
                </div>
              </TableCell>

              <TableCell 
                key={"event_type"} 
                id={"event_type"} 
                align="center" 
                width="5%">
                <div>Type/Program</div>            
                <div>
                  <TextField
                    label="Filter"
                    id="outlined-size-small"
                    size="small"
                    placeholder="Event Type filter..." 
                    onChange={(e) => {setSearchEventType(e.target.value)}}
                    autoComplete='off'

                  />
                </div>
              </TableCell>

              <TableCell 
                key={"event_payment_status"} 
                id={"event_payment_status"} 
                align="center" 
                width="1%">
                <div>Payment Status</div>
              </TableCell>

              <TableCell 
                key={"event_inquiry_status"} 
                id={"event_inquiry_status"} 
                align="center" 
                width="1%">
                <div>Inquiry Status</div>
                <div>
                  <TextField
                    label="Filter"
                    id="outlined-size-small"
                    size="small"
                    placeholder="Inquiry filter..." 
                    onChange={(e) => {setSearchInquiryStatus(e.target.value)}}
                    autoComplete='off'

                  />
                </div>

              </TableCell>

              <TableCell 
                key={"event_band_size"} 
                id={"event_band_size"} 
                align="center" 
                width="1%">
                <div>Band Size</div>
              </TableCell>

              {/* <Tooltip title={"Fix this later"} placement="top"> */}
              <TableCell 
                key={"event_primary_contact"} 
                id={"event_primary_contact"} 
                align="center" 
                width="5%">
                {/* <Tooltip title={eventPrimaryContactTooltip(event)}> */}
                  <div>Primary Contact</div>
                  <div>
                    <TextField
                      label="Filter"
                      id="outlined-size-small"
                      size="small"
                      placeholder="Contact filter..." 
                      onChange={(e) => {setSearchContactText(e.target.value)}}
                      autoComplete='off'
                    />
                </div>
              </TableCell>
              {/* </Tooltip> */}
            </TableRow>
          </TableHead>

          <TableBody key={"table_body"} id={"table_body"}>
            {props.events
              .sort((a,b) => a.primary_contact_first_name - b.primary_contact_first_name)
              
              // Location Filter
              .filter(val => {
                if (searchLocationText === "") {
                  return val;
                } else if (val.city.toLowerCase().includes(searchLocationText.toLowerCase()) ||
                val.state.toLowerCase().includes(searchLocationText.toLowerCase())){
                  return val;
                }
                return false;
              })

              // Primary Contact Name Filter
              .filter(val => {
                if (searchContactText === "") {
                  return val;
                } else if (val.primary_contact_first_name.toLowerCase().includes(searchContactText.toLowerCase()) ||
                val.primary_contact_last_name.toLowerCase().includes(searchContactText.toLowerCase())) {
                  return val;
                }
                return false;
              })

              // Event Type/Program Filter
              .filter(val => {
                if (searchEventType === "") {
                  console.log(eventType(val))
                  return val;
                } else if (eventType(val).toLowerCase().includes(searchEventType.toLowerCase())) {
                  console.log(eventType(val))
                  return val
                }

                return false
              })

              // Date Filter
              .filter(val => {
                if (searchDate === "") {
                  return val;
                } else if (new Date(val.event_date).toLocaleString('en-US', { weekday: 'short', day: 'numeric', year: 'numeric', month: 'short'}).toLowerCase().includes(searchDate.toLowerCase())) {
                  return val;
                }
                return false;
              })

              // Inquiry Status Filter
              .filter(val => {
                if (searchInquiryStatus === "") {
                  return val;
                } else if (val.status.toLowerCase().includes(searchInquiryStatus.toLowerCase())) {
                  return val;
                }
                return false;
              })
              .map((event) => (
                
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
                  {/* <div>ID: {event.id}</div> */}
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
                  {console.log("event.event_type:", event.event_type)}
                  {/* {eventType(event), console.log("event.event_type", event.event_type)} */}
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
                  id={"event_" + event.id + "_inquiry_status"}
                  key={"event_" + event.id + "_inquiry_status"}
                >
                  {/* <Tooltip title={eventBioTooltip(event)}> */}
                    <span>{eventInquiryStatus(event)}</span>
                  {/* </Tooltip> */}
                </TableCell>

                <TableCell
                  align="center"
                  id={"event_" + event.id + "_band_size"}
                  key={"event_" + event.id + "_band_size"}
                >
                  <Tooltip title={eventMusicians(event)}>
                    <span>{eventBandSize(event)}</span>
                  </Tooltip>
                </TableCell>

                <TableCell
                  align="center"
                  id={"event_" + event.id + "_primary_contact"}
                  key={"event_" + event.id + "_primary_contact"}
                >
                  <Tooltip title={<span><font color="white">{event.primary_contact_phone || "Missing phone"}</font></span>}>
                    <span>{eventPrimaryContact(event)}</span>
                  </Tooltip>
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
  // console.log("state.events.events: ",state.events.events);
  return {
    loading: state.loading,
    events: state.events.events,
    event: state.event,
  };
};

export default connect(mapStateToProps, { fetchEventsList, fetchEventData })(EventList);