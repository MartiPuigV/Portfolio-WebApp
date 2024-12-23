import { _query } from './index.js';
import { set_cookie } from './cookies.js';

function generate_sid() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

async function validate_login(event) {
    event.preventDefault();
    const username = document.getElementById('form-username').value;
    const password = document.getElementById('form-password').value;

    const queryText = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    const result = await _query(queryText);

    console.log(result);

    if (result === null) {
        console.error("Error validating login");
        return false;
    } else {
        if (result.length === 0) {
            console.error("Invalid username or password");
            return false;
        } else {
            console.log("Login successful");
            const sid = generate_sid();
            
            set_cookie('sid', sid, 1);
            await _query(`UPDATE users SET sid = '${sid}' WHERE username = '${username}'`);

            return true;
        }
    }
}

document.getElementById('login-form').addEventListener('submit', validate_login);