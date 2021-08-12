import i18n from "../../../locales";

export const snakebiteData = [
    {
        key: "title-data",
        title: i18n.t("Snakebite data"),
        rowLength: 1,
        enableBottomLine: true,
    },
    {
        key: "sb-data-entry",
        title: i18n.t("Snake bite data entry"),
        description: i18n.t("Enter data on the snakebite data entry"),
        rowLength: 2,
        icon: "img/snakebite-dataentry.svg",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-dataentry/index.action",
        },
    },
    {
        key: "dashboard",
        title: i18n.t("Dashboard"),
        description: i18n.t("Access a dashboard visualizing the data that you entered before"),
        rowLength: 2,
        icon: "img/dhis-web-dashboard.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-dashboard/index.html",
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
            value: "/snakebite/cache-cleaner",
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
