import React from "react";
import PropTypes from "prop-types";
import { HashRouter, Route, Switch } from "react-router-dom";
import { HeaderBar } from "@dhis2/ui-widgets";

import { GenericLandingPage, EntryCapturePage, CacheCleanerPage } from "..";
import { defaultData } from "../../models";

const Root = ({ baseUrl, username, configurations }) => {
    return (
        <HashRouter>
            <Switch>
                {configurations.map(({ programme, page: PageComponent, data, header, title }) => [
                    <Route
                        path={`/${programme}/cache-cleaner`}
                        render={() => <CacheCleanerPage title={title} header={header} baseUrl={baseUrl} />}
                    />,
                    <Route
                        path={`/${programme}/:type(dataSet|program)/:element`}
                        render={() => <EntryCapturePage title={title} header={header} baseUrl={baseUrl} />}
                    />,
                    <Route
                        key={programme}
                        path={configurations.length > 1 ? `/${programme}` : "/"}
                        render={() => (
                            <PageComponent
                                title={title}
                                header={header}
                                baseUrl={baseUrl}
                                username={username}
                                items={data}
                            />
                        )}
                    />,
                ])}

                {configurations.length !== 1 && [
                    <Route
                        path={`/cache-cleaner`}
                        render={() => <CacheCleanerPage header={HeaderBar} baseUrl={baseUrl} />}
                    />,
                    <Route
                        render={() => (
                            <GenericLandingPage
                                items={defaultData(configurations)}
                                baseUrl={baseUrl}
                            />
                        )}
                    />,
                ]}
            </Switch>
        </HashRouter>
    );
};

Root.propTypes = {
    baseUrl: PropTypes.string.isRequired,
};

Root.defaultProps = {};

export default Root;
