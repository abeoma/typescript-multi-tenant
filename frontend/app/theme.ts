import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f44336",
    },
    text: { primary: "rgba(0,0,0,0.87)" },
  },
});

export default theme;
