import App from "../App";
import React from "react";
import { ThemeProvider } from "@mui/system";
import theme from "../../theme";
import { withRouter } from "react-router-dom";

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
