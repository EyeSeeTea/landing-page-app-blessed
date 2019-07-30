import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";

import { LandingPage, EntryCapturePage } from "../pages";
import { defaultData } from "../../models/default";
import { hepatitisData } from "../../models/hepatitis";

const Root = ({ baseUrl }) => {
    return (
        <Switch>
            <Route
                path={"/entryCapture/:type(dataSet|program)/:organisationUnit/:element/:period"}
                render={() => <EntryCapturePage baseUrl={baseUrl} />}
            />

            <Route
                path="/hepatitis"
                render={() => <LandingPage baseUrl={baseUrl} items={hepatitisData} />}
            />

            <Route render={() => <LandingPage baseUrl={baseUrl} items={defaultData} />} />
        </Switch>
    );
};

Root.propTypes = {
    baseUrl: PropTypes.string.isRequired,
};

Root.defaultProps = {};

export default Root;
