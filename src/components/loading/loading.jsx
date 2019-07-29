import React from "react";
import PropTypes from "prop-types";
import { CircularProgress, Typography, Divider } from "@material-ui/core";

import { useStyles } from "./styles";

const Loading = ({ isLoading, message, progress }) => {
    const classes = useStyles();
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
                <Typography
                    className={classes.message}
                    variant="h6"
                    hidden={hideMessage}
                    gutterBottom
                >
                    {message}
                </Typography>
            </div>
        </div>
    );
};

Loading.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    message: PropTypes.string,
    progress: PropTypes.number,
    root: PropTypes.string,
};

Loading.defaultProps = {};

export default Loading;
