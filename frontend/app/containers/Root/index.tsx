import React from "react";
import { withRouter } from "react-router-dom";
import App from "../App";
import GlobalStyle from "../../../lib/GlobalStyle";

const Root = () => {
  return (
    <React.Fragment>
      <App />
      <GlobalStyle />
    </React.Fragment>
  );
};

export default withRouter(Root);
