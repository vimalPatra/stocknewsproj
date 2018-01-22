<?php 

require "../../../phpController/phpController.php";

$postdata =  file_get_contents("php://input");
$dataarray = json_decode($postdata);

$rowspp = $dataarray->rowspp;


$selected=selectAll("SELECT * FROM news_box");

$rowCount = $selected->rowCount();

if($rowCount%$rowspp==0)
{
$pageCount = floor($rowCount/$rowspp);
}
else
{
$pageCount = floor($rowCount/$rowspp)+1;
}

echo $pageCount;
?>