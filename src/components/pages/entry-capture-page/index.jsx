import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import IFrame from "../../iframe";
import { dataEntryStyling } from "./dataEntry";
import { eventCaptureStyling } from "./eventCapture";

const EntryCapturePage = ({ match, baseUrl }) => {
    const { type, organisationUnit, element, period } = match.params;

    const isDataSet = type === "dataSet";
    const dataSetUrl = `${baseUrl}/dhis-web-dataentry/index.action`;
    const programUrl = `${baseUrl}/dhis-web-event-capture/index.html#/?ou=${organisationUnit}&event=${element}`;

    return (
        <IFrame
            src={isDataSet ? dataSetUrl : programUrl}
            customize={isDataSet ? dataEntryStyling : eventCaptureStyling}
            builder={{ organisationUnit, element, period }}
        />
    );
};

EntryCapturePage.propTypes = {
    match: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired,
};

EntryCapturePage.defaultProps = {};

export default withRouter(EntryCapturePage);
