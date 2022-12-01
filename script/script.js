jQuery("#plantViewFunctions").hide();

var selectedView;


function addPlantToRelationView() {
    selectedPlant = jQuery(".plantHolderDiv.active").attr("plant_id");
    activeLang = jQuery(".lang_selector_icon.active").attr("id").split("lang_selector_icon_")[1];

    appendHtml = "";
    if (jQuery("#planting_comparison_" + selectedPlant).html() === undefined) {

        plantName = selectedPlant;

        if (gPlantsArray[selectedPlant]["lang"][activeLang] !== "" && gPlantsArray[selectedPlant]["lang"][activeLang] !== undefined) {
            plantName = gPlantsArray[selectedPlant]["lang"][activeLang];
        }

        plantName = plantName.replaceAll("_", " ");

        appendHtml = "<div id='planting_comparison_" + selectedPlant + "' class='btn btn-sm btn-info me-1'>" + plantName + "</div>";
    }

    if (appendHtml !== "") {
        jQuery("#plantingComparison").append(appendHtml);
    }
}

function checkPlantViewHolder() {
    selectedView = jQuery("#plantViewHolder [name='plantViewRadio']:checked").attr("id").split("viewRadio_")[1];

    if (selectedView === "relation") {
        destroyGrid();
        jQuery("#plantingComparison").show();
    } else {
        drawGrid();
    }
}

function generatePlantingComparison() {
//    jQuery("#plantingComparison").html("");
}