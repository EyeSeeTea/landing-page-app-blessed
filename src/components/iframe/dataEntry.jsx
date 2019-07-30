import { selectorWait, selector, hideSelector } from "../../utils";

export const dataEntryStyling = async (iframe, { organisationUnit, element, period }) => {
    const { contentWindow, contentDocument } = iframe;
    const { document, selection } = contentWindow || contentDocument;

    // Hide unecessary elements
    hideSelector(document, "#header");
    hideSelector(document, "#moduleHeader");
    hideSelector(document, "#leftBar");
    hideSelector(document, "#currentSelection");

    // Scale body to be centered
    selector(document, "body", e => {
        e.style.marginTop = "-50px";
        e.style.marginLeft = "-260px";
    });

    // Disable clicks on selection group
    selectorWait(document, "#selectionBox", e => {
        e.style.pointerEvents = "none";
    });

    if (organisationUnit && element && period) {
        // Select Organisation Unit
        selection.select(organisationUnit); // Select OU

        // Select DataSet
        await selectorWait(document, `#selectedDataSetId > option[value="${element}"]`, e => {
            e.selected = true;
            contentWindow.dataSetSelected();
        });

        // Select Period
        await selectorWait(document, `#selectedPeriodId [value="${period}"]`, e => {
            e.selected = true;
            contentWindow.periodSelected();
        });
    }
};
