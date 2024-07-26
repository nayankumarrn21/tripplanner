import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import Tour from "./Tour";
import fetchRandomVacationImage from "../services/unsplashApi";
import TourDetailModal from "./TourDetailModal";

jest.mock("../services/unsplashApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("./TourDetailModal", () => (props) => (
  <div data-testid="tour-detail-modal" {...props} />
));
jest.mock("./TourFormModal", () => (props) => (
  <div data-testid="tour-form-modal" {...props} />
));

const mockTour = {
  name: "Sample Tour",
  startDate: "2024-08-01",
  transport: "Bus",
  budget: "$500",
  endDate: "2024-08-10",
};

describe("Tour Component", () => {
  beforeEach(() => {
    fetchRandomVacationImage.mockResolvedValue("http://example.com/image.jpg");
  });

  test("renders the component with tour data", async () => {
    render(<Tour tour={mockTour} />);

    expect(screen.getByText("Sample Tour")).toBeInTheDocument();
    expect(screen.getByText("2024-08-01")).toBeInTheDocument();
    expect(screen.getByText("Transport: Bus")).toBeInTheDocument();
    expect(screen.getByText("Budget: $500")).toBeInTheDocument();
    expect(screen.getByText("EndDate: 2024-08-10")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        "http://example.com/image.jpg"
      );
    });
  });

  test("opens TourDetailModal when view button is clicked", () => {
    render(<Tour tour={mockTour} />);
    fireEvent.click(screen.getByLabelText("view"));
    expect(screen.getByTestId("tour-detail-modal")).toBeInTheDocument();
  });

  test("opens TourFormModal when edit button is clicked", () => {
    render(<Tour tour={mockTour} />);

    fireEvent.click(screen.getByLabelText("edit"));

    expect(screen.getByTestId("tour-form-modal")).toBeInTheDocument();
  });
});
