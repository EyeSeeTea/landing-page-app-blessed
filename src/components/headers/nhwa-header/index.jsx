import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

import { styles } from "./styles";

const NHWAHeader = ({ classes, baseUrl, title }) => {
    return (
            <nav className={classes.navbar}>
                <div className={classes.containerFluid}>
                    <div className={classes.header}>
                        <h4 className={classes.title}>{title}</h4>
                    </div>
                </div>
            </nav>
    );
};

NHWAHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired,
    title: PropTypes.string,
};

NHWAHeader.defaultProps = {
    title: "NATIONAL HEALTH WORKFORCE ACCOUNTS ONLINE DATA PLATFORM",
    backUrl: "/",
};

export default withStyles(styles)(NHWAHeader);
