// Ensure users cannot select a future date
const dateInput = document.getElementById("birth-date");
dateInput.max = new Date().toISOString().split("T")[0];

/**
 * Main calculation function
 * Handles year, month, and day subtraction logic
 */
function calculateAge() {
    const birthValue = dateInput.value;
    if (!birthValue) {
        alert("Please select a date first!");
        return;
    }

    const birthDate = new Date(birthValue);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Adjustment if the current day is before the birth day
    if (days < 0) {
        months--;
        days += getDaysInMonth(birthDate.getFullYear(), birthDate.getMonth());
    }

    // Adjustment if the current month is before the birth month
    if (months < 0) {
        years--;
        months += 12;
    }

    updateUI(years, months, days);
}

/**
 * Returns the total days in a given month of a specific year
 */
function getDaysInMonth(year, month) {
    // Setting day to 0 of the next month returns the last day of the current month
    return new Date(year, month + 1, 0).getDate();
}

/**
 * Injects the results into the HTML
 */
function updateUI(y, m, d) {
    const resultElement = document.getElementById("result-text");
    resultElement.innerHTML = `
        You are <span>${y}</span> years, 
        <span>${m}</span> months, and 
        <span>${d}</span> days old.
    `;
}