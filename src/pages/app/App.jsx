import { useConfig } from "@dhis2/app-runtime";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createGenerateClassName, StylesProvider } from "@material-ui/styles";
import axios from "axios";
import { LoadingProvider, SnackbarProvider } from "d2-ui-components";
import OldMuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import React, { useEffect, useState } from "react";
import WHOLoading from "../../components/who-loading";
import { handleRedirection } from "../../logic/redirection";
import { sleep } from "../../utils";
import { getMajorVersion } from "../../utils/d2-api";
import "./App.css";
import Root from "./Root";
import muiThemeLegacy from "./themes/dhis2-legacy.theme";
import { muiTheme } from "./themes/dhis2.theme";

const generateClassName = createGenerateClassName({
    productionPrefix: "c",
});

const App = () => {
    const { baseUrl } = useConfig();
    const [config, updateConfig] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${baseUrl}/api/system/info.json`, {
                withCredentials: true,
            })
            .then(({ data }) => {
                const apiVersion = getMajorVersion(data.version);
                return handleRedirection(baseUrl, apiVersion);
            })
            .then(options => {
                updateConfig(options);
                if (options.title) document.title = options.title;
                return sleep(1000);
            })
            .then(() => setLoading(false));
    }, [baseUrl]);

    if (loading) {
        return <WHOLoading />;
    } else {
        return (
            <StylesProvider generateClassName={generateClassName}>
                <MuiThemeProvider theme={muiTheme}>
                    <OldMuiThemeProvider muiTheme={muiThemeLegacy}>
                        <LoadingProvider>
                            <SnackbarProvider>
                                <div id="app" className="content">
                                    <Root baseUrl={baseUrl} {...config} />
                                </div>
                            </SnackbarProvider>
                        </LoadingProvider>
                    </OldMuiThemeProvider>
                </MuiThemeProvider>
            </StylesProvider>
        );
    }
};

export default App;
