import i18n from "@dhis2/d2-i18n";

export const defaultData = [
    {
        key: "title-data",
        title: i18n.t("World Health Organization"),
        rowLength: 1,
    },
    {
        key: "hepatitis",
        title: i18n.t("Hepatitis"),
        rowLength: 3,
        icon: "img/hepatitis.png",
        action: {
            type: "page",
            value: "hepatitis",
        },
    },
    {
        key: "nhwa",
        title: i18n.t("NHWA"),
        rowLength: 3,
        icon: "img/dhis-web-data-approval.png",
        action: {
            type: "page",
            value: "nhwa",
        },
    },
    {
        key: "dhis2",
        title: i18n.t("DHIS2"),
        rowLength: 3,
        icon: "img/dhis2.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-dashboard/index.action",
        },
    },
];
