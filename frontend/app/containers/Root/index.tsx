import { ThemeProvider } from "@mui/system";
import React from "react";
import { withRouter } from "react-router-dom";
import theme from "../../theme";
import App from "../App";

const Root = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.Fragment>
  );
};

export default withRouter(Root);
