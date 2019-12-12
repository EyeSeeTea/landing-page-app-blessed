import axios from "axios";
import _ from "lodash";
import { goToDhis2Url, existsDhis2Url } from "../utils";
import whoHeader from "../components/headers/who-header";
import nhwaHeader from "../components/headers/nhwa-header";
import { hepatitisData, nhwaData } from "../models";
import { HepatitisLandingPage, NHWALandingPage } from "../pages";
import { nhwaViewerData, nhwaClerkData } from "../models/nhwa";
import { rabiesData } from "../models/rabies";
import i18n from "../locales";

const HEP_CASCADE_CURE_DATA_ENTRY = "OSHcVu6XSUL";
const HEP_POLICY_UPTAKE_DATA_ENTRY = "uMCylDhyzRr";

const NHWA_ADMINS = "EX00r2JNlQo";
const NHWA_DATA_CLERKS = "DWWxlpQi9M8";
const NHWA_DATA_MANAGERS = "xcDZeClzdse";
const NHWA_DATA_VIEWERS = "r7QSG6UcnDW";

const NTD_LSH_LandingPage_KEN = "aQt4ynXtBOS";
const NTD_RAB_WHO_Official = "Zr1fdsbkiAR";

export const availableConfigurations = [
    {
        programme: "nhwa-managers",
        title: i18n.t("National Health Workforce Accounts Online Data Platform"),
        description: i18n.t("NHWA Data Managers and NHWA Admins"),
        userGroupIds: [NHWA_DATA_MANAGERS, NHWA_ADMINS],
        page: NHWALandingPage,
        header: nhwaHeader,
        data: nhwaData,
        icon: "img/icon.png",
    },
    {
        programme: "nhwa-data-clerks",
        title: i18n.t("National Health Workforce Accounts Online Data Platform"),
        description: i18n.t("NHWA Data Clerks"),
        userGroupIds: [NHWA_DATA_CLERKS],
        page: NHWALandingPage,
        header: nhwaHeader,
        data: nhwaClerkData,
        icon: "img/icon.png",
    },
    {
        programme: "nhwa-managers-viewers",
        title: i18n.t("National Health Workforce Accounts Online Data Platform"),
        description: i18n.t("NHWA Data Viewers"),
        userGroupIds: [NHWA_DATA_VIEWERS],
        page: NHWALandingPage,
        header: nhwaHeader,
        data: nhwaViewerData,
        icon: "img/icon.png",
    },
    {
        programme: "hepatitis",
        title: i18n.t("Home page for the Global Reporting System for Hepatitis"),
        description: i18n.t("Hepatitis"),
        userGroupIds: [HEP_CASCADE_CURE_DATA_ENTRY, HEP_POLICY_UPTAKE_DATA_ENTRY],
        page: HepatitisLandingPage,
        header: whoHeader,
        data: hepatitisData,
        icon: "img/hepatitis.png",
    },
    {
        programme: "rabies",
        title: i18n.t("Home page for the Rabies module"),
        description: i18n.t("Rabies"),
        userGroupIds: [NTD_RAB_WHO_Official],
        page: HepatitisLandingPage,
        header: whoHeader,
        data: rabiesData,
        icon: "img/rabies-dog.svg",
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
