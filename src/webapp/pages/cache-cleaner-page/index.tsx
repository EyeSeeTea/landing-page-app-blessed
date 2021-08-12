import React from "react";
import { hideSelector, selector, sleep } from "../../../utils/utils";
import { IFrame } from "../../components/iframe/IFrame";

export const customize = async (iframe: HTMLIFrameElement | null) => {
    if (!iframe) return undefined;
    const { contentWindow, contentDocument } = iframe;
    //@ts-ignore TODO: FIXME Typescript
    const { document } = contentWindow || contentDocument;

    // Hide unecessary elements
    hideSelector(document, "#header");

    // Scale body to be centered
    selector(document, "body", e => {
        e.style.marginTop = "-75px";
    });

    await sleep(1000);
};

export const CacheCleanerPage: React.FC<CacheCleanerPageProps> = ({ header: Header, baseUrl, title }) => {
    return (
        <React.Fragment>
            <Header baseUrl={baseUrl} title={title} />
            <IFrame src={`${baseUrl}/dhis-web-cache-cleaner/index.action`} customize={customize} />
        </React.Fragment>
    );
};

export interface CacheCleanerPageProps {
    header: any;
    baseUrl: string;
    title?: string;
}
