import axios from "axios";
import _ from "lodash";
import { goToDhis2Url } from "../utils";

const HEP_CASCADE_CURE_DATA_ENTRY = "OSHcVu6XSUL";
const HEP_POLICY_UPTAKE_DATA_ENTRY = "uMCylDhyzRr";
const NHWA_TEAM = "fxyLXZ10TXC";
const NTD_LSH_LandingPage_KEN = "aQt4ynXtBOS";

const USER_GROUPS_HEPATITIS = [HEP_CASCADE_CURE_DATA_ENTRY, HEP_POLICY_UPTAKE_DATA_ENTRY];
const USER_GROUPS_NHWA = [NHWA_TEAM];
const USER_GROUPS_NTD = [NTD_LSH_LandingPage_KEN];

const shouldRedirect = (a1: string[], a2: string[]): boolean => _.intersection(a1, a2).length > 0;

export const handleRedirection = async (baseUrl: string) => {
    const url = `${baseUrl}/api/me.json?fields=userGroups[id]`;
    const { userGroups } = (await axios.get(url, {
        withCredentials: true,
    })).data;

    const userGroupIds = userGroups.map((group: { id: string }) => group.id);

    if (shouldRedirect(userGroupIds, USER_GROUPS_HEPATITIS)) {
        window.location.hash = "/hepatitis";
        return {
            title: "The Global Hepatitis Programme",
            backUrl: "/hepatitis",
        };
    } else if (shouldRedirect(userGroupIds, [...USER_GROUPS_NTD, ...USER_GROUPS_NHWA])) {
        goToDhis2Url(baseUrl, "/api/apps/Landing-Page/index.html");
    } else if (process.env.NODE_ENV !== "production") {
        return;
    } else {
        goToDhis2Url(baseUrl, "/dhis-web-dashboard/index.action");
    }
};
