<?php
session_start();

 if(isset($_SESSION['adminemail'])){
        $adminSession = true;
}
?>
<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="manifest" href="site.webmanifest">
        <link rel="apple-touch-icon" href="icon.png">
        <!-- Place favicon.ico in the root directory -->

        <!-- stylesheets -->
        <link href="https://fonts.googleapis.com/css?family=Libre+Barcode+39+Extended+Text|Spinnaker" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Ubuntu:700" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Nunito:800,800i,900" rel="stylesheet">

    
        <!-- new fonts  -->
        <link href="https://fonts.googleapis.com/css?family=Cantarell:400,700,700i|Cardo|Cinzel:400,700|Cormorant+Garamond:400,500,600,700|Economica|Josefin+Sans:400,600,600i,700,700i|Josefin+Slab:400,600,700,700i|Julius+Sans+One|Jura:400,500,600,700|Maven+Pro:400,500|Nunito:300,400,600,600i,700,700i|PT+Sans+Caption:400,700|Rokkitt:300,400,500,600,700|Sorts+Mill+Goudy|Spectral+SC:300,400,500,600,700,700i,800,800i|Vollkorn:400,600,600i,700,700i|Work+Sans:400,500,600,700,800" rel="stylesheet">


        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="dist/css/lib.css">
        <link rel="stylesheet" href="dist/css/main.css">
    </head>
    <body id="body">
        
        <!--[if lte IE 9]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
        <![endif]-->

        <div class="wrap">
            <!-- Add your site or application content here -->
            <div class="app" ng-app='app'>
                <div class="view" data-ui-view></div>
            </div>
        </div>
        <div class="overlay--big">
            
        </div>
        




        <!-- Script tags -->

        <!-- all js frameworks bundled using node's require function that we depend upon  -->
        <script src="dist/js/lib.js"></script>

        <!-- all js source files from different libraries concatenated into one file -->
        <script src="dist/js/vendor.js"></script>

        <!-- app logic -->
        <script src="dist/js/app.js"></script>

        <!-- Google Analytics: change UA-XXXXX-Y to be your site's ID. -->
        <script>
            window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;
            ga('create','UA-XXXXX-Y','auto');ga('send','pageview')
        </script>
        <script src="https://www.google-analytics.com/analytics.js" async defer></script>
    </body>
</html>
