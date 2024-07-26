import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  TextField,
  Button,
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  MenuItem,
} from "@mui/material";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";

const TourFormModal = ({ open, onClose, data, flag }) => {
  const dispatch = useDispatch();
  console.log(data);
  const [tour, setTour] = useState(data);

  useEffect(() => {
    if (!open && flag == "create") {
      resetForm();
    }
  }, [open]);

  const resetForm = () => {
    setTour({
      name: "",
      startDate: "",
      endDate: "",
      places: [],
      placeName: "",
      placeType: "",
      budget: "",
      transport: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTour({ ...tour, [name]: value });
  };

  const handleAddPlace = () => {
    if (tour.placeName && tour.placeType) {
      const newPlace = {
        name: tour.placeName,
        type: tour.placeType,
      };
      setTour((prevState) => ({
        ...prevState,
        places: [...prevState.places, newPlace],
        placeName: "",
        placeType: "",
      }));
    }
  };

  const handleDeletePlace = (index) => {
    const updatedPlaces = [...tour.places];
    updatedPlaces.splice(index, 1);
    setTour({ ...tour, places: updatedPlaces });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedTour = {
      ...tour,
      budget: parseFloat(tour.budget),
    };
    if (flag == "create")
      dispatch({
        type: "CREATE_TOUR",
        payload: { ...formattedTour, id: new Date().getTime() },
      });
    else dispatch({ type: "EDIT_TOUR", payload: formattedTour });

    dispatch({ type: "SET_NEXT_TRIP", payload: formattedTour });
    // dispatch({ type: "SET_NEXT_TRIP", payload: formattedTour });
    onClose();
  };

  return (
    <div>
      {" "}
      {tour && (
        <Dialog open={open} onClose={onClose}>
          <DialogTitle>Create a Tour</DialogTitle>
          <DialogContent>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  label="Tour Name"
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="End Date"
                  type="date"
                  name="endDate"
                  value={tour.endDate}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  margin="normal"
                />
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <TextField
                    label="Place Name"
                    name="placeName"
                    value={tour.placeName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    sx={{ ml: 2 }}
                    label="Place Type"
                    name="placeType"
                    value={tour.placeType}
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    fullWidth
                    margin="normal"
                  >
                    <option value="">Select place type</option>
                    <option value="Temple">Temple</option>
                    <option value="Beach">Beach</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Museum">Museum</option>
                    <option value="Park">Park</option>
                    <option value="Shopping Mall">Shopping Mall</option>
                  </TextField>
                  <IconButton
                    aria-label="addPlace"
                    color="primary"
                    onClick={handleAddPlace}
                    sx={{ ml: 2 }}
                  >
                    <AddCircleIcon />
                  </IconButton>
                </Box>
                {tour.places.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    {tour.places.map((place, index) => (
                      <Box
                        key={index}
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <TextField
                          value={place.name}
                          disabled
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          value={place.type}
                          disabled
                          fullWidth
                          margin="normal"
                        />
                        <IconButton
                          color="secondary"
                          onClick={() => handleDeletePlace(index)}
                          sx={{ ml: 2 }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                )}
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
              </Box>
            </Paper>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            {flag == "create" && (
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
              >
                Create Tour
              </Button>
            )}
            {flag == "edit" && (
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
              >
                Edit
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default TourFormModal;
