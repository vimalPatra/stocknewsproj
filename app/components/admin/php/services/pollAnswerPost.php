<?php 
header('Content-Type: application/json');
 
require "../../../phpController/phpController.php";

$postdata =  file_get_contents("php://input");
$dataarray = json_decode($postdata);

$poll_id = $dataarray->poll_id;
$answer = $dataarray->answer;

if($answer==1){
	$updateCol = "option1";
}
if($answer==2){
	$updateCol = "option2";
}
if($answer==3){
	$updateCol = "option3";
}
if($answer==4){
	$updateCol = "option4";
}
if($answer==5){
	$updateCol = "option5";
}
if($answer==6){
	$updateCol = "option6";
}
if($answer==7){
	$updateCol = "option7";
}
if($answer==8){
	$updateCol = "option8";
}




$updated = update("UPDATE poll_answers set $updateCol=$updateCol+1 where poll_id=:poll_id",array('poll_id'=>$poll_id));

if($updated)
{
	echo 1;
}
else
{
	echo 0;
}

?>