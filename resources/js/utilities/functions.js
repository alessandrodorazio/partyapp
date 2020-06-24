import constants from "../constants/constants";
import { APIs } from "../constants/requests";

export const jsonToForm = (body) => {
    let formBody = new FormData();

    if (body != undefined || body != null) {
        for (const key in body) {
            formBody.append(key, body[key]);
        }
    }

    return formBody.entries().done ? 0 : formBody;
};

export const fetchApi = async ({ url, body, method }) => {
    let request = {
        method: method,
        headers: {
            "X-CSRF-TOKEN": localStorage.getItem("CSRF"),
            Authorization: "Bearer " + localStorage.getItem(constants.TOKEN)
        }
    };
    if (body != undefined && Object.keys(body).length > 0 && (method !== "GET" || method != undefined)) {
        request = { ...request, body: jsonToForm(body) };
    }

    let response = await fetch(url, request);

    const status = response.status;

    let refresh;

    let jsonRefresh;

    if (status === 401) {
        refresh = await fetch(APIs.auth.refresh, {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": csrf,
                Authorization: "Bearer " + localStorage.getItem(constants.TOKEN)
            }
        });

        try {
            jsonRefresh = await refresh.json();
        } catch {
            return {
                ok: false,
                status: 401,
                body: {
                    message: "impossibile aggiornare il token"
                }
            };
        }
        localStorage.setItem(constants.TOKEN, jsonRefresh.access_token);
        response = await fetch(url, request);
    }

    let jsonResponse;

    try {
        jsonResponse = await response.json();
    } catch {
        return {
            ok: false,
            status: status
        };
    }
    return {
        ok: true,
        status: status,
        body: jsonResponse
    };
};
