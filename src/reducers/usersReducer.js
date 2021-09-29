const initialState = {
  loading: true,
  users: [{
    first_name: "John",
    last_name: "Doe",
    phone: "1234567890",
    email: "john@doe.com",
    city: "London",
  }],
  // showUser: {},
  // currentUser: null,
  error: false,
};

const usersReducer = (state = initialState, action) => {

  switch (action.type) {

    case "LOADING":
      return { ...state, loading: true };

    case "SET_USERS":
      console.log("SET_USERS: ", state)
      return { ...state, loading: false, users: [...state.users, action.payload] }

    // case "ADD_USER":
    //     return { ...state, users: [...state.users, action.user] };
    // case "SHOW_USER":
    //     return { ...state, showUser: action.data };
    // case "DELETE_USER":
    //     return { ...state, currentUser: null };
    // case "CURRENT_USER":
    //     return { ...state, currentUser: action.data };
    // case "EDIT_CURRENT_USER":
    //     return { ...state, currentUser: action.data };
    // case "ERROR":
    //   return { ...state, error: action.data };
    default:
      return state;
  }
};

export default usersReducer;
