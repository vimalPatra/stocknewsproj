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
	$verified = 1;

	$inserted = insert("INSERT INTO news_box (title,description,link,date,month,year,verified) values(:title,:description,:link,:date,:month,:year,:verified)",array(
		'title'=>$title,
		'description'=>$description,
		'link'=>$link,
		'date'=>$date,
		'month'=>$month,
		'year'=>$year,
		'verified'=>$verified
	));

	$nname = "Successfully uploaded news";
	$ndescription = "$title";
	$ntype = "news box";
	$nlinked = 0;
	$nlink = "null";

	if($inserted)
	{	
		//notifications
		insert("INSERT INTO notifications (name,description,type,linked,link) values(:name,:description,:type,:linked,:link)",
			array('name'=>$nname,
		'description'=>$ndescription,
		'type'=>$ntype,
		'linked'=>$nlinked,
		'link'=>$nlink));

		echo 1;
	}
	else
	{
		echo 0;
	}
}
?>