import { useConfig, useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createGenerateClassName, StylesProvider } from "@material-ui/styles";
import { init } from "d2";
import { ApiContext, D2ApiDefault } from "d2-api";
import { LoadingProvider, SnackbarProvider } from "d2-ui-components";
import _ from "lodash";
import OldMuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import React, { useEffect, useState } from "react";
import { handleRedirection } from "../../logic/redirection";
import { sleep } from "../../utils";
import WHOLoading from "../../components/who-loading";
import "./App.css";
import Root from "./Root";
import muiThemeLegacy from "./themes/dhis2-legacy.theme";
import { muiTheme } from "./themes/dhis2.theme";

const generateClassName = createGenerateClassName({
    productionPrefix: "c",
});

const isLangRTL = code => {
    const langs = ["ar", "fa", "ur"];
    const prefixed = langs.map(c => `${c}-`);
    return _(langs).includes(code) || prefixed.filter(c => code && code.startsWith(c)).length > 0;
};

const configI18n = ({ keyUiLocale: uiLocale }) => {
    i18n.changeLanguage(uiLocale);
    document.documentElement.setAttribute("dir", isLangRTL(uiLocale) ? "rtl" : "ltr");
};

const initialQuery = {
    userSettings: { resource: "/userSettings" },
};

const App = () => {
    const { baseUrl } = useConfig();
    const [config, updateConfig] = useState({});
    const [loading, setLoading] = useState(true);
    const [d2, setD2] = useState(null);
    const [api, setApi] = useState(null);
    const { loading: apiLoading, error, data } = useDataQuery(initialQuery);

    useEffect(() => {
        const run = async () => {
            const d2 = await init({ baseUrl: baseUrl + "/api" });
            const api = new D2ApiDefault({ baseUrl });
            Object.assign({ d2, api });

            configI18n(data.userSettings);
            setD2(d2);
            setApi(api);
            Object.assign(window, { d2, api });

            handleRedirection(baseUrl).then(options => {
                updateConfig(options);
                if (options.title) document.title = options.title;
                sleep(1000).then(() => setLoading(false));
            });
        };

        if (data) run();
    }, [data, baseUrl]);

    if (error) {
        return (
            <h3>
                <a rel="noopener noreferrer" target="_blank" href={baseUrl}>
                    Login
                </a>
                {` ${baseUrl}`}
            </h3>
        );
    } else if (loading || apiLoading || !d2 || !api) {
        return <WHOLoading />;
    } else {
        return (
            <StylesProvider generateClassName={generateClassName}>
                <MuiThemeProvider theme={muiTheme}>
                    <OldMuiThemeProvider muiTheme={muiThemeLegacy}>
                        <LoadingProvider>
                            <SnackbarProvider>
                                <div id="app" className="content">
                                    <ApiContext.Provider value={{ d2, api }}>
                                        <Root baseUrl={baseUrl} {...config} />
                                    </ApiContext.Provider>{" "}
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
