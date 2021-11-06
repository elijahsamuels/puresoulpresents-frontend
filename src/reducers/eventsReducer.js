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
    musician_1: "",
    musician_2: "",
    musician_3: "",
    musician_4: "",
    musician_5: "",
    musician_6: "",
    musician_7: "",
    musician_8: "",
    musician_9: "",
    musician_10: "",
    musician_11: "",
    musician_12: "",
    musician_13: "",
    musician_14: "",
    musician_15: "",
    musician_1_pay_rate: "",
    musician_1_invoice_paid: "",
    musician_1_invoice_received: "",
    musician_2_pay_rate: "",
    musician_2_invoice_paid: "",
    musician_2_invoice_received: "",
    musician_3_pay_rate: "",
    musician_3_invoice_paid: "",
    musician_3_invoice_received: "",
    musician_4_pay_rate: "",
    musician_4_invoice_paid: "",
    musician_4_invoice_received: "",
    musician_5_pay_rate: "",
    musician_5_invoice_paid: "",
    musician_5_invoice_received: "",
    musician_6_pay_rate: "",
    musician_6_invoice_paid: "",
    musician_6_invoice_received: "",
    musician_7_pay_rate: "",
    musician_7_invoice_paid: "",
    musician_7_invoice_received: "",
    musician_8_pay_rate: "",
    musician_8_invoice_paid: "",
    musician_8_invoice_received: "",
    musician_9_pay_rate: "",
    musician_9_invoice_paid: "",
    musician_9_invoice_received: "",
    musician_10_pay_rate: "",
    musician_10_invoice_paid: "",
    musician_10_invoice_received: "",
    musician_11_pay_rate: "",
    musician_11_invoice_paid: "",
    musician_11_invoice_received: "",
    musician_12_pay_rate: "",
    musician_12_invoice_paid: "",
    musician_12_invoice_received: "",
    musician_13_pay_rate: "",
    musician_13_invoice_paid: "",
    musician_13_invoice_received: "",
    musician_14_pay_rate: "",
    musician_14_invoice_paid: "",
    musician_14_invoice_received: "",
    musician_15_pay_rate: "",
    musician_15_invoice_paid: "",
    musician_15_invoice_received: "",
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
