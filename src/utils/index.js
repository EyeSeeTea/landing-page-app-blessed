import axios from "axios";

const cleanDhis2Url = (baseUrl, path) =>
    [baseUrl.replace(/\/$/, ""), path.replace(/^\//, "")].join("/");

export const goToDhis2Url = (baseUrl, path) => {
    if (baseUrl && path) window.location = cleanDhis2Url(baseUrl, path);
};

export const existsDhis2Url = async (baseUrl, path) => {
    try {
        await axios.get(cleanDhis2Url(baseUrl, path));
        return true;
    } catch (error) {
        if (error.response.status === 404) return false;
        throw error;
    }
};

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const waitForElement = async (document, selector, retry = 0) => {
    const element = document.querySelector(selector);
    if (retry > 50) return false;
    else if (element && element.childNodes.length > 0) return true;
    await sleep(500);
    return waitForElement(document, selector, retry + 1);
};

export const selector = (document, id, action) =>
    document.querySelector(id) ? action(document.querySelector(id)) : null;

export const selectorWait = async (document, id, action) => {
    await waitForElement(document, id);
    selector(document, id, action);
};

export const hideSelector = (document, id) =>
    selectorWait(document, id, element => {
        element.hidden = true;
    });
