import React from "react";
import { withStyles } from "@material-ui/core";

import LandingPage from "./generic";
import { styles } from "../../models/hepatitis/styles";

const NtdLeishKenyaLandingPage = props => {
    return <LandingPage {...props} />;
};

export default withStyles(styles)(NtdLeishKenyaLandingPage);
