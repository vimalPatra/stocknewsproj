<?php  
require "../../../phpController/phpController.php";

if($_SERVER['REQUEST_METHOD']=='POST')
{

	$postdata =  file_get_contents("php://input");
	$dataarray = json_decode($postdata);

	$event_id = $dataarray->event_id;

	$deleted = delete("DELETE from admin_events where event_id=:event_id",array('event_id'=>$event_id));
	
	if($deleted){
		echo 1;
	}
}
?>