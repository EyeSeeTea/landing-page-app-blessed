import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";

import { GenericLandingPage, HepatitisFormPage, CacheCleanerPage } from "../pages";
import { defaultData } from "../../models";

const Root = ({ baseUrl, page, key, data }) => {
    const LandingPageComponent = page || GenericLandingPage;
    return (
        <Switch>
            <Route path={"/cache-cleaner"} render={() => <CacheCleanerPage baseUrl={baseUrl} />} />

            {key === "hepatitis" && (
                <Route
                    path={"/hepatitis/:type(dataSet|program)/:element"}
                    render={() => <HepatitisFormPage baseUrl={baseUrl} />}
                />
            )}

            <Route
                render={() => (
                    <LandingPageComponent items={data || defaultData} baseUrl={baseUrl} />
                )}
            />
        </Switch>
    );
};

Root.propTypes = {
    baseUrl: PropTypes.string.isRequired,
};

Root.defaultProps = {};

export default Root;
