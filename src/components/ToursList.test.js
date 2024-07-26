import { render, screen } from "@testing-library/react";
import ToursList from "./ToursList";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const mockTours = [
  {
    id: 1,
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

const mockState = {
  tours: {
    tours: mockTours,
    loading: false,
    error: null,
  },
};

const store = configureStore({
  reducer: {
    tours: (state = mockState.tours) => state,
  },
});

describe("Component Tour List", () => {
  test("Check the Heading", () => {
    render(
      <Provider store={store}>
        <ToursList />
      </Provider>
    );

    const linkElement = screen.queryByText(/List of Tours/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("Render the Tour Component from Mock State", () => {
    render(
      <Provider store={store}>
        <ToursList />
      </Provider>
    );

    mockTours.forEach((tour) => {
      const tourElement = screen.getByText(tour.name);
      expect(tourElement).toBeInTheDocument();
      const startDateElement = screen.getByText(tour.startDate);
      expect(startDateElement).toBeInTheDocument();
    });
  });

  test("Styling Tour", () => {
    render(
      <Provider store={store}>
        <ToursList />
      </Provider>
    );

    const headingElement = screen.queryByText(/List of Tours/i);
    expect(headingElement).toHaveStyle({ marginBottom: "10px" });
  });
});
