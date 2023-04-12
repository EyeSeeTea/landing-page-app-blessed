import { Chip, withStyles } from "@material-ui/core";
import { ExitToApp, Home, MailOutline } from "@material-ui/icons";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import i18n from "../../../../locales";
import { goToDhis2Url } from "../../../../utils/utils";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../contexts/app-context";

const GLASSHeader = ({ classes, history, baseUrl, title, backUrl }) => {
    const { compositionRoot } = useAppContext();
    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        compositionRoot.usecases.notifications
            .dhis2MessageCount()
            .then(notifications => setNotificationCount(notifications));
    }, [compositionRoot]);

    const actionBack = () => history.push(backUrl);
    const actionLogout = () => goToDhis2Url(baseUrl, "/dhis-web-commons-security/logout.action");
    const actionMessaging = () => goToDhis2Url(baseUrl, "/dhis-web-messaging");

    return (
        <header className={classes.container}>
            <div className={classes.titleContainer}>
                <Home className={classes.title} fontSize="large" onClick={actionBack} />
                <img className={classes.logo} alt={title} src="img/glass.png" />
                <img className={classes.logo} alt={title} src="img/who-logo.png" />
            </div>
            <div className={classes.titleContainer}>
                <div className={classes.messages}>
                    <MailOutline className={classes.title} onClick={actionMessaging} />
                    <span className={classes.messageCount}>{notificationCount}</span>
                </div>
                <Chip
                    icon={<ExitToApp className={classes.exitIcon} />}
                    label={i18n.t("LOG OUT")}
                    className={classes.logout}
                    onClick={actionLogout}
                />
            </div>
        </header>
    );
};

GLASSHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired,
    backUrl: PropTypes.string,
};

GLASSHeader.defaultProps = {
    title: i18n.t("GLASS Admin"),
    backUrl: "/",
};

export default withRouter(withStyles(styles)(GLASSHeader));
