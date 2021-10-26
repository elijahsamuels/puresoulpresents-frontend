const initialState = {
  loading: true,
  event: {
    // id: 123,
    event_date: "",
    address1: "",
    city: "",
    state: "",
    zip_code: "",
    end_time: "",
    start_time: "",
    load_in_time: "",
    soundcheck_time: "",
    total_amount: "",
    deposit_amount: "",
    balance_amount: "",
    created_at: "",
    updated_at: "",
  },
  events: [],
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
