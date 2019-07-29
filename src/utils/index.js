export const getGridRow = children => 12 / children;

export const goToDhis2Url = (baseUrl, path) => {
    if (baseUrl && path)
        window.location = [baseUrl.replace(/\/$/, ""), path.replace(/^\//, "")].join("/");
};

export const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

const waitForElement = async (document, selector, retry = 0) => {
    const element = document.querySelector(selector);
    if (retry > 50) return false;
    else if (element && element.childNodes.length > 0) return true;
    await timeout(500);
    return waitForElement(document, selector, retry + 1);
};

export const selector = (document, id, cb) =>
    document.querySelector(id) ? cb(document.querySelector(id)) : null;

export const selectorWait = async (document, id, cb) => {
    await waitForElement(document, id);
    selector(document, id, cb);
};
