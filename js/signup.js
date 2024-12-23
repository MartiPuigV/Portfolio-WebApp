import { _query } from './index.js';

async function exists_username(username) {
  const query = `SELECT * FROM users WHERE username = '${username}'`;
  const result = await _query(query);
  console.log(result);
  return result.length > 0;
}

async function signup(event) {
    event.preventDefault(); // Prevent page from reloading
    const username = document.getElementById('form-username').value;
    const password = document.getElementById('form-password').value;

    if (await exists_username(username)) {
        console.error("Username already exists");
        return false;
    }

    const queryText = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
    const result = await _query(queryText);

    console.log(result);

    if (result === null) {
        console.error("Error signing up");
        return false;
    } else {
        console.log("Signup successful");

        window.location.href = '/pages/login.html'; // Send the user back to the login page

        return true;
    }
}

document.getElementById('login-form').addEventListener('submit', signup);
