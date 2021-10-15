// Action creator

// require("dotenv").config();
// export const obtainUser = (user) => ({ type: "SHOW_USER", payload: user });

// Fetch all user data
export const fetchUsersList = () => {
  return (dispatch) => {
    dispatch({ type: "LOADING", payload: true });
    fetch("http://localhost:3000/users")
    // .then((response) => console.log("from actions: ", response.json()))
    .then((response) => response.json())
    .then((data) => dispatch({ type: "SET_USERS", users: data }))
    .catch((error) => console.log(error));
  };
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

// Fetch a single user data with async/await
export const fetchUserData = (userID) => {
  return async (dispatch) => {
    dispatch({ type: "LOADING", payload: true });
    const response = await fetch(`http://localhost:3000/users/${userID}`)
    const data = await response.json()
    // console.log("userActions/fetchUserData data", data)
    dispatch({ type: "GET_USER", user: data })
    // .catch((error) => console.log(error));
  }
};

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

export function editUser(user) {
  console.log("userActions/editUser/user: ", user)
  return (dispatch) => {
    dispatch({ type: "LOADING", payload: true });
    fetch(`http://localhost:3000/users/${user.id}`, {
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
      .then((data) => {
        dispatch({ type: "EDIT_USER", user: data });
        dispatch({ type: "LOADING", payload: false });
        dispatch({ type: "ERROR", payload: null });
        console.log("data: ", data)
      })
      .catch((err) => {
        console.log("err: ", err)
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

// async function fetchUsersList() {
//     await fetch(`${allPureSoulPresentsMuisicians}`)
//     .then((response) => response.json())
//     .then(json => console.log(json))
//     .catch((error) => console.log(error));
//   }
