import { selectorWait, selector, hideSelector } from "../../utils";

export const eventCaptureStyling = async iframe => {
    const { contentWindow, contentDocument } = iframe;
    const { document } = contentWindow || contentDocument;

    // Hide unecessary elements
    hideSelector(document, "#header");
    hideSelector(document, "#headerMessage");
    hideSelector(document, "#leftBar");

    // Scale body to be centered
    selector(document, "body", e => {
        e.style.marginTop = "-50px";
        e.style.marginLeft = "-260px";
    });

    // Disable clicks on selection group
    selectorWait(document, ".selectionGroup", e => {
        e.style.pointerEvents = "none";
    });
};
