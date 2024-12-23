export async function _query(query) {
    try {
        const response = await fetch('http://localhost:3000/api/v1/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "query": query, "API_key": "devtools" })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error making POST request:', error);
        return null;
    }
}

async function is_alive_psql() {
    console.log("Checking if the PostgreSQL server is alive...");

    const queryText = 'SELECT NOW()';

    const result = await _query(queryText);

    if (result === null) {
        console.error("The PostgreSQL server is not alive");
        return false;
    } else {
        console.log("The PostgreSQL server is alive");
        return true;
    }
}

export async function search() {
    const string = document.getElementById("search-bar-input").value;
    console.log(string);
    if (string == '') {
        load_results([]);
        return;
    }
    const queryText = `SELECT username FROM users WHERE username LIKE '%${string}%'`;
    const result = await _query(queryText);

    if (result === null) {
        return false;
    } else {
        load_results(result);
        return true;
    }
}

function load_results(results) {
    const searchResults = document.getElementById("search-results");
    searchResults.innerHTML = "";
    results.forEach(result => {
        const resultDiv = document.createElement("div");
        resultDiv.classList.add("result-wrap");

        const resultText = document.createElement("p");
        resultText.classList.add("result-text");
        resultText.innerText = result.username;

        const img = document.createElement('img');
        img.src = '/resources/user.png';
        img.classList.add('result-logo');
        img.style.userSelect = 'none';
        img.style.position = 'absolute';

        resultDiv.appendChild(resultText);
        resultDiv.appendChild(img);
        searchResults.appendChild(resultDiv);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("search-bar-input").addEventListener("input", search);
});
