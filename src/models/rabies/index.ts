import i18n from "@dhis2/d2-i18n";
import axios from "axios";
import { Ref } from "d2-api";
import _ from "lodash";
import qs from "qs";
import {
    NTD_NZD_admin,
    NTD_RAB_Estimates,
    NTD_RAB_WHO_Official,
    SS_NTD_RAB_AggData_Entry,
} from "../../logic/redirection";

const actionHumanRabiesDataEntry = async (baseUrl: string, cb: Function) =>
    actionRabiesDataEntry(baseUrl, cb, "human");

const actionAnimalRabiesDataEntry = async (baseUrl: string, cb: Function) =>
    actionRabiesDataEntry(baseUrl, cb, "animal");

const SOURCE_A = "pvLXvZvAtZV";
const SOURCE_B = "Os3X3EgDGn0";
const SOURCE_C = "rZePNSA78l8";
const SOURCE_D = "FYtmoLvrfbh";

const actionRabiesDataEntry = async (baseUrl: string, cb: Function, tab: "animal" | "human") => {
    const dataSet = "S1UMweeoPsi";

    const { userGroups } = (
        await axios.get(`${baseUrl}/api/me.json`, {
            params: { fields: "userGroups" },
            withCredentials: true,
        })
    ).data;

    const attributesByUserRole: {
        [id: string]: string[];
    } = {
        [NTD_NZD_admin]: [SOURCE_A, SOURCE_B, SOURCE_C, SOURCE_D],
        [NTD_RAB_Estimates]: [SOURCE_C],
        [NTD_RAB_WHO_Official]: [SOURCE_A],
        [SS_NTD_RAB_AggData_Entry]: [SOURCE_A, SOURCE_B, SOURCE_C, SOURCE_D],
    };

    const attributes = _(userGroups)
        .map(({ id }) => attributesByUserRole[id] ?? [])
        .flatten()
        .uniq()
        .value();

    const { dataInputPeriods } = (
        await axios.get(`${baseUrl}/api/dataSets/${dataSet}.json`, {
            params: { fields: "dataInputPeriods" },
            withCredentials: true,
        })
    ).data;

    const period =
        _.max(dataInputPeriods.map((dip: { period: Ref }) => parseInt(dip.period.id))) ??
        new Date().getFullYear() - 1;

    const { organisationUnits: allOrgUnits } = (
        await axios.get(`${baseUrl}/api/me.json`, {
            params: { fields: "organisationUnits[id,dataSets,level]" },
            withCredentials: true,
        })
    ).data;

    const organisationUnits = _.filter(allOrgUnits, ou =>
        ou.dataSets.map((ds: Ref) => ds.id).includes(dataSet)
    );

    const organisationUnit =
        organisationUnits.length === 1 && organisationUnits[0].level > 1
            ? organisationUnits[0].id
            : undefined;

    cb({
        type: "page",
        value: `rabies/dataSet/${dataSet}?${qs.stringify(
            {
                period,
                tab,
                attributes: attributes.length > 0 ? attributes : undefined,
                organisationUnit,
            },
            { arrayFormat: "comma" }
        )}`,
    });
};

export const rabiesData = [
    {
        key: "title-data",
        title: i18n.t("Rabies data"),
        rowLength: 1,
        enableBottomLine: true,
    },
    {
        key: "human-data-entry",
        title: i18n.t("Human rabies data entry"),
        description: i18n.t("Enter data on the human rabies data entry"),
        rowLength: 3,
        icon: "img/rabies-kid.svg",
        action: {
            type: "method",
            value: actionHumanRabiesDataEntry,
        },
    },
    {
        key: "animal-data-entry",
        title: i18n.t("Animal rabies data entry"),
        description: i18n.t("Enter data on the animal rabies data entry"),
        rowLength: 3,
        icon: "img/rabies-dog.svg",
        action: {
            type: "method",
            value: actionAnimalRabiesDataEntry,
        },
    },
    {
        key: "dashboard",
        title: i18n.t("Dashboard"),
        description: i18n.t("Access a dashboard visualizing the data that you entered before"),
        rowLength: 3,
        icon: "img/dhis-web-dashboard.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-dashboard/#/J4smYtbckhv",
        },
    },
    {
        key: "title-other",
        title: i18n.t("Other Useful Features"),
        rowLength: 1,
        size: "small",
        enableBottomLine: true,
    },
    {
        key: "cache-cleaner",
        title: i18n.t("Browser cache cleaner"),
        description: i18n.t("Enables the users to clear the browser cache"),
        rowLength: 2,
        size: "small",
        icon: "img/dhis-web-cache-cleaner.png",
        action: {
            type: "page",
            value: "/rabies/cache-cleaner",
        },
    },
    {
        key: "profile",
        title: i18n.t("User profile"),
        description: i18n.t("Allows the users to edit account credentials and public profile"),
        rowLength: 2,
        size: "small",
        icon: "img/dhis-web-profile.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-user-profile/#/profile",
        },
    },
];

export const simpleRabiesData = [
    {
        key: "title-data",
        title: i18n.t("Rabies data"),
        rowLength: 1,
        enableBottomLine: true,
    },
    {
        key: "dashboard",
        title: i18n.t("Dashboard"),
        description: i18n.t("Access a dashboard visualizing the data that you entered before"),
        rowLength: 1,
        icon: "img/dhis-web-dashboard.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-dashboard/#/J4smYtbckhv",
        },
    },
    {
        key: "title-other",
        title: i18n.t("Other Useful Features"),
        rowLength: 1,
        size: "small",
        enableBottomLine: true,
    },
    {
        key: "cache-cleaner",
        title: i18n.t("Browser cache cleaner"),
        description: i18n.t("Enables the users to clear the browser cache"),
        rowLength: 2,
        size: "small",
        icon: "img/dhis-web-cache-cleaner.png",
        action: {
            type: "page",
            value: "/rabies/cache-cleaner",
        },
    },
    {
        key: "profile",
        title: i18n.t("User profile"),
        description: i18n.t("Allows the users to edit account credentials and public profile"),
        rowLength: 2,
        size: "small",
        icon: "img/dhis-web-profile.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-user-profile/#/profile",
        },
    },
];
