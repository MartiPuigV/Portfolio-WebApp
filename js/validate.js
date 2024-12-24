import { get_cookie, erase_cookie } from "./cookies.js";
import { _query } from "./index.js";
import { filter_input } from "./sql_shield.js";

export async function get_username_from_sid(sid) { // @fixme This is vulnerable to SQL injection
    sid = filter_input(sid);
    // This sid could be handcrafted after the page
    // reloaded and checked it, so we need to filter it
    const queryText = `SELECT username FROM users WHERE sid = '${sid}'`;
    const result = await _query(queryText);
    return result.length == 1 ? result[0] : undefined;
}

async function validate_user() {
    if (get_cookie("sid") !== null) {
        const username = await get_username_from_sid(get_cookie("sid"));
        if (username === undefined) {
            // This is the case where there is a fake sid or it expired
            erase_cookie("sid");
        } else {
            // This is the case where the sid is valid (it exists in the DB)
            // Change the icon and display username
            document.getElementById("sidebar-logo").src = "/resources/user.png";
            document.getElementById("username-display").innerText = username.username;
            document.getElementById("login-button").innerText = "Logout";
            document.getElementById("login-button").parentElement.addEventListener("click", function () {
                erase_cookie("sid"); // Erase sid on logout
            });
            document.getElementById("signup-button").parentElement.parentElement.style.visibility = "hidden";
        }
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await validate_user();
});