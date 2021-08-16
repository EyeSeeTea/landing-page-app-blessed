import React from "react";
import PropTypes from "prop-types";
import { CircularProgress, Typography, Divider, withStyles } from "@material-ui/core";

import { styles } from "./styles";

const LoadingMask = ({ classes, message, progress }) => {
    const hideMessage = !message || !message.trim();

    return (
        <div className={classes.loadingMask}>
            <div className={classes.contents}>
                <CircularProgress
                    className={classes.progress}
                    variant={progress >= 0 ? "determinate" : "indeterminate"}
                    value={progress}
                    size={100}
                    thickness={1.5}
                />
                <Divider className={classes.divider} variant="middle" hidden={hideMessage} />
                <Typography className={classes.message} variant="h6" hidden={hideMessage} gutterBottom>
                    {message}
                </Typography>
            </div>
        </div>
    );
};

LoadingMask.propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.string,
    progress: PropTypes.number,
    root: PropTypes.string,
};

LoadingMask.defaultProps = {};

export default withStyles(styles)(LoadingMask);
