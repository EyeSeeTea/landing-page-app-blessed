import i18n from "@eyeseetea/d2-ui-components/locales";

export const amrData = [
    {
        key: "home-page-app-button",
        buttonText: <p>{i18n.t("Go to Home Page App")}</p>,
        action: {
            type: "dhisRedirect",
            value: "/api/apps/Homepage-App/index.html#/",
        },
    },
];
