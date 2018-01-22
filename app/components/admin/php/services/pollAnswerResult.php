<?php 
header('Content-Type: application/json');
 
require "../../../phpController/phpController.php";

$selected = selectAll("SELECT * from poll_answers where status=555");
if($selected->rowCount())
	{	
		$results=$selected->fetchAll(PDO::FETCH_ASSOC);
		$json=json_encode($results);
		echo $json;
	}
?>