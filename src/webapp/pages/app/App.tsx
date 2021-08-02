import { useConfig } from "@dhis2/app-runtime";
import { SnackbarProvider } from "@eyeseetea/d2-ui-components";
import { MuiThemeProvider } from "@material-ui/core/styles";
//@ts-ignore
import OldMuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import React, { useEffect, useState } from "react";
import { getCompositionRoot } from "../../../compositionRoot";
import { Instance } from "../../../domain/entities/Instance";
import { handleRedirection } from "../../../data/logic/redirection";
import { D2Api } from "../../../types/d2-api";
import { getMajorVersion } from "../../../utils/d2-api";
import { sleep } from "../../../utils/utils";
import WHOLoading from "../../components/who-loading/WHOLoading";
import { AppContext, AppContextState } from "../../contexts/app-context";
import "./App.css";
import { Router, RouterProps } from "./Router";
import muiThemeLegacy from "./themes/dhis2-legacy.theme";
import { muiTheme } from "./themes/dhis2.theme";

const App = ({ api }: { api: D2Api }) => {
    const { baseUrl } = useConfig();
    const [loading, setLoading] = useState(true);
    const [appContext, setAppContext] = useState<AppContextState | null>(null);
    const [routerProps, setRouterProps] = useState<RouterProps>();

    useEffect(() => {
        async function setup() {
            const instance = new Instance({ url: baseUrl });
            const compositionRoot = getCompositionRoot(instance);
            const userNotifications = await compositionRoot.usecases.notifications.list();
            setAppContext({ api, compositionRoot, userNotifications });

            const user = await compositionRoot.usecases.instance.getCurrentUser();
            const version = await compositionRoot.usecases.instance.getVersion();
            const apiVersion = getMajorVersion(version);
            const options = await handleRedirection(baseUrl, apiVersion, user);
            if (options) setRouterProps({ ...options, baseUrl });

            await sleep(1000);
            setLoading(false);
        }
        setup();
    }, [baseUrl, api]);

    if (loading) {
        return <WHOLoading />;
    }

    return (
        <MuiThemeProvider theme={muiTheme}>
            <OldMuiThemeProvider muiTheme={muiThemeLegacy}>
                <SnackbarProvider>
                    <div id="app" className="content">
                        <AppContext.Provider value={appContext}>
                            {routerProps ? <Router {...routerProps} /> : null}
                        </AppContext.Provider>
                    </div>
                </SnackbarProvider>
            </OldMuiThemeProvider>
        </MuiThemeProvider>
    );
};

export default React.memo(App);
