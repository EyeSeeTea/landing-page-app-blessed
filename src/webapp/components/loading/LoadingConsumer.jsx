import React from "react";

import LoadingContext from "./context";
import LoadingMask from "./loading";

const LoadingConsumer = () => {
    return (
        <LoadingContext.Consumer>
            {({ isLoading, ...props }) => (isLoading ? <LoadingMask {...props} /> : null)}
        </LoadingContext.Consumer>
    );
};

LoadingConsumer.propTypes = {};

export default LoadingConsumer;
