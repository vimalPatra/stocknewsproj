<?php

/* Getting file name */
$filename = $_FILES['file']['name'];

/* Location */
$location = '../../../../dist/img/thumbs/stocks/';

/* Upload file */
move_uploaded_file($_FILES['file']['tmp_name'],$location.$filename);

echo $filename;
// $arr = array("name"=>$filename);
// echo json_encode($arr);

?>