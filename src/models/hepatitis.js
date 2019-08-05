import _ from "lodash";
import axios from "axios";
import i18n from "@dhis2/d2-i18n";

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
    const organisationUnit = _.find(organisationUnits, ou =>
        ou.dataSets.map(ds => ds.id).includes(dataSet)
    );

    if (organisationUnit) {
        cb({
            type: "page",
            value: `entryCapture/dataSet/${dataSet}?period=${period}&organisationUnit=${organisationUnit.id}`,
        });
    } else {
        cb({
            type: "page",
            value: `entryCapture/dataSet/${dataSet}?period=${period}`,
        });
    }
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

    try {
        // TODO: Edge case not controlled (multiple events already recorded)
        const event = events[0]
            ? events[0].event
            : (await axios.post(`${baseUrl}/api/events`, {
                  program,
                  orgUnit: organisationUnit.id,
                  attributeCategoryOptions: categoryOption.id,
                  eventDate: new Date(),
              })).data.response.importSummaries[0].reference;

        cb({
            type: "page",
            value: `entryCapture/program/${program}?event=${event}`,
        });
    } catch (error) {
        console.error(error);
        cb({
            type: "page",
            value: `entryCapture/program/${program}`,
        });
    }
};

export const hepatitisData = [
    {
        key: "title-data",
        title: i18n.t("Data"),
        rowLength: 1,
    },
    {
        key: "data-entry",
        title: i18n.t("Cascade of care / cure"),
        description: i18n.t("Enter data for Cascade of care / cure data set."),
        rowLength: 3,
        icon: "img/dhis-web-dataentry.png",
        action: {
            type: "method",
            value: actionCascadeCare,
        },
    },
    {
        key: "event-capture",
        title: i18n.t("Policy uptake"),
        description: i18n.t(
            "Register event for Report your situation with respect to policy uptake program."
        ),
        rowLength: 3,
        icon: "img/dhis-web-event-capture.png",
        action: {
            type: "method",
            value: actionPolicyUptake,
        },
    },
    {
        key: "dashboard",
        title: i18n.t("Dashboard"),
        description: i18n.t("Access pre populated data infographics based on existing data."),
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
    },
    {
        key: "cache-cleaner",
        title: i18n.t("Browser Cache Cleaner"),
        description: i18n.t("Enables the users to clear the browser cache."),
        rowLength: 2,
        icon: "img/dhis-web-cache-cleaner.png",
        action: {
            type: "page",
            value: "/cache-cleaner",
        },
    },
    {
        key: "profile",
        title: i18n.t("User Profile"),
        description: i18n.t("Enable the user to set his profile and account credentials."),
        rowLength: 2,
        icon: "img/dhis-web-profile.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-user-profile/#/profile",
        },
    },
];
