import axios from "axios";
import i18n from "../../../locales";
import { filterOrgUnits } from "../../../webapp/pages/entry-capture-page/common";
import { goToHashUrl, hideSelector, selector, selectorWait, sleep, textSelector } from "../../../utils";

const recurrentTasks = (document, isAdmin) => {
    selectorWait(document, ".bordered-div", e => {
        e.parentNode.style.width = "100%";
        e.style.marginTop = "15px";
        e.style.marginLeft = "0";
    });

    selectorWait(document, ".selectionArea", e => {
        e.style.width = "100%";
        e.style.margin = "15px";
    });

    hideSelector(document, ".div-bottom-container");

    textSelector(document, "Event capture", field => {
        field.textContent = i18n.t("Report of the policy situation for:");
    });

    textSelector(document, "Event details", field => {
        field.textContent = i18n.t("Details of the report");
    });

    textSelector(document, "Event date", field => {
        field.textContent = i18n.t("Reporting date");
    });

    selectorWait(document, `button[ng-click="updateEvent()"]`, e => {
        e.textContent = i18n.t("Submit or update your report");
        e.addEventListener("click", () => {
            textSelector(
                document,
                "OK",
                field => {
                    field.parentNode.addEventListener("click", () => {
                        window.alert(i18n.t("Thank you for your report on the policy situation"));
                    });
                },
                () => {
                    window.alert(i18n.t("Thank you for your report on the policy situation"));
                }
            );
        });
    });

    selectorWait(document, `button[ng-click="cancel()"]`, e => {
        e.textContent = i18n.t("Go back to home page");
        e.addEventListener("click", () => {
            if (!isAdmin) goToHashUrl("/hepatitis");
        });
    });

    selectorWait(
        document,
        `div[ng-if="selectedProgramStage && selectedProgramStage.programStageSections.length  && eventRegistration || editingEventInFull"]`,
        e => {
            e.hidden = true;
        }
    );

    textSelector(document, "Program", field => {
        field.textContent = i18n.t("Programme");
    });
};

export const policyUptakeStyling = async (iframe, { baseUrl, element, event }) => {
    const { contentWindow, contentDocument } = iframe;
    const { document } = contentWindow || contentDocument;
    const isAdmin = !event;

    // Hide unecessary elements
    hideSelector(document, "#header");
    selectorWait(document, "#headerMessage", e => e.remove());
    if (!isAdmin) hideSelector(document, "#leftBar");

    // Scale body to be centered
    selector(document, "body", e => {
        e.style.marginTop = "-50px";
        if (!isAdmin) e.style.marginLeft = "-260px";
    });

    // Scale body to be centered
    selectorWait(document, "#leftBar", e => {
        e.style.marginTop = "-50px";
    });

    // Disable clicks on selection group
    selectorWait(document, ".selectionGroup", e => {
        if (!isAdmin) e.style.pointerEvents = "none";
    });

    const { organisationUnits: visibleOrganisationUnits } = (
        await axios.get(`${baseUrl}/api/programs/${element}.json`, {
            params: { fields: "organisationUnits" },
            withCredentials: true,
        })
    ).data;

    selectorWait(document, "#orgUnitTree", e => {
        e.addEventListener("click", () => {
            filterOrgUnits(document, visibleOrganisationUnits);
        });
    });

    document.addEventListener("click", () => {
        recurrentTasks(document, isAdmin);
    });

    await sleep(2500);

    filterOrgUnits(document, visibleOrganisationUnits);

    recurrentTasks(document, isAdmin);
};
