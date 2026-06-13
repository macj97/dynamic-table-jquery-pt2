/**
 * File: script.css
 * GUI Assignment: HW4 - Using the jQuery Plugin/UI with Your Dynamic Table
 * Description: JavaScript file for reference for Assignment 4 Part 2
 * Joe Plummer, UMass Lowell Computer Science, joseph_plummer@student.uml.edu
 * Copyright (c) 2026 by Joe Plummer. All rights reserved. May be freely copied or excerpted for educational purposes with credit to the author.
 */


// variables
let minColNum, maxColNum, minRowNum, maxRowNum; // min and max numbers for the columns and rows
let table_container = document.getElementById("Table-container"); // container of the table element

/**
 * Function checks to see if a number is within a certain bounds
 * @param   x    int    converted to an int to compare against bounds
 * @return  bool
 */
function withinBounds(x) {
    x = Number(x);
    if (x < -50 || x > 50) {
        return false;
    }
    else {
        return true;
    }
}

/**
 * Function that checks to see if one num is less than or equal to the other
 * @param   x   int     converted to int, minimum number
 * @param   y   int     converted to int, maximum number
 * @return  bool
 */
function isMinLEMax(x, y) {
    x = Number(x);
    y = Number(y);
    // console.log("x = ", x, ", y = ", y); // debugging
    if (x <= y) {
        // console.log("Returning true..."); // debugging
        return true;
    }
    else {
        // console.log("Returning false..."); // debugging
        return false;
    }
}

/**
 * Function creates an element that shows an error message, also clears the dynamic table
 * @param   elem    element    element before the error element is being placed
 * @param   e       int        0-error message for bounds and non-number input, 
 *                             1-error message for min and max
 * @return  N/A
 */
function createErrorElement(elem, e) {
    const msg = document.createElement("p");
    msg.className = "error";
    switch (e) {
        case 0:
            msg.textContent = "Please enter a number between -50 and 50.";
            break;
        case 1:
            msg.textContent = "Minimum value has to be less than Maximum value.";
            break;
    }
    elem.after(msg);
    table_container.innerHTML = "";
}

/**
 * Function that sets the display property of "error" elements off
 * @param   N/A    
 * @return  N/A
 */
function turnOffErrorMessages() {
    errors = document.getElementsByClassName("error");
    // console.log(errors); // debugging
    if (errors.length >= 1) {
        for (let k = 0; k < errors.length; k++) {
            errors[k].style.display = "none";
        }
    }
}

// Event listener for when Submit button is pressed
document.getElementById("submit-btn").addEventListener('click', function() {

    // getting the values from the form (with error handling)
    minColNum = document.getElementById("mincolval").value;
    // console.log(minColNum); // debugging
    if (!Number.isInteger(Number(minColNum))) { // if not a number
        turnOffErrorMessages();
        createErrorElement(document.getElementById("mincolval"), 0);
        return;
    }
    if (!withinBounds(minColNum)) { // if not within bounds
        // if (!minColNum_e) { 
        //     createErrorElement(document.getElementById("mincolval"), 0);
        //     minColNum_e = true;
        // }
        turnOffErrorMessages();
        createErrorElement(document.getElementById("mincolval"), 0);
        return;
    }

    maxColNum = document.getElementById("maxcolval").value;
    // console.log(maxColNum); // debugging
    if (!Number.isInteger(Number(maxColNum))) { // if not a number
        turnOffErrorMessages();
        createErrorElement(document.getElementById("maxcolval"), 0);
        return;
    }
    if (!withinBounds(maxColNum)) { // if not within bounds
        turnOffErrorMessages();
        createErrorElement(document.getElementById("maxcolval"), 0);
        return;
    }
    if (!isMinLEMax(minColNum, maxColNum)) { // if min is not less than max
        turnOffErrorMessages();
        createErrorElement(document.getElementById("maxcolval"), 1);
        return;
    }

    minRowNum = document.getElementById("minrowval").value;
    // console.log(minRowNum); // debugging
    if (!Number.isInteger(Number(minRowNum))) { // if not a number
        turnOffErrorMessages();
        createErrorElement(document.getElementById("minrowval"), 0);
        return;
    }
    if (!withinBounds(minRowNum)) {
        turnOffErrorMessages();
        createErrorElement(document.getElementById("minrowval"), 0);
        return;
    }

    maxRowNum = document.getElementById("maxrowval").value;
    // console.log(maxRowNum); // debugging
    if (!Number.isInteger(Number(maxRowNum))) { // if not a number
        turnOffErrorMessages();
        createErrorElement(document.getElementById("maxrowval"), 0);
        return;
    }
    if (!withinBounds(maxRowNum)) {
        turnOffErrorMessages();
        createErrorElement(document.getElementById("maxrowval"), 0);
        return;
    }
    if (!isMinLEMax(minRowNum, maxRowNum)) { // if min is not less than max
        turnOffErrorMessages();
        createErrorElement(document.getElementById("maxrowval"), 1);
        return;
    }

    turnOffErrorMessages();
    
    // building the table
    // console.log(table_container);  // debugging
    table_container.innerHTML = ""
    const dTable = document.createElement("table");

    // first row:
    const headerRow = document.createElement("tr");
    const hiddenCell = document.createElement("th");
    hiddenCell.className = "hide-cell";
    headerRow.appendChild(hiddenCell);

    let i = minColNum;
    let j = minRowNum;
    for (i; i <= maxColNum; i++) {
        const headerCell = document.createElement("th");
        headerCell.textContent = i;
        headerCell.className = "header-row";
        headerRow.appendChild(headerCell);
    }
    dTable.appendChild(headerRow);

    // subsequent rows:
    for (j; j <= maxRowNum; j++) {
        const dRow = document.createElement("tr");
        const hCell = document.createElement("th");
        hCell.className = "header-column";
        hCell.textContent = j;
        dRow.appendChild(hCell);
        for (i = minColNum; i <= maxColNum; i++) {
            const dCell = document.createElement("td");
            dCell.textContent = j * i;
            dRow.appendChild(dCell);
        }
        dTable.appendChild(dRow);
    }
    table_container.appendChild(dTable);
});
