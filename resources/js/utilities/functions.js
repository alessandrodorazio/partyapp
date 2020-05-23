export const jsonToForm = (body) => {
    let formBody = new FormData();

    if (body != undefined || body != null) {
        for (const key in body) {
            console.log(key);
            formBody.append(key, body[key]);
        }
    }

    return formBody.entries().done ? 0 : formBody;
};
