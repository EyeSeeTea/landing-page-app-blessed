import { LinearProgress, withStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import _ from "lodash";
import { styles } from "../../../domain/models/hepatitis/styles";
import { goToDhis2Url } from "../../../utils/utils";
import LandingPage from "./generic";
import { internationalData, internationalGroupIds } from "../../../domain/models/international/International";

const InternationalLandingPage = props => {
    const { items, userGroupIds } = props;
    const renderPage = useRedirectIfSingleMatch(props);
    const itemsFiltered = React.useMemo(() => getFilteredItems(items, userGroupIds), [items, userGroupIds]);

    return renderPage ? <LandingPage {...props} items={itemsFiltered} /> : <LinearProgress />;
};

const { DATA_MANAGEMENT_USER, EBOLA_USER, EFH_USER, CHOLERA_USER } = internationalGroupIds;

const internationalUserGroupIds = [DATA_MANAGEMENT_USER, EFH_USER, EBOLA_USER, CHOLERA_USER];

const urlsByKey = _(internationalData)
    .map(obj => [obj.key, obj.action?.value])
    .fromPairs()
    .value();

const urlsByUserGroup = {
    [DATA_MANAGEMENT_USER]: urlsByKey["data-monitoring"],
    [EFH_USER]: urlsByKey["efh"],
    [EBOLA_USER]: urlsByKey["ebola"],
    [CHOLERA_USER]: urlsByKey["cholera"],
};

function useRedirectIfSingleMatch(props) {
    const [renderPage, setRenderPage] = React.useState(false);

    useEffect(() => {
        const userGroupIds = _.intersection(props.userGroupIds, internationalUserGroupIds);

        if (userGroupIds.length === 1) {
            const path = urlsByUserGroup[userGroupIds[0]];
            if (path) goToDhis2Url(props.baseUrl, path);
        } else {
            setRenderPage(true);
        }
    }, [props]);

    return renderPage;
}

function getFilteredItems(items, userGroupIds) {
    return items.filter(item => {
        return !item.userGroupIds || _.intersection(item.userGroupIds, userGroupIds).length > 0;
    });
}

export default withStyles(styles)(InternationalLandingPage);
