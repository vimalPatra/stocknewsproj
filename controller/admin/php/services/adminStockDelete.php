<?php  
require "../../../phpController/phpController.php";

if($_SERVER['REQUEST_METHOD']=='POST')
{

	$postdata =  file_get_contents("php://input");
	$dataarray = json_decode($postdata);

	$stock_id = $dataarray->stock_id;

	$selected=select("SELECT * FROM stock_info where stock_id=:stock_id",array('stock_id'=>$stock_id));
	if($selected->rowCount())
	{
		$row=$selected->fetch();
		$thumb = $row['thumb'];

		if(!empty($thumb))
		{
			$path = "../../../../dist/img/thumbs/stocks/";
			$file = $path.$thumb;
			unlink($file);
		}
	}


	$deleted = delete("DELETE from stock_info where stock_id=:stock_id",array('stock_id'=>$stock_id));
	
	$deleted2 = delete("DELETE from admin_events where stock_id=:stock_id",array('stock_id'=>$stock_id));
	
	if($deleted)
	{
		echo 1;
	}
}
?>