<?php 

class StockUpdates{
 
private $name;
private $date;
private $description;
private $type;
private $link;

function __construct($name="",$date="",$description="",$type="",$link=""){
$this->name = $name;
$this->date = $date;
$this->description= $description;
$this->type = $type;
$this->link = $link;
}

function getStockUpdates($return_type){

	$dataArr = array();
	$dataArr[]=$this->name;
	$dataArr[]=$this->date;
	$dataArr[]=$this->description;
	$dataArr[]=$this->type;
	$dataArr[]=$this->link;
	
	if($return_type=="array"){
		return $dataArr;
	}
	else if($return_type=="json"){
		return json_encode($dataArr);
	}
	else{ 
		return "** Not a valid type";
	}

}

}

$name = "Rel";
$date = "21/12/2017";
$description = "Reliance shares hiked ! ";
$type = "event";
$link = "https://www.reliance.com";
$ob = new StockUpdates($name, $date, $description, $type, $link);

// $data = $ob->getStockUpdates("array");
// foreach ($data as $key) {
// 	echo $key."<br>";
// }

// $data = $ob->getStockUpdates("json");
// echo $data;

$data = $ob->getStockUpdates("d");
echo $data;

?>
