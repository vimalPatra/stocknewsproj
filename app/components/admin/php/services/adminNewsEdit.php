<?php  
require "../../../phpController/phpController.php";

if($_SERVER['REQUEST_METHOD']=='POST')
{

	$postdata =  file_get_contents("php://input");
	$dataarray = json_decode($postdata);

	$news_id = $dataarray->news_id;
	$title = $dataarray->title;
	$description = $dataarray->description;
	$link = $dataarray->link;
	$link = strtolower($link);
	$date = $dataarray->date;
	$month = $dataarray->month;
	$year = $dataarray->year;
	

	$updated=update("UPDATE news_box set title=:title,description=:description,link=:link,date=:date,month=:month,year=:year where news_id=:news_id",array(
		'title'=>$title,
		'description'=>$description,
		'date'=>$date,
		'month'=>$month,
		'year'=>$year,
		'link'=>$link,
		'news_id'=>$news_id
	));

	if($updated)
	{
		echo 1;
	}

}
?>