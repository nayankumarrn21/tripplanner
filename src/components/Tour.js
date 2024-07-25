import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TourDetailModal from "./TourDetailModal";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import Paper from "@mui/material/Paper";
import fetchRandomVacationImage from "../services/unsplashApi";

import EditIcon from "@material-ui/icons/Edit";
import TourFormModal from "./TourFormModal";
export default function Tour({ tour }) {
  const [imageUrl, setImageUrl] = useState("");

  const [selectedTour, setSelectedTour] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await fetchRandomVacationImage();
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  const handleOpenModal = (tour) => {
    setSelectedTour(tour);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getImages = async () => {
    console.log("getImages");
    const fetchedImages = await fetchRandomVacationImage();
    return fetchedImages;
  };

  return (
    <Paper elevation="10" style={{ margin: "20px" }}>
      <Card sx={{ width: 300 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {tour.name.split("")[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={tour.name}
          subheader={tour.startDate}
        />
        <CardMedia
          component="img"
          height="194"
          image={imageUrl}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Transport: {tour.transport}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Budget: {tour.budget}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            EndDate: {tour.endDate}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="view" onClick={() => handleOpenModal(tour)}>
            <RemoveRedEyeIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={() => handleOpen(tour)}>
            <EditIcon />
          </IconButton>
        </CardActions>
        <TourDetailModal
          open={openModal}
          onClose={handleCloseModal}
          tour={selectedTour}
        />
        <TourFormModal
          open={open}
          data={tour}
          onClose={handleClose}
          flag={"edit"}
        />
      </Card>
    </Paper>
  );
}
