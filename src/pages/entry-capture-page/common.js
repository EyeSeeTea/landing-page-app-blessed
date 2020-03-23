import _ from "lodash";

import { selectorWait } from "../../utils";

export const filterOrgUnits = async (document, visibleOrganisationUnits) => {
    await selectorWait(document, "#orgUnitTree a", a => {
        const parent = a.parentNode;
        const id = parent.getAttribute("id").replace("orgUnit", "");

        if (!_.find(visibleOrganisationUnits, ["id", id])) {
            a.setAttribute("href", "javascript:;");
        } else a.style.fontWeight = "bold";
    });
};
