import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

describe("App Component with Redux Store", () => {
  test("checks if Redux store is applied by rendering the App component", () => {
    render(<App />, { wrapper: Wrapper });

    expect(screen.getByText(/Travel Planner/i)).toBeInTheDocument();
  });

  test("dispatches actions correctly", () => {});
});
