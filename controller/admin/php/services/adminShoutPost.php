<?php 
// header('Content-Type: application/json');
 
require "../../../phpController/phpController.php";

if($_SERVER['REQUEST_METHOD']=='POST')
{

	$postdata =  file_get_contents("php://input");
	$dataarray = json_decode($postdata);

	$title = $dataarray->title;
	$description = $dataarray->description;
	$link = $dataarray->link;
	$link = strtolower($link); // news link lower case
	$date = $dataarray->date;
	$month = $dataarray->month;
	$year = $dataarray->year;

	$currentStatus 	= 555;
	$prevStatus 	= 444;
	$emptyStatus	= 0;
	
	update("UPDATE shout_box set status=:empty where status=:prev ",array('empty'=>$emptyStatus,'prev'=>$prevStatus));
	update("UPDATE shout_box set status=:prev where status=:cur ",array('prev'=>$prevStatus,'cur'=>$currentStatus));

	$inserted = insert("INSERT INTO shout_box(title,description,link,date,month,year,status) values(:title,:description,:link,:date,:month,:year,:status)",
		array(
			'title'=>$title,
			'description'=>$description,
			'link'=>$link,
			'date'=>$date,
			'month'=>$month,
			'year'=>$year,
			'status'=>$currentStatus
		));

	if($inserted)
	{
		echo 1;
	}
}