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

    // validae #formID of index.html
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
            buildTable(0);
        }

    });

    // adding method "isMinLEMax" for validate() to compare the min value with the max value
    jQuery.validator.addMethod("isMinLEMax", function(value, element, param) {
        const max = Number(value);
        const min = Number($(param).val());
        return (min <= max);
    });

    // variables for user input
    let minColNum, maxColNum, minRowNum, maxRowNum;

    /**
     * Function getInputs gets the inputs from the user
     * @param   N/A
     * @return  N/A
     * @throws  N/A
     */
    function getInputs() {
        minColNum = Number(document.getElementById("mincolval").value);
        maxColNum = Number(document.getElementById("maxcolval").value);
        minRowNum = Number(document.getElementById("minrowval").value);
        maxRowNum = Number(document.getElementById("maxrowval").value);
    }   

    /**
     * Function buildTable builds the dynamic table given user inputs
     * @param   opt     option parameter, 0-build dynamic table, 1-build dynamic table for a new tab
     * @return  N/A
     * @throws  N/A
     */
    function buildTable(opt) {
        // variables
        getInputs();
        
        console.log(minColNum,maxColNum,minRowNum,maxRowNum);

        let table_container;
        opt = Number(opt);
        switch (opt) {
            case 0: // table in Form tab
                // container of the table element
                table_container = document.getElementById("Table-container"); 
                break;
            case 1: // table in saved tab
                // create container of the table element
                table_container = document.createElement("div");
                table_container.id = "table-container";
                break;
        }

        table_container.innerHTML = "";
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

        switch (opt) {
            case 0: // table in Form tab
                break;
            case 1: // table in saved tab
                return table_container;
                break;
        }
    }


    /**
     * Function refreshTable calls buildTable only if the form is validated, otherwise clears
     *  the table container
     * @param   N/A
     * @return  N/A
     * @throws  N/A
     */
    function refreshTable() {
        // container of the table element
        let table_container = document.getElementById("Table-container"); 
        if (formValidator.form()) {
            buildTable(0);
        }
        else {
            table_container.innerHTML = "";
        }
    }


    /**
     * Function buildSliders creates the sliders for the form
     * @param   id_string    string    used to access the user input textboxes
     *                                  and slider elements
     * @return  N/A
     * @throws  N/A
     */
    function buildSliders(id_string) {
        const $input = $("#"+id_string);
        const $islider = $("#slider-"+id_string);

        $islider.slider({
            min: -50,
            max: 50,
            value: 0,      
            slide: function(event, ui) {
                // sets the value of the user input box
                // when slider is created, refreshes table
                $input.val(ui.value);
                refreshTable();
            } 
        });

        // sets the value of the user input box
        // the value that slider is currently
        $input.val($islider.slider("value"));

        // when something is in the user inputbox
        $input.on("input", function() {
            // sets the value and position of the slider
            // and refreshes table
            const num = Number($input.val());
            $islider.slider("value", num);
            refreshTable();
        });

    }

    // create the sliders and table
    buildSliders("mincolval");
    buildSliders("maxcolval");
    buildSliders("minrowval");
    buildSliders("maxrowval");
    refreshTable();


    // create tabs
    const $createdTabs = $("#tabs").tabs({
        // make dynamic-table at the bottom of the page appear
        // if form tab, disappear if saved tab
        activate: function(event, ui) {
            let activeIndex = ui.newTab.index();
            if (activeIndex === 0) {
                $("#Table-container").show();
            }
            else {
                $("#Table-container").hide();
            }
        }
    });

    let tabCount = 0;

    // save button clicked -> creates a new tab with saved table
    $("#save-btn").on("click", function() {
        if (!formValidator.form()) { // form validation
            return;
        }
        getInputs();
        // title of the tab
        let tabTitle = "["+minColNum+", "+maxColNum+"], ["
                        +minRowNum+", "+maxRowNum+"]";
        // creating a tab header in the ul
        $("#tabs ul").append('<li><a href="#tab'+tabCount+'"><span>'+tabTitle+
            '</span></a><span class="ui-icon ui-icon-close"></span></li>');
        // create new tab element, add to #tabs
        const newTab = document.createElement("div");
        newTab.id = "tab"+tabCount;
        newTab.class = "saved-table";
        let newTable = buildTable(1);
        // trying to change background of hidden-cell to match white  of tab background
        // console.log("newTable: ", newTable);
        // console.log("hide-Cell: ", $(newTable).children(".hide-Cell"));
        // $(newTable).children(".hide-Cell").css("background-color", "white");
        newTab.append(newTable);
        $createdTabs.append(newTab);
        $createdTabs.tabs("refresh");
        $createdTabs.tabs("option", "active", -1);
        $("#tabs ")
        tabCount = tabCount + 1;
        $("#Table-container").hide();
        console.log("Save button: hide dyn-table");
    });

    // closing a single tab
    $createdTabs.on("click", "span.ui-icon-close", function() {
        // remove tab header
        let tabs = $(this).closest("li").remove().attr("aria-controls");
        // remove tab contents
        $("#" + tabs).remove();
        $createdTabs.tabs("refresh");
    });

    // closing multiple tabs
    // selection
    $("#tabs").on("click", "li", function(e) {
        console.log("e.target: ", e.target)
        // if 'x' icon was clicked
        if ($(e.target).hasClass("ui-icon-close")) {
            console.log("Should not be seeing this...");
            return;
        }
        // if Form tab was selected
        if ($(this).index() === 0) {
            return;
        }
        // if Cntrl or Cmd is pressed, change ui class
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault(); // prevent tab from switching
            $(this).toggleClass("ui-state-highlight");
        } else { // Remove highlight from all tabs if normal click
            $("#tabs ul li").removeClass("ui-state-highlight");
        }
    });
    // closing
    $("#delete-btn").on("click", function() {
        // each tab with ui-state-highlight class removed
        $("#tabs ul li.ui-state-highlight").each(function() {
            // remove tab header
            let tabs = $(this).closest("li").remove().attr("aria-controls");
            // remove tab contents
            $("#" + tabs).remove();
            $createdTabs.tabs("refresh");
        });
    });
    
});