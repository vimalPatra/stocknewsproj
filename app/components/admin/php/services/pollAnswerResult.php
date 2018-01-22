<?php 
header('Content-Type: application/json');
 
require "../../../phpController/phpController.php";

$selected = select("SELECT * from poll_answers where status=555");
$ar = array();
if($selected->rowCount())
	{	
		$row = $selected->fetch();
		$ar['poll_id'] = $row['poll_id'];
		$ar['status'] = $row['status'];
		$ar['no_of_options'] = $row['no_of_options'];
		$ar['options'] = array();
		$ar['options'][] = $row['option1'];
		$ar['options'][] = $row['option2'];
		$ar['options'][] = $row['option3'];
		$ar['options'][] = $row['option4'];
		$ar['options'][] = $row['option5'];
		$ar['options'][] = $row['option6'];
		$ar['options'][] = $row['option7'];
		$ar['options'][] = $row['option8'];
		$ar['timestamp'] = $row['timestamp'];

		$json = array();

		$json[] = $ar;

		$json=json_encode($json);
		echo $json;
	}
	

?>