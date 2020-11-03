import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import i18n from "../../locales";
import { styles } from "./styles";

const WHOLoading = ({ classes }) => {
    return (
        <React.Fragment>
            <div className={classes.container}>
                <img
                    src={"img/balls-5.svg"}
                    className={classes.animation}
                    alt={i18n.t("Please wait")}
                />
                <br />
                <h3>{i18n.t("Getting ready, Please wait")}</h3>
            </div>
        </React.Fragment>
    );
};

WHOLoading.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WHOLoading);
