const initialState = {
  tours: [],
  loading: false,
  error: null,
  nextTrip: null,
};

const toursReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_TOUR":
      return { ...state, tours: [...state.tours, action.payload] };
    case "EDIT_TOUR": {
      const updatedTours = state.tours.map((tour) =>
        tour.id === action.payload.id ? action.payload : tour
      );
      return { ...state, tours: [...updatedTours] };
    }
    case "FETCH_TOURS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_TOURS_SUCCESS":
      return { ...state, loading: false, tours: action.payload };
    case "FETCH_TOURS_FAILURE":
      return { ...state, loading: false, error: action.error };
    case "SET_NEXT_TRIP":
      return { ...state, nextTrip: action.payload };
    default:
      return state;
  }
};

export default toursReducer;
