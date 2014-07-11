<?php

  // if the env.php file exists, overwrite the current environment
  $envFile = __DIR__.'/env.php';

  if(file_exists($envFile)) {
    require $envFile;
  };

  // check for non-expired token
  
  // if the token exists, load application
  
  // if the token doesn't exist, load the login page

?>
