<?php  
require "../../../phpController/phpController.php";


$selected=selectAll("SELECT * from polls where status=555");

$ar = array();
if($selected->rowCount())
	{	

		$row = $selected->fetch();
		$ar['pol_id'] = $row['pol_id'];
		$ar['question'] = $row['question'];
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


		// $results=$selected->fetchAll(PDO::FETCH_ASSOC);

		$json=json_encode($json);
		echo $json;
	}