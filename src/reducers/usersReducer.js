// import { combineReducers } from 'redux'

const initialState = {
  loading: true,
  user: {
    id: 123,
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip_code: "",
    account_name: "",
    ach_number: "",
    ach_routing_number: "",
    tax_first_or_business_name: "",
    tax_last_name: "",
    tax_address1: "",
    tax_address2: "",
    tax_city: "",
    tax_state: "",
    tax_zip: "",
    taxID: "",
    bio: "",
    staff_notes: "",
    nick_name: "",
    user_staff_rating: "",
    photo: "",
  },
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

    case "GET_USER":
      return { ...state, loading: false, user: action.user };

    case "GET_USER_EVENTS":
      // console.log("action.user_events:", action.user_events)
      return { ...state, loading: false, user_events: action.user_events };

    case "EDIT_USER":
      return { ...state, loading: false, user: action.user };

    case "ADD_USER":
        return { ...state, loading: false, users: [...state.users, action.user] };

    case "ERROR":
      return { ...state, error: action.data };
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
