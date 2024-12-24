import { _query } from "./index.js";
import { filter_input } from "./sql_shield.js";

function get_username_from_url() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const username = urlParams.get('username');

    return username
}

export async function get_id_from_username(username) {
    username = filter_input(username);
    const queryText = `SELECT id FROM users WHERE username = '${username}'`; // @fixme This is vulnerable to SQL injection
    const result = await _query(queryText);
    return result.length == 1 ? result[0].id : undefined
}

async function get_user_info() {
    const username = get_username_from_url();
    if (username) {
        username = filter_input(username);
        const queryText = `SELECT description, image FROM users WHERE username = '${username}'`; // @fixme This is vulnerable to SQL injection
        const result = await _query(queryText);
        return result.length == 1 ? { ...result[0], ...{'username': username}} : undefined
    } else {
        console.error('Username not found in URL');
    }
}

async function display_user_info(user_info) {
    const title = document.getElementById('profile-display');
    title.innerText = user_info.username;
    const desc = document.getElementById('description-display');
    desc.innerText = user_info.description;

    if (user_info.image) {
        const img = document.getElementById('profile-image');
        const id = await get_id_from_username(user_info.username);
        img.src = '/user_images/'+String(id)+'.jpg' || '/user_images/'+String(id)+'.png';
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const result = await get_user_info();
    display_user_info(result);
});
