export const jsonToForm = (body) => {
    let formBody = new FormData();

    if (body != undefined || body != null) {
        for (const key in body) {
            formBody.append(key, body[key]);
        }
    }

    return formBody.entries().done ? 0 : formBody;
};

export const fetchApi = async ({ url, csrf, body, method }) => {
    let request = {
        method: method,
        headers: {
            "X-CSRF-TOKEN": csrf
        }
    };
    if (body != undefined && Object.keys(body).length > 0 && (method !== "GET" || method != undefined)) {
        request = { ...request, body: jsonToForm(body) };
    }

    const response = await fetch(url, request);

    //controlla se va refreshato il token e in caso refresha (da implementare)

    return await response.json();
};
