import React from "react";
import PropTypes from "prop-types";
import { withStyles, Grid, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";

import { styles } from "./styles";
import { goToDhis2Url } from "../../../utils";

const LandingPage = ({ classes, history, baseUrl, items }) => {
    const visitPage = action => {
        switch (typeof action) {
            case "string":
                if (action.startsWith("/")) return goToDhis2Url(baseUrl, action);
                else return history.push(action);
            case "function":
                return action(baseUrl, url => visitPage(url));
            default:
                break;
        }
    };

    const menuItems = items.map(([key, title, description, icon, action, xs]) => (
        <Grid
            item
            xs={xs}
            className={action ? classes.item : classes.separator}
            key={key}
            onClick={() => visitPage(action)}
        >
            <Typography className={action ? classes.title : classes.separatorTitle} variant="h5">
                {title}
            </Typography>
            {!action && <hr className={classes.bottomLine} />}
            {icon && <img className={`icons ${classes.icons}`} alt={title} src={icon}></img>}
            {description && <p>{description}</p>}
        </Grid>
    ));

    return (
        <div className={classes.root}>
            <Grid container spacing={16} className={classes.container}>
                {menuItems}
            </Grid>
        </div>
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
