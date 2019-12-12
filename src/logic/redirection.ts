import axios from "axios";
import _ from "lodash";
import { goToDhis2Url, existsDhis2Url } from "../utils";
import whoHeader from "../components/headers/who-header";
import nhwaHeader from "../components/headers/nhwa-header";
import { hepatitisData, nhwaData } from "../models";
import { HepatitisLandingPage, NHWALandingPage } from "../pages";
import { nhwaViewerData, nhwaClerkData } from "../models/nhwa";

const HEP_CASCADE_CURE_DATA_ENTRY = "OSHcVu6XSUL";
const HEP_POLICY_UPTAKE_DATA_ENTRY = "uMCylDhyzRr";

const NHWA_ADMINS = "EX00r2JNlQo";
const NHWA_DATA_CLERKS = "DWWxlpQi9M8";
const NHWA_DATA_MANAGERS = "xcDZeClzdse";
const NHWA_DATA_VIEWERS = "r7QSG6UcnDW";

const NTD_LSH_LandingPage_KEN = "aQt4ynXtBOS";

export const availableConfigurations = [
    {
        programme: "nhwa-managers",
        title: "National Health Workforce Accounts Online Data Platform",
        description: "NHWA Data Managers and NHWA Admins",
        userGroupIds: [NHWA_DATA_MANAGERS, NHWA_ADMINS],
        page: NHWALandingPage,
        header: nhwaHeader,
        data: nhwaData,
        icon: "img/icon.png",
    },
    {
        programme: "nhwa-data-clerks",
        title: "National Health Workforce Accounts Online Data Platform",
        description: "NHWA Data Clerks",
        userGroupIds: [NHWA_DATA_CLERKS],
        page: NHWALandingPage,
        header: nhwaHeader,
        data: nhwaClerkData,
        icon: "img/icon.png",
    },
    {
        programme: "nhwa-managers-viewers",
        title: "National Health Workforce Accounts Online Data Platform",
        description: "NHWA Data Viewers",
        userGroupIds: [NHWA_DATA_VIEWERS],
        page: NHWALandingPage,
        header: nhwaHeader,
        data: nhwaViewerData,
        icon: "img/icon.png",
    },
    {
        programme: "hepatitis",
        title: "Home page for the Global Reporting System for Hepatitis",
        description: "Hepatitis",
        userGroupIds: [HEP_CASCADE_CURE_DATA_ENTRY, HEP_POLICY_UPTAKE_DATA_ENTRY],
        page: HepatitisLandingPage,
        header: whoHeader,
        data: hepatitisData,
        icon: "img/hepatitis.png",
    },
];

const shouldRedirect = (actualIds: string[], expectedIds: string[]): boolean =>
    _.intersection(actualIds, expectedIds).length > 0;

export const handleRedirection = async (baseUrl: string) => {
    const url = `${baseUrl}/api/me.json?fields=name,userGroups[id]`;
    const { name, userGroups } = (
        await axios.get(url, {
            withCredentials: true,
        })
    ).data as { name: string; userGroups: Array<{ id: string }> };

    const userGroupIds = userGroups.map(userGroup => userGroup.id);
    const configurations = availableConfigurations.filter(config =>
        shouldRedirect(userGroupIds, config.userGroupIds)
    );

    if (configurations.length > 0) {
        return { username: name, configurations };
    } else if (
        shouldRedirect(userGroupIds, [NTD_LSH_LandingPage_KEN]) &&
        (await existsDhis2Url(baseUrl, "/api/apps/Landing-Page/index.html"))
    ) {
        goToDhis2Url(baseUrl, "/api/apps/Landing-Page/index.html");
        return null;
    } else {
        goToDhis2Url(baseUrl, "/dhis-web-dashboard/index.action");
        return null;
    }
};
