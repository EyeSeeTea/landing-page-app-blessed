import React from "react";
import PropTypes from "prop-types";
import { HashRouter, Route, Switch } from "react-router-dom";

import { GenericLandingPage, HepatitisFormPage, CacheCleanerPage } from "..";
import { defaultData } from "../../models";

const Root = ({ baseUrl, username, configurations }) => {
    return (
        <HashRouter>
            <Switch>
                <Route
                    path={"/cache-cleaner"}
                    render={() => <CacheCleanerPage baseUrl={baseUrl} />}
                />

                {configurations.find(({ programme }) => programme === "hepatitis") && (
                    <Route
                        path={"/hepatitis/:type(dataSet|program)/:element"}
                        render={() => <HepatitisFormPage baseUrl={baseUrl} />}
                    />
                )}

                {configurations.map(({ programme, page: PageComponent, data, header }) => (
                    <Route
                        key={programme}
                        path={configurations.length > 1 ? `/${programme}` : "/"}
                        render={() => (
                            <PageComponent
                                header={header}
                                baseUrl={baseUrl}
                                username={username}
                                items={data}
                            />
                        )}
                    />
                ))}

                {configurations.length !== 1 && (
                    <Route
                        render={() => (
                            <GenericLandingPage
                                items={defaultData(configurations)}
                                baseUrl={baseUrl}
                            />
                        )}
                    />
                )}
            </Switch>
        </HashRouter>
    );
};

Root.propTypes = {
    baseUrl: PropTypes.string.isRequired,
};

Root.defaultProps = {};

export default Root;
