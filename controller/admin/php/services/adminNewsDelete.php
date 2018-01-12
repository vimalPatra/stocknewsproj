<?php  
require "../../../phpController/phpController.php";

if($_SERVER['REQUEST_METHOD']=='POST')
{

	$postdata =  file_get_contents("php://input");
	$dataarray = json_decode($postdata);

	$news_id = $dataarray->news_id;

	$deleted = delete("DELETE from news_box where news_id=:news_id",array('news_id'=>$news_id));
	
	if($deleted){
		echo 1;
	}
}
?>