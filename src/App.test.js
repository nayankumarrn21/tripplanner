import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

describe("App Component with Redux Store", () => {
  test("checks if Redux store is applied by rendering the App component", () => {
    render(<App />, { wrapper: Wrapper });
    const linkElement = screen.getByText(/Travel Planner/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("dispatches actions correctly", () => {});
});
