import React, { useContext } from "react";
import { CompositionRoot } from "../../compositionRoot";
import { D2Api } from "../../types/d2-api";
import { Notification } from "../../domain/entities/Notification";

export interface AppContextState {
    api: D2Api;
    compositionRoot: CompositionRoot;
    notifications: Notification[];
}

export const AppContext = React.createContext<AppContextState | null>(null);

export function useAppContext() {
    const context = useContext(AppContext);
    if (context) {
        return context;
    } else {
        throw new Error("App context uninitialized");
    }
}
