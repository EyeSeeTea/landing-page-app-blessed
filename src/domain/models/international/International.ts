import i18n from "@dhis2/d2-i18n";

export const internationalData = [
    {
        key: "data-monitoring",
        title: i18n.t("Data Management Tool"),
        rowLength: 2,
        icon: "img/dhis-web-dataentry.png",
        action: {
            type: "dhisRedirect",
            value: "/api/apps/Data-Management-App/index.html",
        },
    },
    {
        key: "efh",
        title: i18n.t("EFH"),
        rowLength: 2,
        icon: "img/dhis-web-capture.png",
        action: {
            type: "dhisRedirect",
            value: "/api/apps/Emergency-Field-Hospital-App/index.html",
        },
    },
    {
        key: "utilities",
        title: i18n.t("DHIS2 Utilities"),
        rowLength: 1,
        enableBottomLine: true,
    },
    {
        key: "cache-cleaner",
        title: i18n.t("Browser cache cleaner"),
        rowLength: 3,
        icon: "img/dhis-web-cache-cleaner.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-cache-cleaner/index.action",
        },
    },
    {
        key: "tracker-capture",
        title: i18n.t("Tracker Capture"),
        rowLength: 3,
        icon: "img/dhis-web-event-capture.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-tracker-capture/index.html",
        },
    },
    {
        key: "profile",
        title: i18n.t("User profile"),
        rowLength: 3,
        icon: "img/dhis-web-profile.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-user-profile/#/profile",
        },
    },
];
