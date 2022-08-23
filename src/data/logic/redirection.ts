import _ from "lodash";
import { isSuperAdmin, User } from "../../domain/entities/User";
import { buildHepatitisData, nhwaAdminData } from "../../domain/models";
import { nhwaClerkData, nhwaManagerData, nhwaViewerData } from "../../domain/models/nhwa/NHWA";
import { MalariaData } from "../../domain/models/east_mediterranian_mal/Malaria.jsx";
import { ntdLeishKenyaData } from "../../domain/models/ntd_leish_kenya/NTDLeishKenya";
import { rabiesData, simpleRabiesData } from "../../domain/models/rabies/Rabies";
import { snakebiteData } from "../../domain/models/snakebite/Snakebite";
import i18n from "../../locales";
import { goToDhis2Url } from "../../utils/utils";
import eastMalRepoHeader from "../../webapp/components/headers/east-mal-repo-header";
import nhwaHeader from "../../webapp/components/headers/nhwa-header";
import whoHeader from "../../webapp/components/headers/who-header";
import {
    HepatitisLandingPage,
    NHWALandingPage,
    NTDLeishKenyaLandingPage,
    RabiesLandingPage,
    SnakebiteLandingPage,
    MalariaLandingPage,
} from "../../webapp/pages";

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

const MAL_Malaria_Access = "ZXEVDM9XRea";

export interface Configuration {
    programme: string;
    title: string;
    description: string;
    userGroupIds: string[];
    page: any;
    header?: any;
    data?: any;
    icon: string;
}

export const buildAvailableConfigurations = (version: number): Configuration[] => [
    {
        programme: "nhwa-admins",
        title: i18n.t("National Health Workforce Accounts Online Data Platform"),
        description: i18n.t("NHWA Admins"),
        userGroupIds: [NHWA_ADMINS],
        page: NHWALandingPage,
        header: nhwaHeader,
        data: nhwaAdminData(version),
        icon: "img/icon.png",
    },
    {
        programme: "nhwa-managers",
        title: i18n.t("National Health Workforce Accounts Online Data Platform"),
        description: i18n.t("NHWA Data Managers"),
        userGroupIds: [NHWA_DATA_MANAGERS],
        page: NHWALandingPage,
        header: nhwaHeader,
        data: nhwaManagerData(version),
        icon: "img/icon.png",
    },
    {
        programme: "nhwa-data-clerks",
        title: i18n.t("National Health Workforce Accounts Online Data Platform"),
        description: i18n.t("NHWA Data Clerks"),
        userGroupIds: [NHWA_DATA_CLERKS],
        page: NHWALandingPage,
        header: nhwaHeader,
        data: nhwaClerkData(version),
        icon: "img/icon.png",
    },
    {
        programme: "nhwa-managers-viewers",
        title: i18n.t("National Health Workforce Accounts Online Data Platform"),
        description: i18n.t("NHWA Data Viewers"),
        userGroupIds: [NHWA_DATA_VIEWERS],
        page: NHWALandingPage,
        header: nhwaHeader,
        data: nhwaViewerData(version),
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
    {
        programme: "east-mediterranian-mal-repo",
        title: i18n.t("Eastern Mediterranean regional malaria repository"),
        description: i18n.t("Eastern Mediterranean regional malaria repository"),
        userGroupIds: [MAL_Malaria_Access],
        page: MalariaLandingPage,
        header: eastMalRepoHeader,
        data: MalariaData,
        icon: "img/east-mal-repo.png",
    },
];

const shouldRedirect = (actualIds: string[], expectedIds: string[]): boolean =>
    _.intersection(actualIds, expectedIds).length > 0;

export const handleRedirection = async (baseUrl: string, version: number, user: User) => {
    const isAdmin = isSuperAdmin(user);

    const userGroupIds = user.userGroups.map(userGroup => userGroup.id);
    const configurations = buildAvailableConfigurations(version).filter(
        config => isAdmin || shouldRedirect(userGroupIds, config.userGroupIds)
    );

    if (configurations.length > 0) {
        return { username: user.name, configurations };
    } else {
        goToDhis2Url(baseUrl, "/dhis-web-dashboard/index.action");
        return null;
    }
};
