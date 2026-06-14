/**
 * File: script_jquery.css
 * GUI Assignment: HW4 - Using the jQuery Plugin/UI with Your Dynamic Table
 * Description: JavaScript file with jQuery for Assignment 4 Part 2
 * Joe Plummer, UMass Lowell Computer Science, joseph_plummer@student.uml.edu
 * Copyright (c) 2026 by Joe Plummer. All rights reserved. May be freely copied or excerpted for educational purposes with credit to the author.
 */

/**
 * still need to have table be created dynamically when user has inputed create fields
 * or when one of the sliders is manipulated
 */

// start of JQuery 
$(document).ready(function() {
    
    // adding method "isMinLEMax" to compare the min value with the max value
    jQuery.validator.addMethod("isMinLEMax", function(value, element, param) {
        const max = Number(value);
        // console.log("Max is: ",max); // debugging
        const min = Number($(param).val());
        // console.log("Min is: ",min); // debugging
        return (min <= max);
    });
    
    // validating #formID of index.html
    const formValidator = 
    $("#formID").validate({
        rules: {
            mincolval: {
                required: true,
                integer: true,
                range: [-50,50]
            },
            maxcolval: {
                required: true,
                integer: true,
                range: [-50,50],
                isMinLEMax: "#mincolval"
            },
            minrowval: {
                required: true,
                integer: true,
                range: [-50,50]
            },
            maxrowval: {
                required: true,
                integer: true,
                range: [-50,50],
                isMinLEMax: "#minrowval"
            },
        },
        messages: {
            mincolval: {
                required: "This field is required.",
                integer: "Please enter an integer between -50 and 50 (no decimals).", 
                range: "Please enter an integer number between -50 and 50."
            },
            maxcolval: {
                required: "This field is required.",
                integer: "Please enter an integer between -50 and 50 (no decimals).", 
                range: "Please enter an integer number between -50 and 50.",
                isMinLEMax: "Minimum value must be less than or equal to maximum value."
            },
            minrowval: {
                required: "This field is required.",
                integer: "Please enter an integer between -50 and 50 (no decimals).",
                range: "Please enter an integer number between -50 and 50."
            },
            maxrowval: {
                required: "This field is required.",
                integer: "Please enter an integer between -50 and 50 (no decimals).", 
                range: "Please enter an integer number between -50 and 50.",
                isMinLEMax: "Minimum value must be less than or equal to maximum value."
            }
        },
        submitHandler: function(form) {
            // console.log("inside submitHandler..."); // debugging
            buildTable();
        }

    });

    /**
     * Function buildTable() builds the dynamic table given user inputs
     * @param   N/A
     * @return  N/A
     * @throws  N/A
     */
    function buildTable() {
        // building the table

        console.log("building table...");  // debugging

        // variables
        minColNum = document.getElementById("mincolval").value;
        maxColNum = document.getElementById("maxcolval").value;
        minRowNum = document.getElementById("minrowval").value;
        maxRowNum = document.getElementById("maxrowval").value;
        let table_container = document.getElementById("Table-container"); // container of the table element
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
    }

    function refreshTable() {
        if (formValidator.form()) {
            buildTable();
        }
    }



    function buildSliders(id_string) {
        const $input = $("#"+id_string);
        const $islider = $("#slider-"+id_string);

        $islider.slider({
            min: -50,
            max: 50,
            value: 0,      
            slide: function(event, ui) {
                $input.val(ui.value);
                refreshTable();
            } 
        });

        $input.val($islider.slider("value"));

        $input.on("input", function() {
            const num = Number($input.val());
            $islider.slider("value", num);
            refreshTable();
        });

    }

    buildSliders("mincolval");
    buildSliders("maxcolval");
    buildSliders("minrowval");
    buildSliders("maxrowval");
    refreshTable();


    
    
});