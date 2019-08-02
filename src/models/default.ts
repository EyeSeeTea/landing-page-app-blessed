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
        rowLength: 2,
        icon: "img/hepatitis.png",
        action: {
            type: "page",
            value: "hepatitis",
        },
    },
    {
        key: "dhis2",
        title: i18n.t("DHIS2"),
        rowLength: 2,
        icon: "img/dhis2.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-dashboard/index.action",
        },
    },
];
