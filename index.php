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
        <link rel="stylesheet" href="style/style.css"  />

    </head>
    <body>

        <script type='text/javascript' src='script/plant_info.js'></script>
        <script type='text/javascript' src='script/script.js'></script>

        <div class='container-fluid'>
            <div id='plantListHolder'>
            </div>
        </div>
        <script type='text/javascript'>
            jQuery.each(gPlantsArray, function (a, b) {
                appendHtml = "<div class='plantHolderDiv'>"+b+"</div>";
                jQuery("#plantListHolder").append(appendHtml);
            });
        </script>
    </body>
</html>