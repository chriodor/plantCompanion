<?php
//https://flagicons.lipis.dev/
?>
<!DOCTYPE html>
<html lang='hu'>
    <head>
        <meta http-equiv='content-type' content='text/html; charset=utf-8' />
        <meta name='description' content='Plant Companion'>
        <meta name='author' content='Zajkás Máté Gábor'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Plant Companion</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js" integrity="sha512-aVKKRRi/Q/YV+4mjoKBsE4x3H+BkegoM/em46NNlCqNTmUYADjBbeNefNxYV7giUp0VxICtqdrbqU7iVaeZNXA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.13.2/jquery-ui.min.js" integrity="sha512-57oZ/vW8ANMjR/KQ6Be9v/+/h6bq9/l3f0Oc7vn6qMqyhvPd1cvKBRWWpzu0QoneImqr2SkmO4MSqU+RpHom3Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.3/js/bootstrap.bundle.min.js" integrity="sha512-i9cEfJwUwViEPFKdC1enz4ZRGBj8YQo6QByFTF92YXHi7waCqyexvRD75S5NVTsSiTv7rKWqG9Y5eFxmRsOn0A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.3/css/bootstrap.min.css" integrity="sha512-SbiR/eusphKoMVVXysTKG/7VseWii+Y3FdHrt0EpKgpToZeemhqHeZeLWLhJutz/2ut2Vw1uQEj2MbRF+TVBUA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="stylesheet" href="style/style.css" />

    </head>
    <body>

        <script type='text/javascript' src='script/plant_info.js'></script>
        <script type='text/javascript' src='script/plant_relation.js'></script>

        <div class='container-fluid'>
            <div class="input-group">
                <input id="plantListSearch" type="text" class="form-control" placeholder="Search" onkeyup='searchForPlant()'>
                <div class="ps-3">
                    <img src='flags/4x3/hu.svg' style='height:20px;' id="lang_selector_icon_hun" class="lang_selector_icon active" onclick="selectLanguage('hun')" />
                    <img src='flags/4x3/gb.svg' style='height:20px;' id="lang_selector_icon_eng" class="lang_selector_icon" onclick="selectLanguage('eng')" />
                </div>
            </div>
            <div id='plantListHolder'></div>

            <div class="pt-2 pb-2" role="group" id="plantViewWrapper">
                <div class="btn-group btn-group-sm" role="group" id="plantViewHolder" onclick="checkPlantViewHolder()">
                    <input type="radio" class="btn-check" name="plantViewRadio" id="viewRadio_relation" autocomplete="off" checked="">
                    <label class="btn btn-outline-primary" for="viewRadio_relation">Relation view</label>

                    <input type="radio" class="btn-check" name="plantViewRadio" id="viewRadio_grid" autocomplete="off">
                    <label class="btn btn-outline-primary" for="viewRadio_grid">Grid view</label>

                </div>
                <div class="btn-group btn-group-sm ms-3" id="plantViewFunctions">
                    <button type="button" class="btn btn-outline-primary btn-sm" onclick='addPlantToRelationView()'>Add plant +</button>
                </div>
            </div>

            <div id='plantingGrid'>
                <svg class="gridCanvas" id="gridCanvas" height="1px" xmlns="http://www.w3.org/2000/svg"></svg>
            </div>
            <div id='plantingComparison'>
            </div>
        </div>
        <script type='text/javascript' src='script/script.js'></script>
        <script type='text/javascript' src='script/script_grid.js'></script>
    </body>
</html>