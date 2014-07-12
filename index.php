<?php

// if the env.php file exists, overwrite the current environment variables
$envFile = __DIR__.'/env.php';

if(file_exists($envFile)) {
  require $envFile;
};

// load application specific auth urls
define('AUTHORIZE_URL', 'https://www.formstack.com/api/v2/oauth2/authorize');
define('TOKEN_URL', 'https://www.formstack.com/api/v2/oauth2/token');

// set name of auth token cookie
$tokenName = 'FORMSTACK_AUTH_TOKEN';

// check cookies for non-expired token
if (isset($_COOKIE[$tokenName])) {

  // load the application
  launchApplication();

} elseif (!empty($_GET['code'])) {

  // if returning from authorization, exchange for token

  $ch = curl_init(TOKEN_URL);

  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
  curl_setopt($ch, CURLOPT_POST, 1); 
  curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array(
    'grant_type' => 'authorization_code',
    'client_id' => getenv('FORMSTACK_CLIENT_ID'),
    'redirect_uri' => getenv('FORMSTACK_REDIRECT_URL'),
    'client_secret' => getenv('FORMSTACK_CLIENT_SECRET'),
    'code' => $_GET['code']
  )));
  
  // request and decode json
  $response = json_decode(curl_exec($ch));

  // set token and expiration to cookie
  // default expiration from formstack looks to be infinite, so 12 hours will be default
  setcookie($tokenName, $response->access_token, time() + 43200, '/');

  // redirect to the main page to clear the query string
  header("Location: /");

} else {

  // if the token doesn't exist, load the formstack authorization page
  $auth_url = AUTHORIZE_URL . '?' . http_build_query(array(
    'client_id' => getenv('FORMSTACK_CLIENT_ID'),
    'redirect_uri' => getenv('FORMSTACK_REDIRECT_URL'),
    'response_type' => 'code'
  ));

  header('Location:' . $auth_url);
  exit;

};

function launchApplication() {
  // load the application html page
  require ('includes/app.php');
};
