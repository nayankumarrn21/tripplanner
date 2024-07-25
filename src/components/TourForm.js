import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import { TextField, Button, Box, Typography } from "@mui/material";

const TourForm = () => {
  const dispatch = useDispatch();
  const [tour, setTour] = useState({
    name: "",
    startDate: "",
    endDate: "",
    places: "",
    budget: "",
    transport: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTour({ ...tour, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedTour = {
      ...tour,
      startDate: format(new Date(tour.startDate), "yyyy-MM-dd"),
      endDate: format(new Date(tour.endDate), "yyyy-MM-dd"),
      places: tour.places.split(",").map((place) => place.trim()),
      budget: parseFloat(tour.budget),
    };
    dispatch({ type: "CREATE_TOUR", payload: formattedTour });
    dispatch({ type: "SET_NEXT_TRIP", payload: formattedTour });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ m: 2 }}>
      <Typography variant="h6">Create a Tour</Typography>
      <TextField
        label="Name"
        name="name"
        value={tour.name}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Start Date"
        type="date"
        name="startDate"
        value={tour.startDate}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="End Date"
        type="date"
        name="endDate"
        value={tour.endDate}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Places (comma separated)"
        name="places"
        value={tour.places}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Budget"
        type="number"
        name="budget"
        value={tour.budget}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Transport"
        name="transport"
        value={tour.transport}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Create Tour
      </Button>
    </Box>
  );
};

export default TourForm;
