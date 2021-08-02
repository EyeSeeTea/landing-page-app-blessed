import { withStyles } from "@material-ui/core";
import React from "react";
import { styles } from "../../../domain/models/hepatitis/styles";
import LandingPage from "./generic";

// Rabies department, re-uses the styles from hepatitis
const RabiesLandingPage = props => {
    return <LandingPage {...props} />;
};

export default withStyles(styles)(RabiesLandingPage);
