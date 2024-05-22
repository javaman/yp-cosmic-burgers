import { log, error } from "console";

export function checkResponse(res: Response) {
    return res.json().then(json => {
        if (res.ok && ((json.success === undefined) || json.success)) {
            return json;
        } else {
            return Promise.reject(json);
        }
    });
}