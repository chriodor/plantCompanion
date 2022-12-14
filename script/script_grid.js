var newJson = [];

jQuery(document).ready(function () {

    searchForPlant();

    jQuery.each(gRelationsArray, function (a, b) {
        if ((b["b"] === 1 || b["b"] === -1) && b["p1"] !== b["p2"]) {

            pushArr = {
                "p1": b["p1"],
                "p2": b["p2"],
                "b": b["b"]
            };
            newJson.push(pushArr);
        }
    });

    checkPlantViewHolder();

    // drawGrid();

    addEventListener('mouseup', function () {
        deActivatePress();
    });
});

var activePress = false;

function destroyGrid() {
    jQuery("#plantViewFunctions").hide();
    jQuery("#plantingGrid").hide();
    jQuery("rect").remove("");
}

function drawGrid() {

    jQuery("#plantingGrid").show();
    jQuery("#plantingComparison").hide();

    jQuery("#gridCanvas").attr("height", jQuery(window).height() - jQuery("#plantListHolder").outerHeight() - jQuery("#plantViewWrapper").outerHeight() - jQuery("#plantListSearch").outerHeight() - 10);
    jQuery("#gridCanvas").attr("width", jQuery(window).width() - ((jQuery("#gridCanvas").offset().left + 1) * 2));

    var rect;

    var ny = 1;
    for (var y = 10; y <= jQuery("#gridCanvas").height() - 30; y += 30) {

        var nx = 1;
        for (var x = 10; x <= jQuery("#gridCanvas").width() - 30; x += 30) {
            coord = nx + ":" + ny;

            rect = makeSVG("rect", {x: x, y: y, width: 30, height: 30, stroke: 'black', 'stroke-width': 2, fill: 'transparent', id: "plant_rect_" + coord, onmousedown: "activatePress('" + coord + "');", item_selected: "false", onmouseover: "selectRect('" + coord + "');"});
            document.getElementById('gridCanvas').appendChild(rect);
            nx++;
        }
        ny++;
    }
}

function activatePress(ev) {
    activePress = true;
    selectRect(ev);
}

function deActivatePress(ev) {
    activePress = false;
    calculateTexts();
    calculateGridRelation();
}

function calculateGridRelation() {

    if (jQuery("rect").length > 0) {
        jQuery("rect[has_enemy='1'][item_selected!='false']").attr("fill", "var(--bs-primary)");
        jQuery("rect[has_enemy='1']").removeAttr("has_enemy");

        selectedGridItems = jQuery("rect[item_selected!='false']");

        let getMaxX = jQuery("rect").last().attr("id").split("plant_rect_")[1].split(":")[0];
        let getMaxY = jQuery("rect").last().attr("id").split("plant_rect_")[1].split(":")[1];

        jQuery.each(selectedGridItems, function (a, b) {
            //console.debug(jQuery(b).attr("item_selected"));
            getCoord = jQuery(b).attr("id").replaceAll("plant_rect_", "");

            getCurrentItem = jQuery(b).attr("item_selected");

            coordSplit = getCoord.split(":");
            getCoord_x = parseInt(coordSplit[0]);
            getCoord_y = parseInt(coordSplit[1]);

            if (getCoord_x !== getMaxX) {
                getTarget = jQuery("rect[id='plant_rect_" + (getCoord_x + 1) + ":" + getCoord_y + "']");
                setEnemyGridPlant(getTarget.attr("item_selected"), getCurrentItem, getCoord);

            }

            if (getCoord_x !== 1) {
                getTarget = jQuery("rect[id='plant_rect_" + (getCoord_x - 1) + ":" + getCoord_y + "']");
                setEnemyGridPlant(getTarget.attr("item_selected"), getCurrentItem, getCoord);
            }

            if (getCoord_y !== getMaxY) {
                getTarget = jQuery("rect[id='plant_rect_" + getCoord_x + ":" + (getCoord_y + 1) + "']");
                setEnemyGridPlant(getTarget.attr("item_selected"), getCurrentItem, getCoord);

                if (getCoord_x !== getMaxX) {
                    getTarget = jQuery("rect[id='plant_rect_" + (getCoord_x + 1) + ":" + (getCoord_y + 1) + "']");
                    setEnemyGridPlant(getTarget.attr("item_selected"), getCurrentItem, getCoord);

                }

                if (getCoord_x !== 1) {
                    getTarget = jQuery("rect[id='plant_rect_" + (getCoord_x - 1) + ":" + (getCoord_y + 1) + "']");
                    setEnemyGridPlant(getTarget.attr("item_selected"), getCurrentItem, getCoord);
                }
            }

            if (getCoord_y !== 1) {
                getTarget = jQuery("rect[id='plant_rect_" + getCoord_x + ":" + (getCoord_y - 1) + "']");
                setEnemyGridPlant(getTarget.attr("item_selected"), getCurrentItem, getCoord);

                if (getCoord_x !== getMaxX) {
                    getTarget = jQuery("rect[id='plant_rect_" + (getCoord_x + 1) + ":" + (getCoord_y - 1) + "']");
                    setEnemyGridPlant(getTarget.attr("item_selected"), getCurrentItem, getCoord);

                }

                if (getCoord_x !== 1) {
                    getTarget = jQuery("rect[id='plant_rect_" + (getCoord_x - 1) + ":" + (getCoord_y - 1) + "']");
                    setEnemyGridPlant(getTarget.attr("item_selected"), getCurrentItem, getCoord);
                }
            }

        });
    }
}

function setEnemyGridPlant(plant_1, plant_2, coord) {
    if (plant_1 !== "false") {
        if (plant_1 !== plant_2) {
            if (selectedPlantRelations[plant_2][plant_1] === -1) {
                jQuery("rect[id='plant_rect_" + coord + "']").attr("fill", "var(--bs-danger)");
                jQuery("rect[id='plant_rect_" + coord + "']").attr("has_enemy", "1");
            }
        }
    }
}

function selectRect(ev) {
    if (activePress) {
        if (jQuery("#clearPlantSelect").hasClass("active")) {
            jQuery("rect[id='plant_rect_" + ev + "']").attr("fill", "transparent");
            jQuery("rect[id='plant_rect_" + ev + "']").html("");
            jQuery("rect[id='plant_rect_" + ev + "']").attr("item_selected", "false");
        } else {
            if (jQuery(".plantHolderDiv.active").attr("plant_id") !== undefined) {

                /*   generateTitle = "<title>" + jQuery(".plantHolderDiv.active").html() + "</title>";
                 jQuery("rect[id='plant_rect_" + ev + "']").html(generateTitle);*/

                jQuery("rect[id='plant_rect_" + ev + "']").attr("fill", "var(--bs-primary)");

                jQuery("rect[id='plant_rect_" + ev + "']").attr("item_selected", jQuery(".plantHolderDiv.active").attr("plant_id"));
            }
        }
    }
}

function calculateTexts() {

    jQuery("rect title").remove();

    activeLang = jQuery(".lang_selector_icon.active").attr("id").split("lang_selector_icon_")[1];
    jQuery(".plant_first_letter").remove();

    jQuery.each(jQuery("rect[item_selected!='false']"), function (a, b) {
        //jQuery(b).attr("id").split("plant_rect_")[1].split(":");
        let coord = jQuery(b).attr("id").split("plant_rect_")[1];

        /*newX = parseInt(jQuery(b).attr("x")) + parseInt(jQuery(b).attr("width")) / 2;
         newY = parseInt(jQuery(b).attr("y")) + parseInt(jQuery(b).attr("height")) / 2;*/

        newX = parseInt(jQuery(b).attr("x")) + 5;
        newY = parseInt(jQuery(b).attr("y")) + 20;

        plantName = jQuery(b).attr("item_selected");

        plantLangName = gPlantsArray[jQuery(b).attr("item_selected")]["lang"][activeLang];
        if (plantLangName !== "" && plantLangName !== undefined) {
            plantName = plantLangName;
        }

        generateTitle = "<title>" + plantName + "</title>";
        jQuery("rect[id='" + jQuery(b).attr("id") + "']").prepend(generateTitle);


        mkTxt = makeSVG("text", {x: newX, y: newY, class: 'plant_first_letter', fill: 'white', id: "plant_first_letter_" + coord, onmousedown: "activatePress('" + coord + "');", onmouseover: "selectRect('" + coord + "');"}, plantName.substring(0, 2).toUpperCase());
        document.getElementById('gridCanvas').appendChild(mkTxt);

        jQuery("text[id='plant_first_letter_" + coord + "']").prepend(generateTitle);

    });
}

function clearGrid() {

    jQuery("rect").attr("item_selected", "false");
    jQuery("rect").removeAttr("has_enemy");
    jQuery("rect").attr("fill", "transparent");
    jQuery("rect").html("");
    calculateTexts();
}

function makeSVG(tag, attrs, text = "") {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    if (text !== "") {
        txtnode = document.createTextNode(text);
        el.appendChild(txtnode);
    }
    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
}

var selectedPlantRelations = {};

function selectPlant(plant) {
    jQuery(".plantHolderDiv.active").removeClass("active");
    jQuery(".plantHolderDiv.enemy").removeClass("enemy");
    jQuery(".plantHolderDiv.ally").removeClass("ally");

    if (selectedView === "relation") {
        jQuery("#plantViewFunctions").show();
    }

    if (plant === 0) {
        jQuery("#clearPlantSelect").addClass("active");
    } else {
        jQuery(".plantHolderDiv[plant_id='" + plant + "']").addClass("active");

        getActivePlant = jQuery(".plantHolderDiv.active").attr("plant_id");

        jQuery.each(newJson, function (a, b) {
            if (selectedPlantRelations[b["p1"]] === undefined) {
                selectedPlantRelations[b["p1"]] = {};
            }
            if (selectedPlantRelations[b["p2"]] === undefined) {
                selectedPlantRelations[b["p2"]] = {};
            }
            if (b["p1"] === getActivePlant) {
                if (b["b"] === 1) {
                    jQuery(".plantHolderDiv[plant_id='" + b["p2"] + "']").addClass("ally");
                    selectedPlantRelations[b["p1"]][b["p2"]] = 1;
                } else {
                    jQuery(".plantHolderDiv[plant_id='" + b["p2"] + "']").addClass("enemy");
                    selectedPlantRelations[b["p1"]][b["p2"]] = -1;
                }
            }
            if (b["p2"] === getActivePlant) {
                if (b["b"] === 1) {
                    jQuery(".plantHolderDiv[plant_id='" + b["p1"] + "']").addClass("ally");
                    selectedPlantRelations[b["p2"]][b["p1"]] = 1;
                } else {
                    jQuery(".plantHolderDiv[plant_id='" + b["p1"] + "']").addClass("enemy");
                    selectedPlantRelations[b["p2"]][b["p1"]] = -1;
                }
            }
        });

    }
}

function selectLanguage(lang) {
    jQuery(".lang_selector_icon").removeClass("active");
    jQuery("#lang_selector_icon_" + lang).addClass("active");

    activeLang = jQuery(".lang_selector_icon.active").attr("id").split("lang_selector_icon_")[1];

    searchForPlant();
    calculateTexts();
}

var gPlantSorted;
var oPlantSorted;
function searchForPlant() {
    jQuery("#plantListHolder").html("");

    getS = jQuery("#plantListSearch").val();

    activeLang = jQuery(".lang_selector_icon.active").attr("id").split("lang_selector_icon_")[1];

    // console.debug(gPlantsArray);

    gPlantSorted = {};

    jQuery.each(gPlantsArray, function (a, b) {
        plantName = a;
        langName = b["lang"][activeLang];

        if (langName !== "" && langName !== undefined) {
            plantName = langName;
        }

        plantName = plantName.replaceAll("_", " ");

        canAppend = false;
        if (getS === "") {
            canAppend = true;
        } else {
            //console.debug(plantName.indexOf(getS));

            if (plantName.indexOf(getS) >= 0) {
                canAppend = true;
            }
        }
        if (canAppend) {

            gPlantSorted[plantName] = a;

            /*appendHtml = "<div class='plantHolderDiv p-1 m-1' plant_id='" + a + "' onclick='selectPlant(\"" + a + "\")'>" + plantName + "</div>";
             jQuery("#plantListHolder").append(appendHtml);*/

        }
    });

    oPlantSorted = Object.entries(gPlantSorted);
    jQuery.each(oPlantSorted.sort(sortComparer), function (a, b) {
        appendHtml = "<div class='plantHolderDiv p-1 m-1' plant_id='" + b[1] + "' onclick='selectPlant(\"" + b[1] + "\")'>" + b[0] + "</div>";
        jQuery("#plantListHolder").append(appendHtml);
    });


    appendHtml = "<div id='clearPlantSelect' class='plantHolderDiv p-1 m-1' onclick='selectPlant(0)'>Clear selection</div>";
    jQuery("#plantListHolder").append(appendHtml);

    appendHtml = "<div id='clearGridSelect' class='plantHolderDiv p-1 m-1' onclick='clearGrid()'>Clear grid</div>";
    jQuery("#plantListHolder").append(appendHtml);

    if (!jQuery(".plantHolderDiv").length > 0) {
        jQuery("#plantListHolder").html("<i>No plant found with this name</i>");
    }
}

function sortComparer(a, b) {
    return a[0].localeCompare(b[0]);
}