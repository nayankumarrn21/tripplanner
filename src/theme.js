import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0288d1", // Beachy blue
    },
    secondary: {
      main: "#fbc02d", // Sunny yellow
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      color: "#0288d1", // Beachy blue for subtitles
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
        },
      },
    },
    // MuiPaper: {
    //   styleOverrides: {
    //     root: {
    //       backgroundImage:
    //         'url("https://www.transparenttextures.com/patterns/paper.png")',
    //     },
    //   },
    // },
  },
});

export default theme;
