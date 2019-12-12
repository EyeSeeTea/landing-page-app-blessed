import i18n from "@dhis2/d2-i18n";
import _ from "lodash";

export const nhwaData = [
    {
        key: "maturity-assessment-title",
        title: i18n.t("NHWA maturity assessment"),
        rowLength: 1,
    },
    {
        key: "maturity-assessment-link",
        iconDescription: i18n.t(
            "NHWA maturity assessment enables countries to assess their national information system and its capacity to address the NHWA indicators."
        ),
        rowLength: 1,
        icon: "img/dhis-web-dataentry.png",
        size: "small",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-dataentry/index.action",
        },
    },
    {
        key: "validate-baseline-data-title",
        title: i18n.t("Validate existing baseline data"),
        rowLength: 1,
    },
    {
        key: "validate-baseline-data-link",
        iconDescription: i18n.t(
            "The validation exercise enables countries to view existing data and undertake necessary action of data correction/update as required."
        ),
        rowLength: 1,
        icon: "img/dhis-web-reporting.png",
        size: "small",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-pivot/index.html?id=mElD0yiuFpU",
        },
    },
    {
        key: "nhwa-data-entry-title",
        title: i18n.t("NHWA data entry"),
        description: i18n.t(
            "Data entry into the system can be done (i) directly through the system interface or (ii) as batch upload through excel sheets."
        ),
        size: "small",
        rowLength: 1,
    },
    {
        key: "nhwa-data-entry-link",
        iconDescription: i18n.t("Data entry through the system interface"),
        rowLength: 3,
        icon: "img/dhis-web-dataentry.png",
        size: "small",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-dataentry/index.action",
        },
    },
    {
        key: "excel-importer-link",
        iconDescription: i18n.t("Batch upload through excel sheets"),
        rowLength: 3,
        icon: "img/excel-importer.png",
        size: "small",
        action: {
            type: "dhisRedirect",
            value: "/api/apps/NHWA-Data-Importer/index.html",
        },
    },
    {
        key: "visualize-data-title",
        title: i18n.t("Visualise data"),
        description: i18n.t(
            "Access programmed data infographics or create customised data visualisation with the existing data."
        ),
        size: "small",
        rowLength: 1,
    },
    {
        key: "pivot-table-link",
        iconDescription: i18n.t("Pivot table"),
        description: i18n.t("Enables users to create pivot tables, using available data"),
        rowLength: 3,
        icon: "img/dhis-web-pivot.png",
        size: "small",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-pivot/index.action",
        },
    },
    {
        key: "data-visualizer-link",
        iconDescription: i18n.t("Data Visualizer"),
        description: i18n.t(
            "Enables users to easily create dynamic data analysis and visualizations through charts and data tables."
        ),
        rowLength: 3,
        icon: "img/dhis-web-visualizer.png",
        size: "small",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-visualizer/index.action",
        },
    },
    {
        key: "gis-link",
        iconDescription: i18n.t("GIS"),
        description: i18n.t("Enables users to visualize data in Geographical location system."),
        rowLength: 3,
        icon: "img/dhis-web-mapping.png",
        size: "small",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-mapping/index.action",
        },
    },
    {
        key: "dashboard-link",
        iconDescription: i18n.t("Dashboard"),
        description: i18n.t("Access pre populated data infographics based on existing data"),
        rowLength: 3,
        icon: "img/dhis-web-dashboard.png",
        size: "small",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-dashboard/index.html",
        },
    },
    {
        key: "nhwa-reports-link",
        iconDescription: i18n.t("NHWA Reports"),
        description: i18n.t("Access to the NHWA reports"),
        rowLength: 3,
        icon: "img/dhis-web-reporting.png",
        size: "small",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-reporting/displayViewReportForm.action",
        },
    },
    {
        key: "other-features-title",
        title: i18n.t("Other Useful features"),
        size: "small",
        rowLength: 1,
    },
    {
        key: "cache-cleaner-link",
        iconDescription: i18n.t("Browser cache cleaner"),
        description: i18n.t("Enables the users to clear the browser cache"),
        rowLength: 3,
        size: "small",
        icon: "img/dhis-web-cache-cleaner.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-cache-cleaner/index.action",
        },
    },
    {
        key: "data-quality-link",
        iconDescription: i18n.t("Data Quality"),
        description: i18n.t(
            "Enables the users to run data quality checks such as validation and Std dev outlier analysis."
        ),
        rowLength: 3,
        size: "small",
        icon: "img/dhis-web-data-quality.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-data-quality/index.html",
        },
    },
    {
        key: "data-approval-link",
        iconDescription: i18n.t("Approval"),
        description: i18n.t("Enables the users to approves the data submitted in the system"),
        rowLength: 3,
        size: "small",
        icon: "img/dhis-web-data-approval.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-reporting/showDataApprovalForm.action",
        },
    },
    {
        key: "profile-link",
        iconDescription: i18n.t("User profile"),
        description: i18n.t("Allows the users to edit account credentials and public profile"),
        rowLength: 3,
        size: "small",
        icon: "img/dhis-web-profile.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-user-profile/#/profile",
        },
    },
];

export const nhwaClerkData = _.filter(nhwaData, ({ key }) => !["data-approval-link"].includes(key));

export const nhwaViewerData = _.filter(
    nhwaData,
    ({ key }) =>
        ![
            "data-approval-link",
            "data-quality-link",
            "nhwa-data-entry-title",
            "nhwa-data-entry-link",
        ].includes(key)
);
