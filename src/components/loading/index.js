import React, { useEffect, useState, useMemo } from "react";
import ReactDOM from "react-dom";

import context from "./context";
import LoadingMask from "./loading";

function withLoading(WrappedComponent) {
    return class extends React.Component {
        static displayName = `withLoading${WrappedComponent.displayName}`;
        static contextType = context;

        render() {
            return <WrappedComponent {...this.props} loading={this.context} />;
        }
    };
}

const defaultProps = {
    isLoading: false,
    message: "",
    progress: -1,
};

const useLoading = initialProps => {
    const [props, updateProps] = useState({
        ...defaultProps,
        ...initialProps,
    });

    useEffect(() => {
        if (!document.getElementById("loading-mask-container")) {
            const container = document.createElement("div");
            container.setAttribute("id", "loading-mask-container");
            document.body.prepend(container);
            ReactDOM.render(<LoadingMask {...props} />, container);
        }

        document.getElementById("loading-mask-container").hidden = !props.isLoading;
    }, [props]);

    const value = useMemo(
        () => ({
            update: ({ isLoading, progress, message }) =>
                updateProps({ isLoading, progress, message }),
            show: (isLoading = true, message, progress) =>
                updateProps({ isLoading, message, progress }),
            hide: () => updateProps({ isLoading: false }),
            reset: () => updateProps(defaultProps),
            updateMessage: message => updateProps({ message }),
            updateProgress: progress => updateProps({ progress }),
            ...props,
        }),
        [props]
    );

    return value;
};

export { withLoading, useLoading, LoadingMask };
