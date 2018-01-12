<?php 

require "../../../phpController/phpController.php";

$info = array();

$info['rowspp'] = 5;

$info['pageno'] = 0;

$rowspp = $info['rowspp'];
$pageno = $info['pageno'];

$limit = $rowspp;
$offset = ($rowspp*$pageno)-($rowspp-1);
$offset=$offset-1;

/*
if rows empty, return all 
if rows something but pageno empty, return first n rows 
*/

if(empty($rowspp) || $rowspp==0)
{
	$selected=selectAll("SELECT * from admin_events");

	if($selected->rowCount())
	{	
		$results=$selected->fetchAll(PDO::FETCH_ASSOC);
		$json=json_encode($results);
		// echo $json;
		echo "<pre>";
		// echo $json;
		print_r($results);
		echo "</pre>";
	}
}
else if(empty($pageno) || $pageno==0){
	$selected=selectAll("SELECT * from admin_events limit $rowspp");

	if($selected->rowCount())
	{	
		$results=$selected->fetchAll(PDO::FETCH_ASSOC);
		$json=json_encode($results);
		// echo $json;
		echo "<pre>";
		// echo $json;
		print_r($results);
		echo "</pre>";
	}
}
else{
	$selected = selectAll("SELECT * FROM admin_events LIMIT $limit OFFSET $offset");

	if($selected->rowCount())
	{	
		$results=$selected->fetchAll(PDO::FETCH_ASSOC);
		$json=json_encode($results);
		echo "<pre>";
		// echo $json;
		print_r($results);
		echo "</pre>";
	}
}



?>