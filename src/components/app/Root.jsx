import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";

import { GenericLandingPage, HepatitisLandingPage, NHWALandingPage, HepatitisFormPage, CacheCleanerPage } from "../pages";
import { defaultData, hepatitisData, nhwaData } from "../../models";

const Root = ({ baseUrl }) => {
    return (
        <Switch>
            <Route
                path={"/hepatitis/:type(dataSet|program)/:element"}
                render={() => <HepatitisFormPage baseUrl={baseUrl} />}
            />

            <Route
                path="/hepatitis"
                render={() => <HepatitisLandingPage baseUrl={baseUrl} items={hepatitisData} />}
            />

            <Route
                path="/nhwa"
                render={() => <NHWALandingPage baseUrl={baseUrl} items={nhwaData} />}
            />

            <Route path={"/cache-cleaner"} render={() => <CacheCleanerPage baseUrl={baseUrl} />} />

            <Route render={() => <GenericLandingPage baseUrl={baseUrl} items={defaultData} />} />
        </Switch>
    );
};

Root.propTypes = {
    baseUrl: PropTypes.string.isRequired,
};

Root.defaultProps = {};

export default Root;
