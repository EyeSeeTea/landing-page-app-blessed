import axios from "axios";
import _ from "lodash";
import nhwaHeader from "../components/headers/nhwa-header";
import whoHeader from "../components/headers/who-header";
import i18n from "../locales";
import { buildHepatitisData, nhwaData } from "../models";
import { nhwaClerkData, nhwaViewerData } from "../models/nhwa";
import { rabiesData, simpleRabiesData } from "../models/rabies";
import { snakebiteData } from "../models/snakebite";
import { ntdLeishKenyaData } from "../models/ntd_leish_kenya";
import {
    HepatitisLandingPage,
    NHWALandingPage,
    RabiesLandingPage,
    SnakebiteLandingPage,
    NTDLeishKenyaLandingPage,
} from "../pages";
import { goToDhis2Url } from "../utils";

//TODO: Ask if we need a simple snakebite data or not
const HEP_CASCADE_CURE_DATA_ENTRY = "OSHcVu6XSUL";
const HEP_POLICY_UPTAKE_DATA_ENTRY = "uMCylDhyzRr";

const NHWA_ADMINS = "EX00r2JNlQo";
const NHWA_DATA_CLERKS = "DWWxlpQi9M8";
const NHWA_DATA_MANAGERS = "xcDZeClzdse";
const NHWA_DATA_VIEWERS = "r7QSG6UcnDW";

const NTD_Leish_LandingPage_KEN = "aQt4ynXtBOS";

const NTD_SB = "JusJWdDa1LM";

export const NTD_NZD_admin = "foOXWD4beuA";
export const NTD_RAB_OIE = "pbZna7luFaM";
export const NTD_RAB_Estimates = "K7VPSVrAYeV";
export const NTD_RAB_WHO_Official = "Zr1fdsbkiAR";
export const NTD_RAB_WHO_RO = "pjwgXz3y70w";
export const SS_NTD_RAB_AggData_Entry = "Mg0TXhvvXJ4";
export const SS_NTD_RAB_AggData_View = "B6oADCiiW8v";

export const buildAvailableConfigurations = () => [
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
        data: buildHepatitisData(),
        icon: "img/hepatitis.png",
    },
    {
        programme: "rabies",
        title: i18n.t("WHO Rabies Webpage"),
        description: i18n.t("Rabies"),
        userGroupIds: [
            NTD_NZD_admin,
            NTD_RAB_Estimates,
            NTD_RAB_WHO_Official,
            NTD_RAB_WHO_RO,
            SS_NTD_RAB_AggData_Entry,
        ],
        page: RabiesLandingPage,
        header: whoHeader,
        data: rabiesData,
        icon: "img/rabies-dog.svg",
    },
    {
        programme: "rabies-no-data-entry",
        title: i18n.t("WHO Rabies Webpage"),
        description: i18n.t("Rabies (no data entry)"),
        userGroupIds: [NTD_RAB_OIE, SS_NTD_RAB_AggData_View],
        page: RabiesLandingPage,
        header: whoHeader,
        data: simpleRabiesData,
        icon: "img/rabies-dog.svg",
    },
    {
        programme: "snakebite",
        title: i18n.t("WHO Snakebite Webpage"),
        description: i18n.t("Snakebite"),
        userGroupIds: [NTD_SB],
        page: SnakebiteLandingPage,
        header: whoHeader,
        data: snakebiteData,
        icon: "img/snakebite-main.svg",
    },
    {
        programme: "ntd-leish-kenya",
        title: i18n.t("National Leishmaniasis Control Programme for Kenya"),
        description: i18n.t("Landing Page for MoH Kenya"),
        userGroupIds: [NTD_Leish_LandingPage_KEN],
        page: NTDLeishKenyaLandingPage,
        header: whoHeader,
        data: ntdLeishKenyaData,
        icon: "img/kenya.png",
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
    const configurations = buildAvailableConfigurations().filter(config =>
        shouldRedirect(userGroupIds, config.userGroupIds)
    );

    if (configurations.length > 0) {
        return { username: name, configurations };
    } else {
        goToDhis2Url(baseUrl, "/dhis-web-dashboard/index.action");
        return null;
    }
};
