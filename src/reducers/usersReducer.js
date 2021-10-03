import { combineReducers } from 'redux'

const initialState = {
  loading: true,
  user: {},
  users: [
    {
      id: 123,
      first_name: "JohnTEST",
      last_name: "DoeTEST",
      phone: "1234567890",
      email: "johndoe@TEST.com",
      city: "LondonTEST",
    },
    {
      id: 456,
      first_name: "JaneTEST",
      last_name: "DoeTEST",
      phone: "0987654321",
      email: "janedoe@TEST.com",
      city: "BrisbaneTEST",
    },
  ],
  // showUser: {},
  // currentUser: null,
  error: false,
};


const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };

    case "SET_USERS":
      return { ...state, loading: false, users: action.users };

    case "SET_USER":
      return { ...state, loading: false, user: action.user };

    case "EDIT_USER":
      return { ...state, loading: false, user: action.data };

    case "ERROR":
      return { ...state, error: action.data };

    // case "ADD_USER":
    //     return { ...state, users: [...state.users, action.user] };
    // case "SHOW_USER":
    //     return { ...state, showUser: action.data };
    // case "DELETE_USER":
    //     return { ...state, currentUser: null };
    // case "CURRENT_USER":
    //     return { ...state, currentUser: action.data };

    default:
      return state;
  }
};


// combineReducers({ 
//   users: initialState.users,
//   selectedUser: usersReducer,
// })

export default usersReducer;
