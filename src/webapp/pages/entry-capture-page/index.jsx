import PropTypes from "prop-types";
import qs from "qs";
import React from "react";
import { withRouter } from "react-router-dom";
import { cascadeStyling } from "../../../domain/models/hepatitis/HepatitisDataEntry";
import { policyUptakeStyling } from "../../../domain/models/hepatitis/HepatitisEventCapture";
import { rabiesStyling } from "../../../domain/models/rabies/RabiesDataEntry";
import { IFrame } from "../../components/iframe/IFrame";

//TODO: Add snakebitestyling to config
const config = {
    S1UMweeoPsi: {
        styling: rabiesStyling,
    },
    jfawDJZ5fOX: {
        styling: cascadeStyling,
    },
    cTzRXZGNvqz: {
        styling: policyUptakeStyling,
    },
};

const EntryCapturePage = ({ match, location, baseUrl, title, header: Header }) => {
    const { type, element } = match.params;
    const params = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });

    const isDataSet = type === "dataSet";
    const dataSetUrl = `${baseUrl}/dhis-web-dataentry/index.action`;
    const programUrl = params.event
        ? `${baseUrl}/dhis-web-event-capture/index.html#/?event=${params.event}`
        : `${baseUrl}/dhis-web-event-capture/index.html`;
    const { styling = isDataSet ? cascadeStyling : policyUptakeStyling } = config[element];

    return (
        <React.Fragment>
            <Header baseUrl={baseUrl} title={title} />
            <IFrame
                src={isDataSet ? dataSetUrl : programUrl}
                customize={styling}
                builder={{ baseUrl, element, ...params }}
            />
        </React.Fragment>
    );
};

EntryCapturePage.propTypes = {
    match: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired,
};

EntryCapturePage.defaultProps = {};

export default withRouter(EntryCapturePage);
