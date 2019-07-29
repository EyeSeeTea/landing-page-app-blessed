import { selectorWait, selector } from "../../utils";

export const DataEntryStyling = async (iframe, { organisationUnit, element, period }) => {
    const { contentWindow, contentDocument } = iframe;
    const { document, selection } = contentWindow || contentDocument;

    // Hide unecessary elements
    selectorWait(document, "#header", e => (e.hidden = true));
    selectorWait(document, "#moduleHeader", e => (e.hidden = true));
    selectorWait(document, "#leftBar", e => (e.hidden = true));
    selectorWait(document, "#currentSelection", e => (e.hidden = true));

    // Scale body to be centered
    selector(document, "body", e => (e.style.marginTop = "-50px"));
    selector(document, "body", e => (e.style.marginLeft = "-260px"));
    selector(document, "#selectionBox", e => (e.style.pointerEvents = "none"));

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

export const EventCaptureStyling = async (iframe, { organisationUnit }) => {
    const { contentWindow, contentDocument } = iframe;
    const { document } = contentWindow || contentDocument;

    // Hide unecessary elements
    selectorWait(document, "#header", e => (e.hidden = true));
    selectorWait(document, "#headerMessage", e => (e.hidden = true));
    selectorWait(document, "#leftBar", e => (e.hidden = true));
    selectorWait(document, ".selectionGroup", e => (e.style.pointerEvents = "none"));

    // Scale body to be centered
    selector(document, "body", e => (e.style.marginTop = "-50px"));
    selector(document, "body", e => (e.style.marginLeft = "-260px"));
};
