

// Action creator

// require("dotenv").config();

// export const obtainUser = (user) => ({ type: "SHOW_USER", payload: user });

export const fetchUsersList = () => {
  // Return an action
  return (dispatch) => {
    fetch("http://localhost:3000/users")
      // .then((response) => console.log("from actions: ", response.json()))
      .then((response) => response.json())
      // .then((payload) => payload)
      .then((data) => dispatch({ type: "SET_USERS", users: data }))
      // .then(responseData =>  dispatch({type: 'SET_USERS', users: responseData.data}))
      .catch((error) => console.log(error));
  };
};

// export function fetchUserData() {
//   // return (dispatch) => {
//   fetch("http://localhost:3000/users")
//     .then((response) => response.json())
//     .then((payload) => payload)
//     .catch((error) => console.log(error));
//   // };
// }

export const fetchUserData = (id) => {
  return (dispatch) => {
    dispatch({ type: "LOADING", payload: true });
    fetch(`/users/${id}`)
      .then((response) => {
        if (response.ok === false) {
          throw dispatch({
            type: "ERROR",
            payload: "could not find the data for that resource",
          });
        }
        return response.json();
      })
      .then((data) => {
        // dispatch(obtainUser(data));
        dispatch({ type: "LOADING", payload: false });
      })
      .catch((error) => {
        dispatch({ type: "LOADING", payload: false });
        dispatch({ type: "ERROR", payload: error.message });
      });
  };
};

export function editUser(user) {
  return (dispatch) => {
    dispatch({ type: "LOADING", payload: true });
    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    })
      .then((response) => {
        if (response.ok === false) {
          throw dispatch({
            type: "ERROR",
            payload: "ERROR: Unable to save edits.",
          });
        }
        return response.json();
      })
      .then((data) => {
        dispatch({ type: "EDIT_USER", payload: data });
        dispatch({ type: "LOADING", payload: false });
        dispatch({ type: "ERROR", payload: null });
      })
      .catch((err) => {
        dispatch({ type: "LOADING", payload: false });
        dispatch({ type: "ERROR", payload: err.message });
      });
  };
}

// .then((data) => dispatch({ type: "SET_USERS", payload: data }));

// return fetch("http://localhost:3000/users/", {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//   },
// })
// // .then((response) => console.log(response.json()))
//   .then((response) => response.json())
//   // .then((promiseResponse) => console.log(promiseResponse));
//   .then((promiseResponse) => dispatch({type: "GET", payload: promiseResponse}));

// .then((response) => console.log(response.json()))
// .then((promiseResponse) => setlocalUsers(promiseResponse));

// .then((response) => response.json())
// .then((payload) => dispatch({ type: "SET_USERS", payload }));
// };
// };

// const utf8 = require("utf8");
// const fetch = require("node-fetch");
// const airtableURL = "https://api.airtable.com/v0/";
// const puresoulAPI = process.env.REACT_APP_PURESOULAPI;
// const musiciansTable = process.env.REACT_APP_MUSICIANS_TABLE;
// const datesTable = "ALL%20DATES?";
// const puresoulAPIkey = process.env.REACT_APP_PURESOULAPIKEY;
// const allPureSoulPresentsMuisicians = `${airtableURL}${puresoulAPI}${musiciansTable}${puresoulAPIkey}`;
// const allPureSoulPresentsDates = `${airtableURL}${puresoulAPI}${datesTable}${puresoulAPIkey}`;

// const [localUsers, setlocalUsers] = useState(null);

// useEffect(() => {
//     base('ROSTER').select({
//         maxRecords: 200, // Selecting N records in Roster Only:
//         pageSize: 20,
//         view: "Roster Only"
//     }).eachPage(function page(records, fetchNextPage) {
//         // This function (`page`) will get called for each page of records.
//         setlocalUsers(records)
//     }, function done(err) {
//         if (err) { console.error(err`); return; }
//     }
//     )}, []);

// async function fetchUsersList() {
//     await fetch(`${allPureSoulPresentsMuisicians}`)
//     .then((response) => response.json())
//     .then(json => console.log(json))
//     .catch((error) => console.log(error));
//   }
