<?php  
require "../../../phpController/phpController.php";

if($_SERVER['REQUEST_METHOD']=='POST')
{

	$postdata =  file_get_contents("php://input");
	$dataarray = json_decode($postdata);

	$event_id = $dataarray->event_id;
	$title = $dataarray->title;
	$description = $dataarray->desc;
	$sources=$dataarray->sources;
	$date = $dataarray->date;
	$month = $dataarray->month;
	$year = $dataarray->year;
	$ea = $dataarray->ear;
	$trending=0;
	if(!empty($dataarray->trending))
	{
		$trending = 1;
	}

	$updated=update("UPDATE admin_events set title=:title,description=:description,sources=:sources,date=:date,month=:month,year=:year,ea_type=:ea_type,trending=:trending where event_id=:event_id",array(
		'title'=>$title,
		'description'=>$description,
		'sources'=>$sources,
		'date'=>$date,
		'month'=>$month,
		'year'=>$year,
		'ea_type'=>$ea,
		'trending'=>$trending,
		'event_id'=>$event_id
	));

	if($updated)
	{
		echo 1;
	}
}
?>