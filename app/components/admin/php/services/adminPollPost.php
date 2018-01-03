<?php  
require "../../../phpController/phpController.php";

if($_SERVER['REQUEST_METHOD']=='POST')
{

	$postdata =  file_get_contents("php://input");
	$dataarray = json_decode($postdata);

	$question = $dataarray->question;
	$noOfOptions = $dataarray->noOfOptionsSelected;
	
	if(!isset($dataarray->option1) || empty($dataarray->option1) ){
		$option1 = "null";
	}
	else{
	$option1 = $dataarray->option1;		
	}
	
	if(!isset($dataarray->option2) || empty($dataarray->option2) ){
		$option2 = "null";
	}
	else{
	$option2 = $dataarray->option2;		
	}

	if(!isset($dataarray->option3) || empty($dataarray->option3) ){
		$option3 = "null";
	}
	else{
	$option3 = $dataarray->option3;		
	}

	if(!isset($dataarray->option4) || empty($dataarray->option4) ){
		$option4 = "null";
	}
	else{
	$option4 = $dataarray->option4;		
	}

	if(!isset($dataarray->option5) || empty($dataarray->option5) ){
		$option5 = "null";
	}
	else{
	$option5 = $dataarray->option5;		
	}

	if(!isset($dataarray->option6) || empty($dataarray->option6) ){
		$option6 = "null";
	}
	else{
	$option6 = $dataarray->option6;
	}

	if(!isset($dataarray->option7) || empty($dataarray->option7) ){
		$option7 = "null";
	}
	else{
	$option7 = $dataarray->option7;
	}

	if(!isset($dataarray->option8) || empty($dataarray->option8) ){
		$option8 = "null";
	}
	else{
	$option8 = $dataarray->option8;		
	}

	$currentStatus 	= 555;
	$prevStatus 	= 444;
	$emptyStatus	= 0;
	update("UPDATE polls set status=:empty where status=:prev ",array('empty'=>$emptyStatus,'prev'=>$prevStatus));
	update("UPDATE polls set status=:prev where status=:cur ",array('prev'=>$prevStatus,'cur'=>$currentStatus));

	$inserted=insert("INSERT INTO polls(question,no_of_options,option1,option2,option3,option4,option5,option6,option7,option8,status) values(:question,:no_of_options,:option1,:option2,:option3,:option4,:option5,:option6,:option7,:option8,:status)",
		array(
			'question'=>$question,
			'no_of_options'=>$noOfOptions,
			'option1'=>$option1,
			'option2'=>$option2,
			'option3'=>$option3,
			'option4'=>$option4,
			'option5'=>$option5,
			'option6'=>$option6,
			'option7'=>$option7,
			'option8'=>$option8,
			'status'=>$currentStatus
		));


	$nname = "Successfully uploaded poll";
	$ndescription = "$question";
	$ntype = "poll box";
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
}
?>