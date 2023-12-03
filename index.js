// Function to set a cookie
function setCookie(name, value) {
    document.cookie = `${name}=${value}; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/`;
}

// Function to get a cookie value
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return "";
}

// Function to create checkbox elements
function createCheckboxRow(number) {
    const checkboxRow = document.createElement("tr");
    
    for (let i = 0; i < 15; i++) {
        const checkboxCell = document.createElement("td");
        const checkboxIndex = (number - 1) * 15 + i + 1;

        if (checkboxIndex <= parseInt(document.getElementById("num-checkbox").value)) {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = `checkbox-${checkboxIndex}`;
            checkbox.className = "checkbox-item";

            // Load checkbox state from the cookie
            const checkboxState = getCookie(`checkbox-${checkboxIndex}`);
            checkbox.checked = checkboxState === "true";

            const label = document.createElement("label");
            label.htmlFor = `checkbox-${checkboxIndex}`;
            label.innerText = `${checkboxIndex}`;

            checkbox.addEventListener("change", function () {
                // Save checkbox state to the cookie
                setCookie(`checkbox-${checkboxIndex}`, checkbox.checked);
            });

            checkboxCell.appendChild(checkbox);
            checkboxCell.appendChild(label);
        }

        checkboxRow.appendChild(checkboxCell);
    }

    return checkboxRow;
}

// Function to generate checkboxes based on user input
function generateCheckboxes() {
    const numCheckboxes = document.getElementById("num-checkbox").value;
    const checkboxTable = document.getElementById("checkbox-table");
    checkboxTable.innerHTML = ""; // Clear existing checkboxes

    for (let i = 1; i <= numCheckboxes; i++) {
        const row = createCheckboxRow(i);
        checkboxTable.appendChild(row);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    generateCheckboxes(); // Initial generation of checkboxes
});
