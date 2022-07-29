import _ from "lodash";
import i18n from "../../../locales";

const MalariaRepoDescription = () => {
    return (
        <>
            <p>{i18n.t("Malaria endemic countries in the region are invited to upload a subset of their malaria related data (by district and month) into this DHIS2 instance.")}</p>
            <p>{i18n.t("Some countries are already implementing DHIS2 for their routine HMIS and have already adopted the malaria modules. These countries can ready link the two systems. Others are using other HMIS systems and will need to use the Bulk Load app to load the data.")}</p>
            <p style={{ textAlign: "left" }}>{i18n.t("This repository will be useful for the following:")}</p>
            <ul style={{ textAlign: "left" }}>
                <li>
                    {i18n.t("Conducting surveillance workshops")}
                    <ul>
                        <li>{i18n.t("This will permit exercises based on real country data")}</li>
                        <li>{i18n.t("Peer Reviews")}</li>
                    </ul>
                </li>
                <li>{i18n.t("Data reviews")}</li>
                <li>{i18n.t("Conducting surveillance workshops")}</li>
                <li>
                    {i18n.t("Annual sub-national data submission")}
                    <ul>
                        <li>{i18n.t("We could pre-generate the WMR sub-national data form with data aggregated annually at the district level")}</li>
                        <li>{i18n.t("You would then download the pre-filled form and complete the missing variables")}</li>
                    </ul>
                </li>
                <li>
                    {i18n.t("World Malaria Report submission")}
                    <ul>
                        <li>{i18n.t("Pre-fill a subset of national WMR variables")}</li>
                    </ul>
                </li>
                <li>{i18n.t("Surveillance support and data validation throughout the yearn")}</li>
                <li>{i18n.t("Validation checks against sub-national totals")}</li>
            </ul>
        </>
    )
}

const DataQualityDashboardDescription = () => {
    return (
        <>
            <p>{i18n.t("The WHO Malaria Data Quality (DQ) dashboard is an addendum to the Burden Reduction aggregate package.")}</p>
            <p>{i18n.t("The malaria Data Quality dashboard includes:")}</p>
            <ol>
                <li>{i18n.t("Indicators: data quality indicators and other relevant indicators borrowed from malaria burden reduction package.")}</li>
                <li>{i18n.t("Visualizations/analytic items: charts and pivot tables to visualize indicator performance")}</li>
                <li>{i18n.t("Dashboard: designed to present the visuals/analytic items (charts and tables) in a logical way to users")}</li>
            </ol>
        </>
    )
}

export const MalariaData = [
    {
        key: "title-data",
        title: i18n.t("Welcome to the Eastern Mediterranean regional malaria repository"),
        description: <MalariaRepoDescription />,
        rowLength: 1,
        enableBottomLine: true,
    },
    {
        key: "br-dashboard",
        title: i18n.t("Burden Reduction Dashboard"),
        description: i18n.t("The malaria modules are the foundation of our work with countries, used to help them strengthen their Health Information system with a standardized and harmonized set of meta-data. The Burden Reduction aggregate package includes: data elements, indicators, forms and dashboards (dashboards contain charts, tables, maps), all based on our guidance documents and consultation with partners. The modules are accompanied with guidance documents and tutorials"),
        rowLength: 3,
        icon: "img/burden-reduction.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-dashboard/index.html#/kZuhWRElcwL",
        },
    },
    {
        key: "data-quality-dashboard",
        title: i18n.t("Data Quality Dashboard"),
        description: <DataQualityDashboardDescription />,
        rowLength: 3,
        icon: "img/dq-dashboard.png",
        action: {
            type: "page",
            value: "/",
        },
    },
    {
        key: "who-data-quality-app",
        title: i18n.t("WHO Data Quality App"),
        rowLength: 3,
        icon: "img/dq-app.png",
        action: {
            type: "page",
            value: "/api/apps/WHO-Data-Quality-Tool/index.html#/dashboard",
        },
    },
    {
        key: "bulk-load",
        title: i18n.t("Bulk Load"),
        description: i18n.t("The Bulk Load is an application designed to ease the import of data using Microsoft Excel. It generates templates (an Excel sheet) from datasets and programs, and imports data directly from those templates."),
        rowLength: 2,
        icon: "img/bl.png",
        action: {
            type: "page",
            value: "/api/apps/Bulk-Load/index.html",
        },
    },
    {
        key: "mal-tracker",
        title: i18n.t("Malaria Case Surveillance Tracker"),
        description: i18n.t("As countries progress towards malaria elimination, the aim of surveillance is to detect all malaria cases; investigate every confirmed malaria case; identify the likely location of an infection in order to direct actions to interrupt transmission and to ensure that each detected case is promptly treated and monitored to prevent secondary infection. An ideal surveillance information system for malaria elimination includes rapid and complete case reporting, central data storage and management, automated data analysis, and customized outputs and feedback that lead to timely and targeted responses. The DHIS2 tracker package for malaria case surveillance and foci investigation is an aid for malaria surveillance in burden reduction and elimination settings."),
        rowLength: 2,
        icon: "img/mal-tracker.png",
        action: {
            type: "dhisRedirect",
            value: "/dhis-web-tracker-capture",
        },
    },
];
