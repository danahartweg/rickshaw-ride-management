<!doctype html>
<html lang="en">
<head>
  <title>Rickshaw Ride Management</title>
  <meta charset="UTF-8">
  <meta name="description" content="Manage and assign ride requests submitted through a Formstack form.">

  <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">

  <link rel="stylesheet" href="dist/normalize.min.css">
  <link rel="stylesheet" href="dist/app.min.css">

  <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/modernizr/2.7.1/modernizr.min.js"></script>

  <!-- local fallback for modernizer if cdn doesn't load -->
  <script type="text/javascript">
    if (typeof Modernizr == 'undefined') {
      document.write(unescape("%3Cscript src='js/libs/modernizr.js' type='text/javascript'%3E%3C/script%3E"));
    };
  </script>
</head>

<body>
  <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
  <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/fastclick/1.0.0/fastclick.min.js"></script>
  <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/foundation/5.2.2/js/foundation.min.js"></script>

  <!-- local fallback for jquery, fastclick, and foundation if cdn doesn't load  -->
  <script type="text/javascript">
    if (typeof jQuery == 'undefined') {
      document.write(unescape("%3Cscript src='js/libs/jquery.min.js' type='text/javascript'%3E%3C/script%3E"));
    };

    if (typeof FastClick == 'undefined') {
      document.write(unescape("%3Cscript src='js/libs/fastclick.js' type='text/javascript'%3E%3C/script%3E"));
    };

    if (typeof Foundation == 'undefined') {
      document.write(unescape("%3Cscript src='js/libs/foundation.min.js' type='text/javascript'%3E%3C/script%3E"));
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
