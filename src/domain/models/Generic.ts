import i18n from "../../locales";

export const defaultData = (
    availableConfigurations: {
        programme: string;
        description: string;
        icon: string;
        userGroupIds: string[];
    }[]
) => [
    {
        key: "title-data",
        title: i18n.t("Available landing pages"),
        rowLength: 1,
    },
    ...availableConfigurations.map(({ programme, description, icon }) => ({
        key: programme,
        title: description,
        icon,
        rowLength: 3,
        action: {
            type: "page",
            value: `/${programme}`,
        },
    })),
    {
        key: "title-utilities",
        title: i18n.t("DHIS2 Utilities"),
        rowLength: 1,
    },
    {
        key: "dhis2",
        title: i18n.t("WIDP"),
        rowLength: 3,
        icon: "img/who-icon.svg",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-dashboard/index.action",
        },
    },
    {
        key: "cache-cleaner",
        title: i18n.t("Browser cache cleaner"),
        description: i18n.t("Enables the users to clear the browser cache"),
        rowLength: 3,
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
        rowLength: 3,
        size: "small",
        icon: "img/dhis-web-profile.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-user-profile/#/profile",
        },
    },
    {
        key: "admin-notifications",
        title: i18n.t("Manage notifications"),
        rowLength: 3,
        size: "small",
        icon: "img/notification.png",
        action: {
            type: "page",
            value: "/notifications",
        },
    },
];
