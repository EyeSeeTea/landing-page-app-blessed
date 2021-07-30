import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, withStyles } from "@material-ui/core";
import { ConfirmationDialog } from "@eyeseetea/d2-ui-components";
import { withRouter } from "react-router-dom";
import { HeaderBar } from "@dhis2/ui-widgets";
import { useAppContext } from "../../contexts/app-context";
import { styles } from "../../../domain/models/hepatitis/styles";
import { goToDhis2Url } from "../../../utils";
import i18n from "../../../locales";

const LandingPage = ({ classes, history, baseUrl, items, header, title, username }) => {
    const HeaderComponent = header || HeaderBar;

    const { userNotifications, compositionRoot } = useAppContext();
    const [open, setOpen] = React.useState(userNotifications.length === 0 ? false : true);

    const save = React.useCallback(async () => {
        await compositionRoot.usecases.notifications.update(userNotifications);
        setOpen(false);
    }, [compositionRoot, userNotifications]);

    const visitPage = ({ type, value }) => {
        switch (type) {
            case "page":
                return history.push(value);
            case "dhisRedirect":
                return goToDhis2Url(baseUrl, value);
            case "method":
                return value(baseUrl, action => visitPage(action));
            default:
                break;
        }
    };

    const menuItems = items.map(
        ({ key, title, description, icon, iconDescription, action, enableBottomLine, rowLength, size = "large" }) => (
            <Grid
                item
                xs={12 / rowLength}
                className={action ? classes.item : classes.separator}
                key={key}
                onClick={() => (action ? visitPage(action) : {})}
            >
                {title && (
                    <Typography
                        className={action ? classes.title : classes.separatorTitle}
                        variant={size === "small" ? "h6" : "h5"}
                    >
                        {title}
                    </Typography>
                )}
                {enableBottomLine && !action && <hr className={classes.bottomLine} />}
                {icon && (
                    <div className={classes.iconContainer}>
                        <img
                            className={size === "small" ? classes.smallIcon : classes.icon}
                            alt={title}
                            src={icon}
                        ></img>
                        <p className={classes.small}>{iconDescription}</p>
                    </div>
                )}
                {description && (
                    <p className={`${classes.description} ${size === "small" ? classes.small : ""}`}>{description}</p>
                )}
            </Grid>
        )
    );

    return (
        <React.Fragment>
            <HeaderComponent baseUrl={baseUrl} title={title} username={username} />
            <ConfirmationDialog
                title={i18n.t("Notifications")}
                open={open}
                onSave={save}
                onCancel={() => setOpen(false)}
                maxWidth={"md"}
                fullWidth={true}
            >
                {userNotifications.map(notification => (
                    <div key={notification.id}>{notification.content}</div>
                ))}
            </ConfirmationDialog>
            <div className={classes.root}>
                <Grid container spacing={0} className={classes.container}>
                    {menuItems}
                </Grid>
            </div>
        </React.Fragment>
    );
};

LandingPage.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
};

LandingPage.defaultProps = {};

export default withRouter(withStyles(styles)(LandingPage));
