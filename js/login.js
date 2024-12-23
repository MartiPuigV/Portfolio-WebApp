import { _query } from './index.js';

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
            return true;
        }
    }
}

document.getElementById('login-form').addEventListener('submit', validate_login);
