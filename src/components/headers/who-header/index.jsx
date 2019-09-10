import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { withStyles, Typography, Chip } from "@material-ui/core";
import { Home, ExitToApp } from "@material-ui/icons";

import { styles } from "./styles";
import { goToExternalUrl, goToDhis2Url } from "../../../utils";

const WHOHeader = ({ classes, history, baseUrl, title, backUrl }) => {
    const actionWHO = () => goToExternalUrl("https://who.int");
    const actionBack = () => history.push(backUrl);
    const actionLogout = () => goToDhis2Url(baseUrl, "/dhis-web-commons-security/logout.action");

    return (
        <header className={classes.container}>
            <img className={classes.logo} onClick={actionWHO} alt={title} src="img/who-logo.png" />
            <div className={classes.titleContainer} onClick={actionBack}>
                <Home className={classes.title} fontSize="large" />
                <Typography className={classes.title} variant="h4">
                    {title}
                </Typography>
            </div>

            <Chip
                icon={<ExitToApp />}
                label="LOG OUT"
                className={classes.logout}
                onClick={actionLogout}
            />
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
