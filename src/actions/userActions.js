let devURL  = 'http://localhost:3000/'
let prodURL = 'http://production.eba-dvi8bvt6.us-east-2.elasticbeanstalk.com/'

// export const obtainUser = (user) => ({ type: "SHOW_USER", payload: user });

// Fetch all users data
export const fetchUsersList = () => {
  return (dispatch) => {
    dispatch({ type: "LOADING", payload: true });
    fetch(`${prodURL}users`)
    // fetch("http://localhost:3000/users")
    // .then((response) => console.log("from actions: ", response.json()))
    .then((response) => response.json())
    // .then((data) => console.log("from actions: ", data))
    .then((data) => dispatch({ type: "SET_USERS", users: data }))
    .catch((error) => console.log(error));
  };
};

// Fetch a single user data with async/await
export const fetchUserData = (userID) => {
  return async (dispatch) => {
    dispatch({ type: "LOADING", payload: true });
    const response = await fetch(`${prodURL}users/${userID}`)
    // const response = await fetch(`http://localhost:3000/users/${userID}`)
    const data = await response.json()
    // console.log("userActions/fetchUserData data", data)
    dispatch({ type: "GET_USER", user: data })
    // .catch((error) => console.log(error));
  }
};

export function editUser(user) {
  // console.log("userActions/editUser/user: ", user)
  return (dispatch) => {
    dispatch({ type: "LOADING", payload: true });
    fetch(`${prodURL}users/${user.id}`, {
    // fetch(`http://localhost:3000/users/${user.id}`, {
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
            payload: "ERROR: Unable to save user edits.",
          });
        }
        return response.json();
      })
      .then((user) => {
        dispatch({ type: "LOADING", payload: false });
        dispatch({ type: "ERROR", payload: null });
        dispatch({ type: "EDIT_USER", user: user });
      })
      .catch((err) => {
        dispatch({ type: "LOADING", payload: false });
        dispatch({ type: "ERROR", payload: err.message });
      });
  };
}

// Create a new user
export function createNewUser (user) {
  console.log("userActions/createNewUser/user: ", user)
  return (dispatch) => {
    dispatch({ type: "LOADING", payload: true });
    fetch(`${prodURL}users`, {
    // fetch(`http://localhost:3000/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    })
    .then(response => console.log(response))
    .then((response) => { 
      if (response.ok === false) {
        throw dispatch({
          type: "ERROR",
          payload: "ERROR: Unable to save user edits.",
        });
      }
      return response.json();
    })
    .then((user) => {
      dispatch({ type: "LOADING", payload: false });
      dispatch({ type: "ERROR", payload: null });
      dispatch({ type: "ADD_USER", user: user });
    })
    .catch((err) => {
      dispatch({ type: "LOADING", payload: false });
      dispatch({ type: "ERROR", payload: err.message });
    });
  }
}

// Fetch a single user events data with async/await
export const fetchUserEventsData = (userid) => {
  return async (dispatch) => {
    dispatch({ type: "LOADING", payload: true });
    const response = await fetch(`http://production.eba-dvi8bvt6.us-east-2.elasticbeanstalk.com/users/${userid}`)
    // const response = await fetch(`http://localhost:3000/users/${userid}`)
    const data = await response.json()
    // console.log("userActions/fetchUserData data", data)
    dispatch({ type: "GET_USER_EVENTS", user_events: data.events })
    // .catch((error) => console.log(error));
  }
};



// Fetch a single user data
// export const fetchUserData = (userID) => {
//   return (dispatch) => {
//     dispatch({ type: "LOADING", payload: true });
//     fetch(`http://localhost:3000/users/${userID}`)
//     .then((response) => response.json())
//     // .then(data => console.log(data))
//     .then((data) => dispatch({ type: "GET_USER", user: data }))
//     .catch((error) => console.log(error));
//   }
// };

    // const fetchData = async () => {
    //   await fetch(`http://localhost:3000/users/${props.match.params.id}`)
    //   .then((response) => response.json())
    //   .then((data) => setData(data))
    //   .catch((error) => console.log(error))
    // } 



// return async dispatch => {
//   const response = await fetch("https://api.icndb.com/jokes/random");
//   const joke = await response.json();
//   dispatch({ type: "SET_JOKE", joke });
// };


    // fetch(`http://localhost:3000/users/6`)
      //   if (response.ok === false) {
      //     throw dispatch({
      //       type: "ERROR",
      //       payload: "could not find the data for that resource",
      //     });
      //   }
      //   return response.json();
      // })
      // .then((data) => {
      //   console.log("data: ", data)
      //   dispatch({ type: "SET_USER", user: data });
      // })
      // .catch((error) => {
      //   dispatch({ type: "LOADING", payload: false });
      //   dispatch({ type: "ERROR", payload: error.message });
      // });

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
