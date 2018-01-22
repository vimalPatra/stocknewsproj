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
		$answer1 = -1;
	}
	else{
	$option1 = $dataarray->option1;	
	$answer1 = 0;	
	}
	
	if(!isset($dataarray->option2) || empty($dataarray->option2) ){
		$option2 = "null";
		$answer2 = -1;
	}
	else{
	$option2 = $dataarray->option2;	
	$answer2 = 0;	
	}

	if(!isset($dataarray->option3) || empty($dataarray->option3) ){
		$option3 = "null";
		$answer3 = -1;
	}
	else{
	$option3 = $dataarray->option3;		
	$answer3 = 0;
	}

	if(!isset($dataarray->option4) || empty($dataarray->option4) ){
		$option4 = "null";
		$answer4 = -1;
	}
	else{
	$option4 = $dataarray->option4;		
	$answer4 = 0;
	}

	if(!isset($dataarray->option5) || empty($dataarray->option5) ){
		$option5 = "null";
		$answer5 = -1;
	}
	else{
	$option5 = $dataarray->option5;		
	$answer5 = 0;
	}

	if(!isset($dataarray->option6) || empty($dataarray->option6) ){
		$option6 = "null";
		$answer6 = -1;
	}
	else{
	$option6 = $dataarray->option6;
	$answer6 = 0;
	}

	if(!isset($dataarray->option7) || empty($dataarray->option7) ){
		$option7 = "null";
		$answer7 = -1;
	}
	else{
	$option7 = $dataarray->option7;
	$answer7 = 0;
	}

	if(!isset($dataarray->option8) || empty($dataarray->option8) ){
		$option8 = "null";
		$answer8 = -1;
	}
	else{
	$option8 = $dataarray->option8;	
	$answer8 = 0;	
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

	$selected1=selectAll("SELECT * from polls where status=555");

	if($selected1->rowCount())
	{
		$row1 = $selected1->fetch();
		$poll_id = $row1['pol_id'];
		$selected2=select("SELECT * from poll_answers where poll_id=:poll_id",array('poll_id'=>$poll_id));
		if($selected2->rowCount())
		{
			// nothing
		}
		else{

	$currentStatus 	= 555;
	$prevStatus 	= 444;
	$emptyStatus	= 0;

	update("UPDATE poll_answers set status=:empty where status=:prev ",array('empty'=>$emptyStatus,'prev'=>$prevStatus));
	update("UPDATE poll_answers set status=:prev where status=:cur ",array('prev'=>$prevStatus,'cur'=>$currentStatus));

			insert("INSERT INTO poll_answers(poll_id,status,no_of_options,option1,option2,option3,option4,option5,option6,option7,option8) values(:poll_id,:status,:no_of_options,:option1,:option2,:option3,:option4,:option5,:option6,:option7,:option8)",array(
		'poll_id'=>$poll_id,
		'status'=>$currentStatus,
		'no_of_options'=>$noOfOptions,
		'option1'=>$answer1,
		'option2'=>$answer2,
		'option3'=>$answer3,
		'option4'=>$answer4,
		'option5'=>$answer5,
		'option6'=>$answer6,
		'option7'=>$answer7,
		'option8'=>$answer8
			));	
		}
	
	}

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