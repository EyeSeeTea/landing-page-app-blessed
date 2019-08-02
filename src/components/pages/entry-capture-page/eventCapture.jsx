import axios from "axios";

import { filterOrgUnits } from "./common";
import { selectorWait, selector, hideSelector, findElementByText, sleep } from "../../../utils";

export const eventCaptureStyling = async (iframe, { baseUrl, element, filter }) => {
    const { contentWindow, contentDocument } = iframe;
    const { document } = contentWindow || contentDocument;

    // Hide unecessary elements
    hideSelector(document, "#header");
    if (filter) hideSelector(document, "#leftBar");
    hideSelector(document, ".div-bottom-container");
    selectorWait(document, "#headerMessage", e => e.remove());

    // Scale body to be centered
    selector(document, "body", e => {
        e.style.marginTop = "-50px";
        if (filter) e.style.marginLeft = "-260px";
    });

    // Scale body to be centered
    selectorWait(document, "#leftBar", e => {
        e.style.marginTop = "-50px";
    });

    // Disable clicks on selection group
    selectorWait(document, ".selectionGroup", e => {
        if (filter) e.style.pointerEvents = "none";
    });

    // Rename event date
    selectorWait(document, ".bordered-div", () => {
        const eventDateField = findElementByText(document, "Event date");
        if (eventDateField) eventDateField.textContent = "Reporting date *";
    });

    const { organisationUnits: visibleOrganisationUnits } = (await axios.get(
        `${baseUrl}/api/programs/${element}.json`,
        {
            params: { fields: "organisationUnits" },
        }
    )).data;

    selectorWait(document, "#orgUnitTree", e => {
        e.addEventListener("click", event => {
            filterOrgUnits(document, visibleOrganisationUnits);
        });
    });

    await sleep(1500);

    filterOrgUnits(document, visibleOrganisationUnits);
};
