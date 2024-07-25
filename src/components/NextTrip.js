import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Card, CardContent, Alert, Grid } from "@mui/material";

const NextTrip = () => {
  const nextTrip = useSelector((state) => state.tours.nextTrip);

  if (!nextTrip) return <Alert severity="info">No upcoming trips</Alert>;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Next Trip</Typography>
      <Card
        sx={{
          border: "1px solid #ccc",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          borderRadius: 4,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{
              backgroundColor: "#3f51b5",
              color: "#fff",
              padding: 2,
              borderRadius: "4px 4px 0 0",
            }}
          >
            {nextTrip.name}
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={12} sm={6}>
              <Typography>
                {nextTrip.startDate} - {nextTrip.endDate}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>Budget: ${nextTrip.budget}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>Transport: {nextTrip.transport}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NextTrip;
