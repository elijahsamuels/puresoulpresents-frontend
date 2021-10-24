const initialState = {
  loading: true,
  event: {
    // id: 123,
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip_code: "",
  },
  events: [
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
  // showevent: {},
  // currentevent: null,
  error: false,
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };

    case "SET_EVENTS":
      return { ...state, loading: false, events: action.events };

    case "GET_EVENT":
      // console.log("action.event:", action.event)
      // console.log("state:", state)
      return { ...state, loading: false, event: action.event };

    case "EDIT_EVENT":
      return { ...state, loading: false, event: action.event };

    case "ADD_EVENT":
        return { ...state, loading: false, events: [...state.events, action.event] };

    case "ERROR":
      return { ...state, error: action.data };
    // case "SHOW_EVENT":
    //     return { ...state, showevent: action.data };
    // case "DELETE_EVENT":
    //     return { ...state, currentevent: null };
    // case "CURRENT_EVENT":
    //     return { ...state, currentevent: action.data };

    default:
      return state;
  }
};

export default eventsReducer;
