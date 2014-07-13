<!doctype html>
<html lang="en">
<head>
  <title>Rickshaw Ride Management</title>
  <meta charset="UTF-8">
  <meta name="description" content="Manage and assign ride requests submitted through a Formstack form.">

  <link rel="stylesheet" href="dist/app.min.css">
</head>

<body>
  <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>

  <script type="text/javascript">
    // local fallback if cdn is unavailable
    if (typeof jQuery == 'undefined') {
      document.write(unescape("%3Cscript src='js/libs/jquery.min.js' type='text/javascript'%3E%3C/script%3E"));
    };
  </script>

  <?php

  $key = getenv('GOOGLE_MAPS_BROWSER_KEY');
  echo "<script src='https://maps.googleapis.com/maps/api/js?key=${key}'></script>"

  ?>

  <script src="dist/app.js"></script>

  <script type="text/javascript">
    // app init
    window.App = require('appkit/app').default.create();
  </script>
</body>
</html>
