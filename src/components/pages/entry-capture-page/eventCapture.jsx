import { selectorWait, selector, hideSelector, findElementByText } from "../../../utils";

export const eventCaptureStyling = async iframe => {
    const { contentWindow, contentDocument } = iframe;
    const { document } = contentWindow || contentDocument;

    // Hide unecessary elements
    hideSelector(document, "#header");
    hideSelector(document, "#leftBar");
    hideSelector(document, ".div-bottom-container");
    selectorWait(document, "#headerMessage", e => e.remove());

    // Scale body to be centered
    selector(document, "body", e => {
        e.style.marginTop = "-50px";
        e.style.marginLeft = "-260px";
    });

    // Disable clicks on selection group
    selectorWait(document, ".selectionGroup", e => {
        e.style.pointerEvents = "none";
    });

    // Rename event date
    selectorWait(document, ".bordered-div", () => {
        const eventDateField = findElementByText(document, "Event date");
        if (eventDateField) eventDateField.textContent = "Reporting date *";
    });
};
