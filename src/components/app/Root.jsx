import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";

import { LandingPage, EntryCapturePage, CacheCleanerPage } from "../pages";
import { defaultData } from "../../models/default";
import { hepatitisData } from "../../models/hepatitis";

const Root = ({ baseUrl }) => {
    return (
        <Switch>
            <Route
                path="/hepatitis"
                render={() => <LandingPage baseUrl={baseUrl} items={hepatitisData} />}
            />

            <Route
                path={
                    "/frame/entryCapture/:type(dataSet|program)/:organisationUnit/:element/:filter?"
                }
                render={() => <EntryCapturePage baseUrl={baseUrl} />}
            />

            <Route path={"/cache-cleaner"} render={() => <CacheCleanerPage baseUrl={baseUrl} />} />

            <Route render={() => <LandingPage baseUrl={baseUrl} items={defaultData} />} />
        </Switch>
    );
};

Root.propTypes = {
    baseUrl: PropTypes.string.isRequired,
};

Root.defaultProps = {};

export default Root;
