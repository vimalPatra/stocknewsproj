<?php  
require "../../../phpController/phpController.php";

if($_SERVER['REQUEST_METHOD']=='POST')
{

	$postdata =  file_get_contents("php://input");
	$dataarray = json_decode($postdata);

	$name = $dataarray->name;
	$stock_id = $dataarray->stock_id;
	

	$updated=update("UPDATE stock_info set name=:name where stock_id=:stock_id",array(
		'name'=>$name,
		'stock_id'=>$stock_id
	));

	$updated=update("UPDATE admin_events set name=:name where stock_id=:stock_id",array('name'=>$name,'stock_id'=>$stock_id));

	if($updated)
	{
		echo 1;
	}
}
?>