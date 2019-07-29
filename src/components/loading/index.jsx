import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Loading from "./loading";

export const useLoading = initialProps => {
    const [props, updateProps] = useState({
        isLoading: false,
        message: "",
        progress: -1,
        ...initialProps,
    });

    return [<LoadingPortal {...props} />, updateProps];
};

const LoadingPortal = props => {
    const container = document.createElement("div");

    useEffect(() => {
        document.body.prepend(container);
    }, [container]);

    return props.isLoading ? ReactDOM.createPortal(<Loading {...props} />, container) : null;
};
