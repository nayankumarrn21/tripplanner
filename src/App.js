import React, { useState } from "react";
import TourFormModal from "./components/TourFormModal";
import ToursList from "./components/ToursList";
import NextTrip from "./components/NextTrip";
import { Container, Typography, Box, Button } from "@mui/material";
// import { BeachAccessIcon } from "@mui/icons-material";
import "./App.css";
import theme from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  const [open, setOpen] = useState(false);
  const data = {
    name: "",
    startDate: "",
    endDate: "",
    places: [],
    placeName: "",
    placeType: "",
    budget: "",
    transport: "",
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div id="main-container">
          <Box
            sx={{
              mt: 4,
              textAlign: "center",

              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Travel Planner
            </Typography>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Create New Tour
            </Button>
          </Box>
          <TourFormModal
            open={open}
            onClose={handleClose}
            data={{
              name: "",
              startDate: "",
              endDate: "",
              places: [],
              placeName: "",
              placeType: "",
              budget: "",
              transport: "",
            }}
            flag={"create"}
          />
          <NextTrip />
          <ToursList />
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
