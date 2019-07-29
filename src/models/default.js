import i18n from "@dhis2/d2-i18n";
import { getGridRow } from "../utils";

export const DefaultData = [
    ["title-data", i18n.t("World Health Organization"), null, null, null, getGridRow(1)],
    ["hepatitis", i18n.t("Hepatitis"), null, "img/hepatitis.png", "hepatitis", getGridRow(2)],
    [
        "dhis2",
        i18n.t("DHIS2"),
        null,
        "img/dhis2.png",
        "/dhis-web-dashboard/index.action",
        getGridRow(2),
    ],
];
