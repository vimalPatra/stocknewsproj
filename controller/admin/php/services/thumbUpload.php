<?php
require "../../../phpController/phpController.php";

     $target_dir = "../../../../dist/img/thumbs/stocks/";
     $stock_id = $_POST['name'];
     // echo "stock_id = $stock_id";
     // print_r($_FILES);
     $filename = basename($_FILES["file"]["name"]);

     $ext = pathinfo($filename, PATHINFO_EXTENSION);
     $name = "thumb_".$stock_id;
     $nfilename = $name.".".$ext;

     $target_file = $target_dir . $nfilename;

     if(move_uploaded_file($_FILES["file"]["tmp_name"], $target_file))
     {
          $updated=update("UPDATE stock_info set thumb=:thumb where stock_id=:stock_id",array('thumb'=>$nfilename,'stock_id'=>$stock_id));
          if($updated)
          {
               echo 1;
          }
          else{
               $updated;
          }
     }
     else
     {
          echo 0;
     }

     // //write code for saving to database 
     // include_once "config.php";

     // // Create connection
     // $conn = new mysqli($servername, $username, $password, $dbname);
     // // Check connection
     // if ($conn->connect_error) {
     //    die("Connection failed: " . $conn->connect_error);
     // }

     // $sql = "INSERT INTO MyData (name,filename) VALUES ('".$name."','".basename($_FILES["file"]["name"])."')";

     // if ($conn->query($sql) === TRUE) {
     //     echo json_encode($_FILES["file"]); // new file uploaded
     // } else {
     //    echo "Error: " . $sql . "<br>" . $conn->error;
     // }

     // $conn->close();
?>