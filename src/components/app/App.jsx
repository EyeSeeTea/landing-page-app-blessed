import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createGenerateClassName, MuiThemeProvider } from "@material-ui/core/styles";
import OldMuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import JssProvider from "react-jss/lib/JssProvider";

import Root from "./Root";
import WHOHeader from "../who-header";
import { useLoading } from "../loading";
import { muiTheme } from "./themes/dhis2.theme";
import muiThemeLegacy from "./themes/dhis2-legacy.theme";
import { handleRedirection } from "../../logic/redirection";
import "./App.css";

const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS: false,
    productionPrefix: "c",
});

const App = ({ d2 }) => {
    const baseUrl = d2.system.systemInfo.contextPath;
    const [renderLoading, updateLoading] = useLoading({ isLoading: true });
    const [headerOptions, updateHeader] = useState({});

    useEffect(() => {
        handleRedirection(baseUrl).then(options => {
            updateLoading({ isLoading: false });
            updateHeader(options);
            if (options.title) document.title = options.title;
        });
    }, [baseUrl, updateLoading, updateHeader]);

    return (
        <JssProvider generateClassName={generateClassName}>
            <MuiThemeProvider theme={muiTheme}>
                <OldMuiThemeProvider muiTheme={muiThemeLegacy}>
                    <React.Fragment>
                        {renderLoading}
                        <div id="app" className="content">
                            <WHOHeader baseUrl={baseUrl} {...headerOptions} />
                            <Root baseUrl={baseUrl} />
                        </div>
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
