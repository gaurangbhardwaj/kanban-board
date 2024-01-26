export function sortByPriorityOrTitle(data, sortByField = "priority") {
    if (sortByField === "priority") {
        return data.slice().sort((a, b) => a.priority - b.priority);
    }
    return data
        .slice()
        .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
}

export function getQueryParams() {
    const queryParams = new URLSearchParams(window.location.search);
    const queryParamsObject = {};
    queryParams.forEach((value, key) => {
        queryParamsObject[key] = value;
    });
    return queryParamsObject;
}
