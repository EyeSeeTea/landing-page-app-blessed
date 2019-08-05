import axios from "axios";

import { filterOrgUnits } from "./common";
import { selectorWait, selector, hideSelector, textSelector, sleep } from "../../../utils";

export const eventCaptureStyling = async (iframe, { baseUrl, element, event }) => {
    const { contentWindow, contentDocument } = iframe;
    const { document } = contentWindow || contentDocument;

    // Hide unecessary elements
    hideSelector(document, "#header");
    hideSelector(document, ".div-bottom-container");
    selectorWait(document, "#headerMessage", e => e.remove());
    if (event) hideSelector(document, "#leftBar");

    // Scale body to be centered
    selector(document, "body", e => {
        e.style.marginTop = "-50px";
        if (event) e.style.marginLeft = "-260px";
    });

    // Scale body to be centered
    selectorWait(document, "#leftBar", e => {
        e.style.marginTop = "-50px";
    });

    // Disable clicks on selection group
    selectorWait(document, ".selectionGroup", e => {
        if (event) e.style.pointerEvents = "none";
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

    document.addEventListener("click", event => {
        // Rename event date
        textSelector(document, "Event date", field => {
            field.textContent = "Reporting date";
        });
    });

    await sleep(1500);

    filterOrgUnits(document, visibleOrganisationUnits);
};
