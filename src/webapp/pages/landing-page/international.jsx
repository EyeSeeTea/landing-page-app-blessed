import { LinearProgress, withStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import _ from "lodash";
import { styles } from "../../../domain/models/hepatitis/styles";
import { goToDhis2Url } from "../../../utils/utils";
import LandingPage from "./generic";
import { DATA_MANAGEMENT_USER, EFH_USER } from "../../../data/logic/redirection";

const InternationalLandingPage = props => {
    const [renderPage, setRenderPage] = React.useState(false);

    useEffect(() => {
        if (_.intersection(props.userGroupIds, [DATA_MANAGEMENT_USER, EFH_USER]).length < 2) {
            if (_.intersection(props.userGroupIds, [DATA_MANAGEMENT_USER]).length > 0) {
                goToDhis2Url(props.baseUrl, "/api/apps/Data-Management-App/index.html");
            } else if (_.intersection(props.userGroupIds, [EFH_USER]).length > 0) {
                goToDhis2Url(props.baseUrl, "/api/apps/Emergency-Field-Hospital-App/index.html");
            } else {
                setRenderPage(true);
            }
        } else {
            setRenderPage(true);
        }
    }, [props]);

    if (!renderPage) return <LinearProgress />;

    return <LandingPage {...props} />;
};

export default withStyles(styles)(InternationalLandingPage);
