import React from "react";
import { withStyles } from "@material-ui/core";

import LandingPage from "./generic";
import { styles } from "../../../domain/models/hepatitis/styles";

// Rabies department, re-uses the styles from hepatitis
const RabiesLandingPage = props => {
    return <LandingPage {...props} />;
};

export default withStyles(styles)(RabiesLandingPage);
