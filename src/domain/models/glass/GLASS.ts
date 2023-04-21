import _ from "lodash";
import i18n from "../../../locales";

export const glassAdminData = (reportsMenuDashboard: string, validationReportDashboard: string) => [
    {
        key: "glass-app",
        title: i18n.t("Submit country data"),
        description: i18n.t("Access, upload and download files on behalf of a country"),
        rowLength: 2,
        icon: "img/glass.png",
        action: {
            type: "dhisRedirect",
            value: "/api/apps/glass/index.html#/?orgUnit=VYVKdqiXo4b",
        },
    },
    {
        key: "glass-reports-link",
        title: i18n.t("GLASS Reports"),
        description: i18n.t(
            "Approve/reject data submissions, accept/deny data modification requests and monitor the status global data submissions"
        ),
        rowLength: 2,
        icon: "img/dhis-web-reports.png",
        action: {
            type: "method",
            value: async (_baseUrl: string, cb: Function) => {
                cb({
                    type: "dhisRedirect",
                    value: "/api/apps/DHIS2-GLASS-Submission-Report/index.html",
                });
            },
        },
    },
    {
        key: "reports-menu",
        title: i18n.t("View GLASS submitted data"),
        description: i18n.t("View what countries have submitted data"),
        rowLength: 2,
        icon: "img/dhis-web-dashboard.png",
        action: {
            type: "dhisRedirect",
            value: `/dhis-web-dashboard/index.html#/${reportsMenuDashboard}`,
        },
    },
    {
        key: "validation-report",
        title: i18n.t("Validate GLASS unapproved data"),
        description: i18n.t("View and validate GLASS unapproved data"),
        rowLength: 2,
        icon: "img/dhis-web-dashboard.png",
        action: {
            type: "dhisRedirect",
            value: `/dhis-web-dashboard/index.html#/${validationReportDashboard}`,
        },
    },
    {
        key: "capture-link",
        title: i18n.t("Country Enrolment"),
        description: "View and edit the country enrolment",
        rowLength: 2,
        icon: "img/dhis-web-capture.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-tracker-capture/index.html",
        },
    },
    {
        key: "bulk-load",
        title: i18n.t("Bulk Load"),
        description: i18n.t("Extract and upload historical data from the database in batch by country and by year"),
        rowLength: 2,
        icon: "img/bl.png",
        action: {
            type: "dhisRedirect",
            value: "/api/apps/Bulk-Load/index.html",
        },
    },
    {
        key: "user-extended-link",
        title: i18n.t("User Management"),
        description: i18n.t("List, edit or create users in the GLASS platform"),
        rowLength: 2,
        icon: "img/user-extended.png",
        action: {
            type: "dhisRedirect",
            value: "/api/apps/User-Extended-App/index.html",
        },
    },
    {
        key: "messaging-link",
        title: i18n.t("Messaging"),
        description: i18n.t("Send internal messages to other users in the GLASS Platform"),
        rowLength: 2,
        icon: "img/dhis-web-messaging.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-messaging",
        },
    },
];

export const glassRegionalData = (reportsMenuDashboard: string, validationReportDashboard: string) =>
    _.filter(
        glassAdminData(reportsMenuDashboard, validationReportDashboard),
        ({ key }) => !["capture-link", "messaging-link", "user-extended-link"].includes(key)
    );
