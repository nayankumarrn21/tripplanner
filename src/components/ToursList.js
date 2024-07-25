import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  ListItem,
  Alert,
} from "@mui/material";
import Tour from "./Tour";

const ToursList = () => {
  const dispatch = useDispatch();
  const { tours, loading, error } = useSelector((state) => state.tours);

  useEffect(() => {
    dispatch({ type: "FETCH_TOURS_REQUEST" });
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography style={{ marginBottom: "10px" }} variant="h6">
        List of Tours
      </Typography>
      <Grid
        container
        spacing={2}
        style={{ display: "flex", justifyContent: "spaceAround" }}
      >
        {tours.map((tour) => (
          <Tour tour={tour} key={tour.id} />
        ))}
      </Grid>
    </Box>
  );
};

export default ToursList;
