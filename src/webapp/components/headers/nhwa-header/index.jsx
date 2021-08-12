import { Button } from "@dhis2/ui-core";
import { withStyles } from "@material-ui/core";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import i18n from "../../../../locales";
import { goToDhis2InNewTab, goToDhis2Url } from "../../../../utils";
import { useAppContext } from "../../../contexts/app-context";
import { styles } from "./styles";

const NHWAHeader = ({ classes, baseUrl, title, username }) => {
    const { api } = useAppContext();
    const logoutAction = () => goToDhis2Url(baseUrl, "/dhis-web-commons-security/logout.action");
    const userGuideAction = () => {
        api.models.documents
            .get({
                fields: {
                    id: true,
                },
                filter: {
                    name: {
                        token: "NHWA,User,Guide",
                    },
                },
            })
            .getData()
            .then(({ objects }) => _.first(objects) || {})
            .then(({ id }) => !!id && goToDhis2InNewTab(baseUrl, `/api/documents/${id}/data`));
    };

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.logoBox}>
                    <img className={classes.logo} src="img/who-logo-black.png" alt={"WHO"}></img>
                </div>
                <div className={classes.box}>
                    <nav className={classes.navbar}>
                        <div className={classes.containerFluid}></div>
                        <h4 className={classes.title}>{title.toUpperCase()}</h4>
                    </nav>
                </div>
                <div className={classes.welcomeRow}>
                    <h4 className={classes.welcomeMessage}>{`Welcome ${username}`}</h4>
                    <div className={classes.welcomeButtons}>
                        <Button
                            className={classes.welcomeButton}
                            name="Button"
                            onClick={userGuideAction}
                            small
                            type="button"
                            value="default"
                        >
                            {i18n.t("User guide")}
                        </Button>
                        <Button
                            className={classes.welcomeButton}
                            name="Button"
                            onClick={logoutAction}
                            small
                            primary
                            type="button"
                            value="default"
                        >
                            {i18n.t("Logout")}
                        </Button>
                    </div>
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
};

export default withStyles(styles)(NHWAHeader);
