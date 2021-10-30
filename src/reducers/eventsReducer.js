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
    program: "",
    primary_contact_first_name: "",
    primary_contact_last_name: "",
    primary_contact_phone: "",
    primary_contact_email: "",
    band_size: "",
    hire_order_recevied: "",
    hire_order_file: "",
    invoice_sent: "",
    invoice_paid: "",
    invoice_file: "",
    musician_invoices_sent: "",
    doors_open_time: "",
    soundcheck_complete_time: "",
    set_1_start_time: "",
    set_2_start_time: "",
    venue_name: "",
    venue_capacity: "",
    status: "",
    indoor: "",
    last_updated_by: "",
    set_list: "",
    client_notes: "",
    staff_notes: "",
    musician01: "",
    musician02: "",
    musician03: "",
    musician04: "",
    musician05: "",
    musician06: "",
    musician07: "",
    musician08: "",
    musician09: "",
    musician10: "",
    musician11: "",
    musician12: "",
    musician13: "",
    musician14: "",
    musician15: "",
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
