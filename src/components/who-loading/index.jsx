import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

import { styles } from "./styles";

const WHOLoading = ({ classes }) => {
    return (
        <React.Fragment>
            <div className={classes.container}>
                <img src={"img/balls-5.svg"} className={classes.animation} alt={"Please wait"} />
                <br />
                <h3>Getting ready, Please wait</h3>
            </div>
        </React.Fragment>
    );
};

WHOLoading.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WHOLoading);
