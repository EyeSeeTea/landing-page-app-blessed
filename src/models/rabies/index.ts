import i18n from "@dhis2/d2-i18n";
import axios from "axios";
import _ from "lodash";
import { Ref } from "d2-api";

const actionHumanRabiesDataEntry = async (baseUrl: string, cb: Function) =>
    actionRabiesDataEntry(baseUrl, cb, "human");

const actionAnimalRabiesDataEntry = async (baseUrl: string, cb: Function) =>
    actionRabiesDataEntry(baseUrl, cb, "animal");

const actionRabiesDataEntry = async (baseUrl: string, cb: Function, type: "animal" | "human") => {
    const dataSet = "S1UMweeoPsi";

    const { dataInputPeriods } = (
        await axios.get(`${baseUrl}/api/dataSets/${dataSet}.json`, {
            params: { fields: "dataInputPeriods" },
            withCredentials: true,
        })
    ).data;

    const period = _.max(dataInputPeriods.map((dip: { period: Ref }) => parseInt(dip.period.id)));

    const { organisationUnits } = (
        await axios.get(`${baseUrl}/api/me.json`, {
            params: { fields: "organisationUnits[id,dataSets]" },
            withCredentials: true,
        })
    ).data;

    // TODO: Edge case not controlled (multiple valid OUs)
    const organisationUnit = _.find(organisationUnits, ou =>
        ou.dataSets.map((ds: Ref) => ds.id).includes(dataSet)
    );

    if (organisationUnit) {
        cb({
            type: "page",
            value: `rabies/dataSet/${dataSet}?period=${period}&tab=${type}&organisationUnit=${organisationUnit.id}`,
        });
    } else {
        cb({
            type: "page",
            value: `rabies/dataSet/${dataSet}?period=${period}&tab=${type}`,
        });
    }
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
            value: "/dhis-web-dashboard/index.action",
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
            value: "/cache-cleaner",
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
