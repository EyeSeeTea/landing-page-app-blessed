import { withStyles } from "@material-ui/core";
import React from "react";
import { styles } from "../../../domain/models/hepatitis/styles";
import LandingPage from "./generic";

// Eastern Mediterranean regional malaria repository, re-uses the styles from hepatitis
const MalariaLandingPage = props => {
    return <LandingPage {...props} />;
};

export default withStyles(styles)(MalariaLandingPage);
