import { Chip, Typography, withStyles } from "@material-ui/core";
import { ExitToApp, Home } from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import i18n from "../../../../locales";
import { goToDhis2Url, goToExternalUrl } from "../../../../utils/utils";
import { styles } from "./styles";

const InternationalHeader = ({ classes, history, baseUrl, title, backUrl, username, userGroupIds }) => {
    const actionSamaritan = () => goToExternalUrl("https://www.samaritanspurse.org");
    const actionBack = () => history.push(backUrl);
    const actionLogout = () => goToDhis2Url(baseUrl, "/dhis-web-commons-security/logout.action");
   
    // useEffect(() => {
    //     const userGroupIds = user.userGroups.map(userGroup => userGroup.id);
    //     if (userGroupIds === [""]) {
    //         return goToDhis2Url("/api/apps/Data-Management-App/index.html");
    //     } else if (userGroupIds === ["e8u0kJa8HM5, wjoMlqXjabf, eKTwo5C7h5N, cW5vzBo63yj"]) {
    //         return goToDhis2Url("/api/apps/Emergency-Field-Hospital-App/index.html");
    //     } else return;
    // }, []);

    console.log(userGroupIds, username);

    return (
        <header className={classes.container}>
            <a href="https://www.samaritanspurse.org">
                <img className={classes.logo} onClick={actionSamaritan} alt={title} src="img/international-logo.svg" />
            </a>
            <div className={classes.titleContainer} onClick={actionBack}>
                <Home className={classes.title} fontSize="large" />
                <Typography className={classes.title} variant="h4">
                    {title}
                </Typography>
            </div>

            <Chip icon={<ExitToApp />} label={i18n.t("LOG OUT")} className={classes.logout} onClick={actionLogout} />
        </header>
    );
};

InternationalHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    title: PropTypes.string,
    backUrl: PropTypes.string,
};

InternationalHeader.defaultProps = {
    title: i18n.t("International Projects"),
    backUrl: "/",
};

export default withRouter(withStyles(styles)(InternationalHeader));
