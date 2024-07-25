import { takeEvery, put, delay } from "redux-saga/effects";

const dummyTours = [
  {
    id: 1,
    name: "Karnataka Vacation",
    startDate: "2024-08-01",
    endDate: "2024-08-10",
    places: [
      { name: "Sri Chamundeshwari Temple", type: "Temple" },
      { name: "Om Beach, Gokarna", type: "Beach" },
      { name: "Rasta Cafe, Bangalore", type: "Restaurant" },
      { name: "Mysore Sand Sculpture Museum", type: "Museum" },
      { name: "Cubbon Park, Bangalore", type: "Park" },
      { name: "Phoenix Marketcity, Bangalore", type: "Shopping Mall" },
    ],
    budget: 15000,
    transport: "BUS",
  },
  {
    id: 2,
    name: "Goa Summer Vacation",
    startDate: "2024-12-15",
    endDate: "2024-12-25",
    places: [
      { name: "Baga Beach", type: "Beach" },
      { name: "Calangute Beach", type: "Beach" },
      { name: "Anjuna Beach", type: "Beach" },
    ],
    budget: 20000,
    transport: "Train",
  },
  {
    id: 3,
    name: "Banglore Wonderland",
    startDate: "2024-12-15",
    endDate: "2024-12-25",
    places: [
      { name: "Denver", type: "Temple" },
      { name: "ABS", type: "Beach" },
      { name: "BVCS", type: "Museum" },
    ],
    budget: 2000,
    transport: "Train",
  },
];

const findNextUpcomingTrip = (trips) => {
  const currentDate = new Date();
  const upcomingTrips = trips
    .filter((trip) => new Date(trip.startDate) > currentDate)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  return upcomingTrips.length > 0 ? upcomingTrips[0] : null;
};

function* fetchTours() {
  try {
    yield delay(1000);

    yield put({ type: "FETCH_TOURS_SUCCESS", payload: dummyTours });
    yield put({
      type: "SET_NEXT_TRIP",
      payload: findNextUpcomingTrip(dummyTours),
    });
  } catch (error) {
    yield put({ type: "FETCH_TOURS_FAILURE", error: "Failed to fetch tours" });
  }
}

export default function* toursSaga() {
  yield takeEvery("FETCH_TOURS_REQUEST", fetchTours);
}
