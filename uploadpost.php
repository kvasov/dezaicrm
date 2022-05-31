<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
print_r($request->brief);


// $_POST = json_decode(file_get_contents('php://input'), true);
// print_r($_POST);
?>
