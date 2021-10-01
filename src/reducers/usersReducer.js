const initialState = {
  loading: true,
  user: {},
  users: [
    {
      // first_name: "John",
      // last_name: "Doe",
      // phone: "1234567890",
      // email: "john@doe.com",
      // city: "London",
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
      return { ...state, loading: false, users: action.payload };
    // console.log("state: ",  state.users)
    // console.log("action.payload: ", state.users)
    // return { ...state, loading: false, users: state.users }
    // console.log("action.payload: ", action.payload)

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

export default usersReducer;
