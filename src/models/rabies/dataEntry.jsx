import axios from "axios";

import { filterOrgUnits } from "../../pages/entry-capture-page/common";
import { selectorWait, selector, hideSelector, sleep } from "../../utils";

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

const selectAttribute = (document, contentWindow, attributeString) => {
    const attributes = attributeString?.split(",") ?? [
        "pvLXvZvAtZV",
        "Os3X3EgDGn0",
        "rZePNSA78l8",
        "FYtmoLvrfbh",
    ];

    selectorWait(document, `#category-MUgypnOT60u > option`, e => {
        e.disabled = e.value !== -1 && !attributes.find(s => s === e.value);
        if (e.value === attributes[0]) {
            e.selected = true;
            contentWindow.dhis2.de.attributeSelected("MUgypnOT60u");
        }
    });
};

const selectTab = (contentWindow, tab) => (contentWindow.location.hash = tab);

export const rabiesStyling = async (
    iframe,
    { organisationUnit, element, period, baseUrl, tab, attributes }
) => {
    const { contentWindow, contentDocument } = iframe;
    const { document, selection } = contentWindow || contentDocument;
    const isAdmin = !organisationUnit;

    // Hide unecessary elements
    hideSelector(document, "#header");
    hideSelector(document, "#moduleHeader");
    hideSelector(document, "#hideLeftBar");
    hideSelector(document, "#currentSelection");
    hideSelector(document, "#validationButton");
    if (!isAdmin) hideSelector(document, "#leftBar");

    // Scale body to be centered
    selector(document, "body", e => {
        e.style.marginTop = "-50px";
        if (!isAdmin) e.style.marginLeft = "-260px";
    });

    // Scale body to be centered
    selector(document, "#leftBar", e => {
        e.style.marginTop = "-50px";
    });

    // Disable clicks on selection group
    selectorWait(document, "#selectionBox", e => {
        if (!isAdmin) e.style.pointerEvents = "none";
    });

    if (!isAdmin && element && period) {
        selection.select(organisationUnit);
        selectDataset(document, contentWindow, element);
        selectPeriod(document, contentWindow, period);
    }

    const { organisationUnits: visibleOrganisationUnits } = (
        await axios.get(`${baseUrl}/api/dataSets/${element}.json`, {
            params: { fields: "organisationUnits" },
            withCredentials: true,
        })
    ).data;

    await selectorWait(document, "#orgUnitTree", e => {
        e.addEventListener("click", event => {
            filterOrgUnits(document, visibleOrganisationUnits);
            selectDataset(document, contentWindow, element);
            selectPeriod(document, contentWindow, period);
            selectAttribute(document, contentWindow, attributes);
        });
    });

    await sleep(1500);

    await filterOrgUnits(document, visibleOrganisationUnits);
    selectDataset(document, contentWindow, element);
    selectPeriod(document, contentWindow, period);
    selectAttribute(document, contentWindow, attributes);
    selectTab(contentWindow, tab);
};
