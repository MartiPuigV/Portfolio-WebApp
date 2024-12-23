import { get_cookie, set_cookie } from "./cookies.js";
import { _query } from "./index.js";

async function get_username_from_sid(sid) {
    const queryText = `SELECT username FROM users WHERE sid = '${sid}'`;
    console.log(queryText);
    const result = await _query(queryText);
    console.log(result);
    return result.length == 1 ? result[0] : undefined;
}

async function validate_user() {
    if (get_cookie("sid") !== null && !get_cookie("sid").includes("'")) {
        const username = await get_username_from_sid(get_cookie("sid"));
        if (username === undefined) {
            set_cookie("sid", "", 0);
        }
    }
}

validate_user();
