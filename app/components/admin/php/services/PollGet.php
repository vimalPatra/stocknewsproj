<?php  
require "../../../phpController/phpController.php";


$selected=selectAll("SELECT * from polls where status=555");

if($selected1->rowCount())
	{	
		$results=$selected1->fetchAll(PDO::FETCH_ASSOC);
		$json=json_encode($results);
		echo $json;
	}