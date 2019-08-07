import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { withStyles, Typography } from "@material-ui/core";

import { styles } from "./styles";
import { goToExternalUrl, goToDhis2Url } from "../../utils";

const WHOHeader = ({ classes, history, baseUrl, title, backUrl }) => {
    return (
        <header className={classes.header}>
            <img
                className={classes.headerLogo}
                alt={title}
                src="img/who-logo.png"
                onClick={() => goToExternalUrl("https://who.int")}
            />
            <Typography
                className={classes.headerTitle}
                variant="h4"
                onClick={() => history.push(backUrl)}
            >
                {title}
            </Typography>
            <Typography
                className={classes.headerLogout}
                variant="h6"
                onClick={() => goToDhis2Url(baseUrl, "/dhis-web-commons-security/logout.action")}
            >
                {"LOG OUT"}
            </Typography>
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
