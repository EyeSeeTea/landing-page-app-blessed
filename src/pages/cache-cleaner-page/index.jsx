import React from "react";
import PropTypes from "prop-types";

import IFrame from "../../components/iframe";
import { hideSelector, selector, sleep } from "../../utils";

export const customize = async iframe => {
    const { contentWindow, contentDocument } = iframe;
    const { document } = contentWindow || contentDocument;

    // Hide unecessary elements
    hideSelector(document, "#header");

    // Scale body to be centered
    selector(document, "body", e => {
        e.style.marginTop = "-75px";
    });

    await sleep(1000);
};

const CacheCleanerPage = ({ baseUrl }) => {
    return <IFrame src={`${baseUrl}/dhis-web-cache-cleaner/index.action`} customize={customize} />;
};

CacheCleanerPage.propTypes = {
    baseUrl: PropTypes.string.isRequired,
};

CacheCleanerPage.defaultProps = {};

export default CacheCleanerPage;
