import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { withStyles, Typography } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";

import { styles } from "./styles";
import { goToDhis2Url } from "../../utils";

const WHOHeader = ({ classes, history, baseUrl, title, backUrl }) => {
    return (
        <header className={classes.header}>
            <img
                className={classes.headerLogo}
                alt={title}
                src="img/who-logo.png"
                onClick={() => history.push(backUrl)}
            />
            <Typography
                className={classes.headerTitle}
                variant="h4"
                onClick={() => history.push(backUrl)}
            >
                {title}
            </Typography>
            <div
                className={classes.headerLogout}
                onClick={() => goToDhis2Url(baseUrl, "/dhis-web-commons-security/logout.action")}
            >
                <ExitToApp fontSize="large" />
            </div>
        </header>
    );
};

WHOHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired,
    title: PropTypes.string,
    backUrl: PropTypes.string,
};

WHOHeader.defaultProps = {
    title: "World Health Organization",
    backUrl: "/",
};

export default withRouter(withStyles(styles)(WHOHeader));
