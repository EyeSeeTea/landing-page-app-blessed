import _ from "lodash";
import axios from "axios";
import { selectorWait, selector, hideSelector, sleep } from "../../../utils";

const filterOrgUnits = async (document, visibleOrganisationUnits) => {
    await selectorWait(document, "#orgUnitTree a", a => {
        const parent = a.parentNode;
        const id = parent.getAttribute("id").replace("orgUnit", "");

        if (!_.find(visibleOrganisationUnits, ["id", id])) {
            a.setAttribute("href", "javascript:;");
        } else a.style.fontWeight = "bold";
    });
};

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

    // Scale body to be centered
    selector(document, "body", e => {
        e.style.marginTop = "-50px";
    });

    // Scale body to be centered
    selector(document, "#leftBar", e => {
        e.style.marginTop = "-50px";
    });

    // Disable clicks on selection group
    selectorWait(document, "#selectionBox", e => {
        e.style.pointerEvents = "none";
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
