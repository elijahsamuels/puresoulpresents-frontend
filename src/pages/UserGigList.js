import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchUserData } from "../actions/userActions";
import { fetchUserEventsData } from "../actions/userActions";
import eventTypesFunction from "../components/eventComponents/EventTypes"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventAddress from "../components/staticComponents/EventAddress"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

/*

event_type: "5"
status: ""
edit link if admin
primary_contact_first_name: "Anna"
primary_contact_last_name: "Bach"
Accept/Decline/Cancel
iCal
Payment Status


DATE : event_date
EVENT TYPE : event_type
LOCATION : eventAddress(event)
CLIENT : primary_contact_first_name & primary_contact_last_name
CANCEL GIG? : need to build out logic
STATUS : status
PAY : user_events.amount
LEAD MUSICIAN : User.find_by_id(:musician_1).first_name & last_name
PRODUCER : need to add on event model
PAYMENT ACTIVITY : need to build out logic based on payments
iCAL : need to build out. add npm module
WORKSHEET : link_to_event


address1: "123 Main Street"
balance_amount: ""
band_size: 5
city: "Cupertino"
deposit_amount: "500"
doors_open_time: null
end_time: "11:00pm"
event_date: null
event_type: "5"
hire_order_file: ""
hire_order_recevied: true
id: 3
indoor: true
invoice_file: null
invoice_paid: false
invoice_sent: true
load_in_time: "4:00pm"
primary_contact_email: "anna@fever.com"
primary_contact_first_name: "Anna"
primary_contact_last_name: "Bach"
primary_contact_phone: "1234567890"
program: ""
set_1_start_time: null
set_2_start_time: null
set_list: ""
soundcheck_complete_time: null
soundcheck_time: ""
staff_notes: "You know who is brilliant"
start_time: "5:00pm"
state: "CA"
status: ""
total_amount: "2000"
updated_at: "2021-12-29T02:58:51.880Z"
venue_capacity: 150
venue_name: "The Place"
zip_code: "90231"

 */



function UserGigList(props) {
  const userid = props.match.params.id;
  const user_events = props.user_events
  const user = props.user
  
  // console.log("props.user_events: ", props.user_events);
  // console.log(props)
  // const [userEventsData, setUserEventsData] = useState(null);
  
  useEffect(() => {
    props.fetchUserEventsData(userid)
    props.fetchUserData(userid)
    // console.log("useEffect/props.fetchUserEventsData(userid): ", props.fetchUserEventsData(userid))
    // setUserEventsData(props.fetchUserEventsData(userid))
  }, [])

  console.log("user_events: ", user_events)
  console.log("user: ", user)

  const userAcceptOrDecline = (user) => {
    return <span>
        <a href="#accept" >
          < ThumbUpIcon color="success"/>
        </a>
        {" "}
        <a href="#decline" >
          < ThumbDownIcon color="error" />
        </a>
      </span>
  }



  // const eventAddress = (event) => {
  //   let baseGoogleMapsURL = "https://www.google.com/maps/place/"
  //   // https://www.google.com/maps/place/Main+St,+Cupertino,+CA+95014/
  //   let eventAddress = `${event.address1}+${event.city}+${event.state}+${event.zip_code}`
  //   let eventAddressString = `${baseGoogleMapsURL}${eventAddress}`
  //   return eventAddressString
  // }

  return (
    <div className="userGigList">

    <div align="right">
      <div>Gig list for {user.first_name} {user.last_name} </div>
      <div><a href={`http://localhost:3001/users/${user.id}`} ><SettingsApplicationsIcon fontSize="small" />Edit details</a></div>
      <div>Upcoming events: {user.events?.length}</div>
      <div>Upcoming income: TBD</div>
    </div>
        <br />
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="user-events-table">
        <TableHead >
          <TableRow>
            <TableCell align="center">Link</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Event Address</TableCell>
            <TableCell align="center">Event Type</TableCell>
            <TableCell align="center">Client</TableCell>
            <TableCell align="center">Accept/Decline</TableCell>
            <TableCell align="center">Event Status</TableCell>
            <TableCell align="center">Pay</TableCell>
            {/* <TableCell align="center">Band Lead</TableCell> */}
            {/* <TableCell align="center">Producer</TableCell> */}
            {/* <TableCell align="center">Payment Status</TableCell> */}
            {/* <TableCell align="center">iCal</TableCell> */}
            {/* <TableCell align="center">Worksheet</TableCell> */}

            {/* 
              DATE : event_date
              EVENT TYPE : event_type
              LOCATION : eventAddress(event)
              CLIENT : primary_contact_first_name & primary_contact_last_name
              CANCEL GIG? : need to build out logic
              STATUS : status
              PAY : user_events.amount
              LEAD MUSICIAN : User.find_by_id(:musician_1).first_name & last_name
              PRODUCER : need to add on event model
              PAYMENT ACTIVITY : need to build out logic based on payments
              iCAL : need to build out. add npm module
              WORKSHEET : link_to_event
            */}

          </TableRow>
        </TableHead>
        <TableBody>
          {user_events?.map((event) => (
            <TableRow
              key={event.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center"><a href={`http://localhost:3001/events/${event.id}`}>Click</a></TableCell>
              <TableCell align="center">{event.event_date}</TableCell>
              <TableCell component="th" scope="event" align="center">
                {event.address1} - {event.city}, {event.state} <a href={EventAddress(event)}><LocationOnIcon/></a>
              </TableCell>
              <TableCell align="center">{event.event_type}</TableCell>
              <TableCell align="center">{event.primary_contact_first_name} {event.primary_contact_last_name}</TableCell>
              <TableCell align="center">{userAcceptOrDecline()}</TableCell>
              <TableCell align="center">{event.status}</TableCell>
              <TableCell align="center">${event.musician_1_pay_rate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        
    </div>




  );
}

const mapStateToProps = (state) => {
  // console.log("state: ", state)
  return {
    loading: state.loading,
    user_events: state.users.user_events,
    user: state.users.user,
  }
};

// export default UserGigList;
export default connect(mapStateToProps, { fetchUserData, fetchUserEventsData })(UserGigList);