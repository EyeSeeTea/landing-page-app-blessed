import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { createGenerateClassName, MuiThemeProvider } from "@material-ui/core/styles";
import OldMuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import JssProvider from "react-jss/lib/JssProvider";

import Root from "./Root";
import WHOHeader from "../who-header";
import WHOLoading from "../who-loading";
import { muiTheme } from "./themes/dhis2.theme";
import muiThemeLegacy from "./themes/dhis2-legacy.theme";
import { handleRedirection } from "../../logic/redirection";
import { sleep } from "../../utils";
import "./App.css";

const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS: false,
    productionPrefix: "c",
});

const App = ({ d2 }) => {
    const baseUrl = d2.system.systemInfo.contextPath;
    const [headerOptions, updateHeader] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        handleRedirection(baseUrl).then(options => {
            updateHeader(options);
            if (options.title) document.title = options.title;
            sleep(1000).then(() => setLoading(false));
        });
    }, [baseUrl, loading, updateHeader]);

    return (
        <JssProvider generateClassName={generateClassName}>
            <MuiThemeProvider theme={muiTheme}>
                <OldMuiThemeProvider muiTheme={muiThemeLegacy}>
                    <React.Fragment>
                        {loading ? (
                            <WHOLoading />
                        ) : (
                            <div id="app" className="content">
                                <WHOHeader baseUrl={baseUrl} {...headerOptions} />
                                <Root baseUrl={baseUrl} />
                            </div>
                        )}
                    </React.Fragment>
                </OldMuiThemeProvider>
            </MuiThemeProvider>
        </JssProvider>
    );
};

App.propTypes = {
    d2: PropTypes.object.isRequired,
};

App.defaultProps = {};

export default App;
