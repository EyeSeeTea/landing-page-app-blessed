import _ from "lodash";
import axios from "axios";
import i18n from "@dhis2/d2-i18n";

import { getGridRow } from "../utils";

const actionCascadeCare = async (baseUrl, cb) => {
    const dataSet = "jfawDJZ5fOX";

    const { dataInputPeriods } = (await axios.get(`${baseUrl}/api/dataSets/${dataSet}.json`, {
        params: { fields: "dataInputPeriods" },
    })).data;

    const period = _.max(dataInputPeriods.map(dip => parseInt(dip.period.id)));

    const { organisationUnits } = (await axios.get(`${baseUrl}/api/me.json`, {
        params: { fields: "organisationUnits[id,dataSets]" },
    })).data;

    // TODO: Edge case not controlled (multiple valid OUs)
    const organisationUnit =
        _.find(organisationUnits, ou => ou.dataSets.map(ds => ds.id).includes(dataSet)) ||
        organisationUnits[0];

    cb(`entryCapture/dataSet/${organisationUnit.id}/${dataSet}/${period}`);
};

const actionPolicyUptake = async (baseUrl, cb) => {
    const program = "cTzRXZGNvqz";

    const { categoryCombo, programStages } = (await axios.get(
        `${baseUrl}/api/programs/${program}.json`,
        {
            params: {
                fields: "programStages,categoryCombo[id,categories[categoryOptions[id,code]]]",
                paging: false,
            },
        }
    )).data;

    const categoryOption = _.maxBy(
        categoryCombo.categories[0].categoryOptions.map(({ id, code }) => ({
            id,
            code: parseInt(code),
        })),
        "code"
    );

    const period = categoryOption.code;

    const { organisationUnits } = (await axios.get(`${baseUrl}/api/me.json`, {
        params: { fields: "organisationUnits[id,programs]" },
    })).data;

    // TODO: Edge case not controlled (multiple valid OUs)
    const organisationUnit =
        _.find(organisationUnits, ou => ou.programs.map(ds => ds.id).includes(program)) ||
        organisationUnits[0];

    const { events } = (await axios.get(`${baseUrl}/api/events.json`, {
        params: {
            fields: "event",
            orgUnit: organisationUnit.id,
            programStage: programStages[0].id,
            attributeCc: categoryCombo.id,
            attributeCos: categoryOption.id,
            paging: false,
        },
    })).data;

    // TODO: Edge case not controlled (multiple events already recorded)
    const event = events[0]
        ? events[0].event
        : (await axios.post(`${baseUrl}/api/events`, {
              program,
              orgUnit: organisationUnit.id,
              attributeCategoryOptions: categoryOption.id,
              eventDate: new Date(),
          })).data.response.importSummaries[0].reference;

    cb(`entryCapture/program/${organisationUnit.id}/${event}/${period}`);
};

export const HepatitisData = [
    ["title-data", i18n.t("Data"), null, null, null, getGridRow(1)],
    [
        "data-entry",
        i18n.t("Cascade of care / cure"),
        i18n.t("Enter data for Cascade of care / cure data set."),
        "img/dhis-web-dataentry.png",
        actionCascadeCare,
        getGridRow(3),
    ],
    [
        "event-capture",
        i18n.t("Policy uptake"),
        i18n.t("Register event for Report your situation with respect to policy uptake program."),
        "img/dhis-web-event-capture.png",
        actionPolicyUptake,
        getGridRow(3),
    ],
    [
        "dashboard",
        i18n.t("Dashboard"),
        i18n.t("Access pre populated data infographics based on existing data."),
        "img/dhis-web-dashboard.png",
        "/dhis-web-dashboard/index.action",
        getGridRow(3),
    ],
    ["title-other", i18n.t("Other Useful Features"), null, null, null, getGridRow(1)],
    [
        "cache-cleaner",
        i18n.t("Browser Cache Cleaner"),
        i18n.t("Enables the users to clear the browser cache."),
        "img/dhis-web-cache-cleaner.png",
        "/dhis-web-cache-cleaner/index.action",
        getGridRow(3),
    ],
    [
        "profile",
        i18n.t("User Profile"),
        i18n.t("Enable the user to set his profile and account credentials."),
        "img/dhis-web-profile.png",
        "/dhis-web-user-profile/#/profile",
        getGridRow(3),
    ],
    [
        "messaging",
        i18n.t("Messaging"),
        i18n.t(
            "Enables the user to communicate with other users in the system and give feedback to the system administrators."
        ),
        "img/dhis-web-messaging.png",
        "/dhis-web-messaging",
        getGridRow(3),
    ],
];
