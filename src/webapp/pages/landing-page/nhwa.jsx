import { withStyles } from "@material-ui/core";
import React from "react";
import { styles } from "../../../domain/models/nhwa/styles";
import LandingPage from "./generic";

const NHWALandingPage = props => {
    return <LandingPage {...props} />;
};

export default withStyles(styles)(NHWALandingPage);
