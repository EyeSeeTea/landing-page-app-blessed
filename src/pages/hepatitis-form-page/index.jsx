import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import qs from "qs";

import IFrame from "../../components/iframe";
import { dataEntryStyling } from "../../models/hepatitis/dataEntry";
import { eventCaptureStyling } from "../../models/hepatitis/eventCapture";

const EntryCapturePage = ({ match, location, baseUrl }) => {
    const { type, element } = match.params;
    const { event, period, organisationUnit } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });

    const isDataSet = type === "dataSet";
    const dataSetUrl = `${baseUrl}/dhis-web-dataentry/index.action`;
    const programUrl = event
        ? `${baseUrl}/dhis-web-event-capture/index.html#/?event=${event}`
        : `${baseUrl}/dhis-web-event-capture/index.html`;

    return (
        <IFrame
            src={isDataSet ? dataSetUrl : programUrl}
            customize={isDataSet ? dataEntryStyling : eventCaptureStyling}
            builder={{ baseUrl, element, event, period, organisationUnit }}
        />
    );
};

EntryCapturePage.propTypes = {
    match: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired,
};

EntryCapturePage.defaultProps = {};

export default withRouter(EntryCapturePage);
