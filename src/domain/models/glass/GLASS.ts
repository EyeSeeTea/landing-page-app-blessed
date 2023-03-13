import _ from "lodash";
import i18n from "../../../locales";

export const glassAdminData = [
    {
        key: "glass-dashboard-link",
        title: i18n.t("GLASS Dashboard"),
        description: i18n.t("View what countries have submitted data"),
        rowLength: 3,
        icon: "img/dhis-web-dashboard.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-dashboard/index.html#/w7Kub3oACD9",
        },
    },
    {
        key: "bulk-load",
        title: i18n.t("Bulk Load"),
        description: i18n.t("Extract and upload historical data from the database in batch by country and by year"),
        rowLength: 3,
        icon: "img/bl.png",
        action: {
            type: "dhisRedirect",
            value: "/api/apps/Bulk-Load/index.html",
        },
    },
    {
        key: "glass-app",
        title: i18n.t("GLASS App"),
        description: i18n.t("Access, upload and download files on behalf of a country"),
        rowLength: 3,
        icon: "img/glass.png",
        action: {
            type: "dhisRedirect",
            value: "/api/apps/glass/index.html#/?orgUnit=VYVKdqiXo4b",
        },
    },
    {
        key: "messaging-link",
        title: i18n.t("Messaging"),
        description: i18n.t("Send internal messages to other users in the GLASS Platform"),
        rowLength: 3,
        icon: "img/dhis-web-messaging.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-messaging",
        },
    },
    {
        key: "glass-reports-link",
        title: i18n.t("GLASS Reports"),
        description: i18n.t("Access to the GLASS reports for data approval and submission"),
        rowLength: 3,
        icon: "img/dhis-web-reports.png",
        action: {
            type: "method",
            value: async (_baseUrl: string, cb: Function) => {
                cb({
                    type: "dhisRedirect",
                    value: "/dhis-web-reports/index.html#/standard-report",
                });
            },
        },
    },
    {
        key: "capture-link",
        title: i18n.t("Capture"),
        description: "View and edit the country enrolment",
        rowLength: 3,
        icon: "img/dhis-web-capture.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-tracker-capture/index.html",
        },
    },
    {
        key: "user-extended-link",
        title: i18n.t("User Extended"),
        description: i18n.t("List, edit or create users in the GLASS platform"),
        rowLength: 1,
        icon: "img/user-extended.png",
        action: {
            type: "dhisRedirect",
            value: "/api/apps/User-Extended-App/index.html",
        },
    },
];

export const glassRegionalData = _.filter(
    glassAdminData,
    ({ key }) => !["glass-reports-link", "capture-link", "messaging-link", "user-extended-link"].includes(key)
);
