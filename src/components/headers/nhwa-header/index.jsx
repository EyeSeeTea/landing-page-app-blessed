import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

import { styles } from "./styles";

const NHWAHeader = ({ classes, title }) => {
    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.logoBox}>
                    <img className={classes.logo} src="/img/who-logo-black.png" alt={"WHO"}></img>
                </div>
                <div className={classes.box}>
                    <nav className={classes.navbar}>
                        <div className={classes.containerFluid}></div>
                        <h4 className={classes.title}>{title}</h4>
                    </nav>
                </div>
            </div>
        </div>
    );
};

NHWAHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string,
};

NHWAHeader.defaultProps = {
    title: "NATIONAL HEALTH WORKFORCE ACCOUNTS ONLINE DATA PLATFORM",
    backUrl: "/",
};

export default withStyles(styles)(NHWAHeader);
