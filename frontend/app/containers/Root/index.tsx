import React from "react";
import { withRouter } from "react-router-dom";
import App from "../App";

const Root = () => {
  return (
    <React.Fragment>
      <App />
    </React.Fragment>
  );
};

export default withRouter(Root);
