import { fireEvent, render, screen } from "@testing-library/react";
import TourFormModal from "./TourFormModal";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";

const mockTourData = {
  name: "",
  startDate: "",
  endDate: "",
  places: [],
  placeName: "",
  placeType: "",
  budget: "",
  transport: "",
};

const mockStore = configureStore({
  reducer: {
    tours: (state = { tours: [] }, action) => {
      switch (action.type) {
        case "CREATE_TOUR":
          return { tours: [...state.tours, action.payload] };
        case "EDIT_TOUR":
          return {
            tours: state.tours.map((tour) =>
              tour.id === action.payload.id ? action.payload : tour
            ),
          };
        default:
          return state;
      }
    },
  },
});

describe("Tour Form Module", () => {
  test("Form Create Button", () => {
    let flag = "create";
    render(
      <Provider store={mockStore}>
        <TourFormModal
          open={true}
          onClose={jest.fn()}
          data={mockTourData}
          flag={flag}
        />
      </Provider>
    );
    const formCreateButtonElement = screen.queryByText("Create Tour");
    expect(formCreateButtonElement).toBeInTheDocument;
  });

  test("Form Edit Button", () => {
    let flag = "edit";
    render(
      <Provider store={mockStore}>
        <TourFormModal
          open={true}
          onClose={jest.fn()}
          data={mockTourData}
          flag={flag}
        />
      </Provider>
    );
    const formCreateButtonElement = screen.queryByText("Edit");
    expect(formCreateButtonElement).toBeInTheDocument;
  });

  test("Cancel button", () => {
    const mockOnClose = jest.fn();
    render(
      <Provider store={mockStore}>
        <TourFormModal
          open={true}
          onClose={mockOnClose}
          data={mockTourData}
          flag="create"
        />
      </Provider>
    );
    const cancelButton = screen.getByRole("button", {
      name: /Cancel/i,
    });
    expect(cancelButton).toBeVisible();

    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("Create New Tour", () => {
    const mockOnClose = jest.fn();
    render(
      <Provider store={mockStore}>
        <TourFormModal
          open={true}
          onClose={mockOnClose}
          data={mockTourData}
          flag="create"
        />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Tour Name/i), {
      target: { value: "New Tour" },
    });
    fireEvent.change(screen.getByLabelText(/Budget/i), {
      target: { value: "1500" },
    });
    fireEvent.change(screen.getByLabelText(/Place Name/i), {
      target: { value: "New Place" },
    });
    fireEvent.change(screen.getByLabelText(/Place Type/i), {
      target: { value: "Park" },
    });

    const addIcon = screen.getByLabelText(/addPlace/i);
    fireEvent.click(addIcon);

    const submitButton = screen.getByText(/Create Tour/i);
    expect(submitButton).toBeVisible();

    fireEvent.click(submitButton);

    console.log(mockStore.getState().tours.tours);
    expect(mockStore.getState().tours.tours).toHaveLength(1);
    expect(mockStore.getState().tours.tours[0].name).toEqual("New Tour");
    expect(mockStore.getState().tours.tours[0].budget).toEqual(1500);
    expect(mockStore.getState().tours.tours[0].places).toEqual([
      { name: "New Place", type: "Park" },
    ]);
  });
});
