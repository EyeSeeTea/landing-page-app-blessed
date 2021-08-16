import { withStyles } from "@material-ui/core";
import React from "react";
import { styles } from "../../../domain/models/hepatitis/styles";
import LandingPage from "./generic";

const SnakebiteLandingPage = props => {
    return <LandingPage {...props} />;
};

export default withStyles(styles)(SnakebiteLandingPage);
