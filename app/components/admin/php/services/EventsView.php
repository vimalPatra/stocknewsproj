<?php 
require "../../../phpController/phpController.php";

if($_SERVER['REQUEST_METHOD']=='GET')
{

	$selected1 = selectAll("SELECT * from admin_events order by timestamp desc");
	// $throwArray = array();
	if($selected1->rowCount())
	{	
		$results=$selected1->fetchAll(PDO::FETCH_ASSOC);
		$json=json_encode($results);
		echo $json;
	}
}
?>