import React from "react";
import { withStyles } from "@material-ui/core";

import LandingPage from "./generic";
import { styles } from "../../../domain/models/hepatitis/styles";

const NTDLeishKenyaLandingPage = props => {
    return <LandingPage {...props} />;
};

export default withStyles(styles)(NTDLeishKenyaLandingPage);
