<?php  
require "../../../phpController/phpController.php";

if($_SERVER['REQUEST_METHOD']=='POST')
{

	$postdata =  file_get_contents("php://input");
	$dataarray = json_decode($postdata);

	$stock_id = $dataarray->stock_id;

	$deleted = delete("DELETE from stock_info where stock_id=:stock_id",array('stock_id'=>$stock_id));
	
	$deleted2 = delete("DELETE from admin_events where stock_id=:stock_id",array('stock_id'=>$stock_id));
	
	if($deleted){
		echo 1;
	}
}
?>