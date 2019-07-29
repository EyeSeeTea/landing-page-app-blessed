import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

import { DataEntryStyling, EventCaptureStyling } from "./styling";
import { useLoading } from "../loading";

const styles = {
    iframe: { width: "100%", height: 1000 },
};

const IFrame = ({ src, styling, builder }) => {
    const ref = useRef(null);
    const [renderLoading, updateLoading] = useLoading({ isLoading: true });

    useEffect(() => {
        if (styling && builder)
            ref.current.addEventListener("load", () =>
                styling(ref.current, builder).then(() => updateLoading({ isLoading: false }))
            );
    }, [styling, builder, updateLoading]);

    return [<iframe ref={ref} src={src} title={"IFrame"} style={styles.iframe} />, renderLoading];
};

IFrame.propTypes = {
    src: PropTypes.string.isRequired,
    styling: PropTypes.func,
    builder: PropTypes.object,
};

IFrame.defaultProps = {};

export default IFrame;
export { DataEntryStyling, EventCaptureStyling };
