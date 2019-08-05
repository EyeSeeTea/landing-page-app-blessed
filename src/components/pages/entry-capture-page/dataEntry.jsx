import axios from "axios";

import { filterOrgUnits } from "./common";
import { selectorWait, selector, hideSelector, sleep } from "../../../utils";

const selectDataset = (document, contentWindow, dataset) =>
    selectorWait(document, `#selectedDataSetId > option[value="${dataset}"]`, e => {
        e.selected = true;
        contentWindow.dataSetSelected();
    });

const selectPeriod = (document, contentWindow, period) =>
    selectorWait(document, `#selectedPeriodId [value="${period}"]`, e => {
        e.selected = true;
        contentWindow.periodSelected();
    });

export const dataEntryStyling = async (iframe, { organisationUnit, element, period, baseUrl }) => {
    const { contentWindow, contentDocument } = iframe;
    const { document, selection } = contentWindow || contentDocument;

    // Hide unecessary elements
    hideSelector(document, "#header");
    hideSelector(document, "#moduleHeader");
    hideSelector(document, "#hideLeftBar");
    hideSelector(document, "#currentSelection");
    if (organisationUnit) hideSelector(document, "#leftBar");

    // Scale body to be centered
    selector(document, "body", e => {
        e.style.marginTop = "-50px";
        if (organisationUnit) e.style.marginLeft = "-260px";
    });

    // Scale body to be centered
    selector(document, "#leftBar", e => {
        e.style.marginTop = "-50px";
    });

    // Disable clicks on selection group
    selectorWait(document, "#selectionBox", e => {
        if (organisationUnit) e.style.pointerEvents = "none";
    });

    if (organisationUnit && element && period) {
        selection.select(organisationUnit);
        selectDataset(document, contentWindow, element);
        selectPeriod(document, contentWindow, period);
    }

    const { organisationUnits: visibleOrganisationUnits } = (await axios.get(
        `${baseUrl}/api/dataSets/${element}.json`,
        {
            params: { fields: "organisationUnits" },
        }
    )).data;

    await selectorWait(document, "#orgUnitTree", e => {
        e.addEventListener("click", event => {
            filterOrgUnits(document, visibleOrganisationUnits);
            selectDataset(document, contentWindow, element);
            selectPeriod(document, contentWindow, period);
        });
    });

    await sleep(1500);

    await filterOrgUnits(document, visibleOrganisationUnits);
};
