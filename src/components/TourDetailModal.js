import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TempleIcon from "@material-ui/icons/AccountBalance";
import PoolIcon from "@material-ui/icons/Pool";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import ParkIcon from "@material-ui/icons/People";
import MuseumIcon from "@material-ui/icons/Museum";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Paper from "@mui/material/Paper";

const TourDetailModal = ({ open, onClose, tour }) => {
  const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === "red" ? theme.palette.grey[700] : "red",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    }),
  }));

  function ColorlibStepIcon(type) {
    const icons = {
      Temple: <TempleIcon />,
      Beach: <PoolIcon />,
      Restaurant: <RestaurantMenuIcon />,
      Park: <ParkIcon />,
      Museum: <MuseumIcon />,
      "Shopping Mall": <AddShoppingCartIcon />,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ active: false, completed: false }}
        className={undefined}
      >
        {icons[String(type)]}
      </ColorlibStepIconRoot>
    );
  }

  return (
    <div>
      {tour && (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
          <DialogTitle>{tour.name} Details</DialogTitle>
          <DialogContent>
            <Paper elevation={2} style={{ padding: "10px", margin: "10px" }}>
              <Typography variant="h6" style={{ textAlign: "center" }}>
                Trip Details
              </Typography>
              <Stack
                style={{ display: "flex", justifyContent: "space-evenly" }}
                direction="row"
              >
                <Stack direction="row" spacing={2}>
                  <Typography variant="body1">Start Date:</Typography>
                  <Typography variant="body1">{tour.startDate}</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography variant="body1">End Date:</Typography>
                  <Typography variant="body1">{tour.endDate}</Typography>
                </Stack>
              </Stack>

              <Stack
                style={{ display: "flex", justifyContent: "space-evenly" }}
                direction="row"
              >
                <Stack direction="row" spacing={2}>
                  <Typography variant="body1">Budget:</Typography>
                  <Typography variant="body1">{tour.budget}</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography variant="body1">Transport:</Typography>
                  <Typography variant="body1">{tour.transport}</Typography>
                </Stack>
              </Stack>
            </Paper>

            <Typography variant="h6" sx={{ mt: 3 }}>
              Places
            </Typography>
            <Stepper activeStep={4} orientation="vertical">
              {tour.places.map((place, index) => (
                <Step key={index}>
                  {/* StepIconComponent={ColorlibStepIcon} */}
                  <StepLabel
                    StepIconComponent={() => ColorlibStepIcon(place.type)}
                  >
                    {place.type}
                  </StepLabel>
                  <Box sx={{ ml: 3 }}>
                    <Typography variant="body1">Place: {place.name}</Typography>
                    {/* Add more details about each place if needed */}
                  </Box>
                </Step>
              ))}
            </Stepper>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default TourDetailModal;
