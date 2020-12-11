import i18n from "@dhis2/d2-i18n";

export const ntdLeishKenyaData = [
    {
        key: "title-data",
        title: i18n.t("Enter data"),
        rowLength: 1,
        enableBottomLine: true,
    },
    {
        key: "data-entry",
        title: i18n.t("Stock management"),
        description: i18n.t(
            "Data Entry module enables health facilities to enter their monthly stock status"
        ),
        rowLength: 2,
        icon: "../../../icons/dhis-web-dataentry.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-dataentry/index.action",
        },
    },
    {
        key: "event-entry",
        title: i18n.t("Case Management & Lab LOG"),
        description: i18n.t(
            "Case Management & Lab LOG enables health facilities to enter individual cases"
        ),
        rowLength: 2,
        icon: "../../../icons/dhis-web-capture.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-capture/index.action"
        },
    },
    {
        key: "title-visualize",
        title: i18n.t("Visualize Data"),
        rowLength: 1,
        enableBottomLine: true,
    },
    {
        key: "dashboard",
        title: i18n.t("Dashboard"),
        description: i18n.t("Access a dashboard visualizing the data that you entered before"),
        rowLength: 2,
        icon: "img/dhis-web-dashboard.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-dashboard/index.action",
        },
    },
    {
        key: "maps",
        title: i18n.t("Maps"),
        description: i18n.t("Enables users to visualize data in Geographical location system"),
        rowLength: 2,
        icon: "../../../icons/dhis-web-maps.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-maps/index.action",
        },
    },
    {
        key: "pivot-table",
        title: i18n.t("Pivot Table"),
        description: i18n.t(
            "Enables users to create pivot tables, using available aggregated data"
        ),
        rowLength: 2,
        icon: "../../../icons/dhis-web-pivot.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-pivot/index.action",
        },
    },
    {
        key: "data-visualizer",
        title: i18n.t("Data Visualizer"),
        description: i18n.t(
            "Enables users to easily create dynamic aggregated data analysis and visualizations through charts and data tables"
        ),
        rowLength: 2,
        icon: "../../../icons/dhis-web-data-visualizer.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-data-visualizer/index.action"
        }
    },
    {
        key: "event-reports",
        title: i18n.t("Event Reports"),
        description: i18n.t(
            "Enables users to create pivot tables, using available individual data"
        ),
        rowLength: 2,
        icon: "../../../icons/dhis-web-event-reports.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-event-reports/index.action",
        },
    },
    {
        key: "event-visualizer",
        title: i18n.t("Event Visualizer"),
        description: i18n.t(
            "Enables users to easily create dynamic individual data analysis and visualizations through charts and data tables"
        ),
        rowLength: 2,
        icon: "../../../icons/dhis-web-event-visualizer.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-event-visualizer/index.action"
        },
    },
    {
        key: "title-other",
        title: i18n.t("Other Useful Features"),
        rowLength: 1,
        enableBottomLine: true,
    },
    {
        key: "cache-cleaner",
        title: i18n.t("Browser cache cleaner"),
        description: i18n.t("Enables the users to clear the browser cache"),
        rowLength: 2,
        icon: "../../../icons/dhis-web-cache-cleaner.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-cache-cleaner/index.action"
        },
    },
    {
        key: "profile",
        title: i18n.t("User profile"),
        description: i18n.t("Allows the users to edit account credentials and public profile"),
        rowLength: 2,
        icon: "img/dhis-web-profile.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-user-profile/#/profile",
        },
    },
];
