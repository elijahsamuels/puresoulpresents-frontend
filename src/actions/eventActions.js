let devURL  = 'http://localhost:3000/'
let prodURL = 'http://production.eba-dvi8bvt6.us-east-2.elasticbeanstalk.com/'

// Fetch all event data
export const fetchEventsList = () => {
  return (dispatch) => {
    dispatch({ type: "LOADING", payload: true });
    fetch(`${prodURL}events`)
    .then((response) => response.json())
    .then((data) => dispatch({ type: "SET_EVENTS", events: data }))
    .catch((error) => console.log(error));
  };
};

// Fetch a single event data with async/await
export const fetchEventData = (eventID) => {
  return async (dispatch) => {
    dispatch({ type: "LOADING", payload: true });
    // const response = await console.log("eventActions/fetchEventData data", eventID);
    // const response = await fetch(`http://localhost:3000/events/${eventID}`)
    const response = await fetch(`${prodURL}${eventID}`)
    const data = await response.json()
    dispatch({ type: "GET_EVENT", event: data })
    // .catch((error) => console.log(error));
  }
};

export function editEvent(event) {
  return (dispatch) => {
    dispatch({ type: "LOADING", payload: true });
    // fetch(`http://localhost:3000/events/${event.id}`, {
    fetch(`${prodURL}${event.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event }),
    })
      .then((response) => { 
        if (response.ok === false) {
          throw dispatch({
            type: "ERROR",
            payload: "ERROR: Unable to save event edits.",
          });
        }
        return response.json();
      })
      .then((event) => {
        dispatch({ type: "LOADING", payload: false });
        dispatch({ type: "ERROR", payload: null });
        dispatch({ type: "EDIT_EVENT", event: event });
      })
      .catch((err) => {
        dispatch({ type: "LOADING", payload: false });
        dispatch({ type: "ERROR", payload: err.message });
      });
  };
}

// Create a new event
export function createNewEvent (event) {
  return (dispatch) => {
    dispatch({ type: "LOADING", payload: true });
    fetch(`${prodURL}events`, {
    // fetch(`http://localhost:3000/events`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event }),
    })
    .then(response => console.log(response))
    .then((response) => { 
      if (response.ok === false) {
        throw dispatch({
          type: "ERROR",
          payload: "ERROR: Unable to save event edits.",
        });
      }
      return response.json();
    })
    .then((event) => {
      dispatch({ type: "LOADING", payload: false });
      dispatch({ type: "ERROR", payload: null });
      dispatch({ type: "ADD_EVENT", event: event });
    })
    .catch((err) => {
      dispatch({ type: "LOADING", payload: false });
      dispatch({ type: "ERROR", payload: err.message });
    });
  }
}