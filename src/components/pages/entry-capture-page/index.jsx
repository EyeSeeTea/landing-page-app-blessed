import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import IFrame from "../../iframe";
import { dataEntryStyling } from "./dataEntry";
import { eventCaptureStyling } from "./eventCapture";

const EntryCapturePage = ({ match, baseUrl }) => {
    const { type, organisationUnit, element, filter } = match.params;

    const isDataSet = type === "dataSet";
    const dataSetUrl = `${baseUrl}/dhis-web-dataentry/index.action`;
    const programUrl = filter
        ? `${baseUrl}/dhis-web-event-capture/index.html#/?event=${filter}`
        : `${baseUrl}/dhis-web-event-capture/index.html`;

    return (
        <IFrame
            src={isDataSet ? dataSetUrl : programUrl}
            customize={isDataSet ? dataEntryStyling : eventCaptureStyling}
            builder={{ organisationUnit, element, filter, baseUrl }}
        />
    );
};

EntryCapturePage.propTypes = {
    match: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired,
};

EntryCapturePage.defaultProps = {};

export default withRouter(EntryCapturePage);
