import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";

import { LandingPage, EntryCapturePage } from "../pages";
import { DefaultData } from "../../models/default";
import { HepatitisData } from "../../models/hepatitis";

const Root = ({ baseUrl }) => {
    return (
        <Switch>
            <Route
                path={"/entryCapture/:type(dataSet|program)/:organisationUnit/:element/:period"}
                render={() => <EntryCapturePage baseUrl={baseUrl} />}
            />

            <Route
                path="/hepatitis"
                render={() => <LandingPage baseUrl={baseUrl} items={HepatitisData} />}
            />

            <Route render={() => <LandingPage baseUrl={baseUrl} items={DefaultData} />} />
        </Switch>
    );
};

Root.propTypes = {
    baseUrl: PropTypes.string.isRequired,
};

Root.defaultProps = {};

export default Root;
