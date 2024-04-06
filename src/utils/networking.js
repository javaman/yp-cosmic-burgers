export function checkResponse(res) {
    return res.json().then(json => {
        if (res.ok && ((json.success === undefined) || json.success)) {
            return json;
        } else {
            return Promise.reject(json);
        }
    });
}