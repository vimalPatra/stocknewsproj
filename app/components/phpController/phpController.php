<?php

function connect()
{
	$config = array(
	'username' => 'root',
	'password' => '',
	'database' => 'stocknews'
	);

	try{
		$conn = new PDO('mysql:host=localhost;
						dbname='.$config['database'],
						$config['username'],
						$config['password']);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		return $conn;
	}catch(Exception $e){
		return $e;
	}
}

$conn = connect();
if(!$conn){
	die('Could not connect to the Database.');
}

function insert($query,$bindings){
	try{
		global $conn;
	$stmt = $conn->prepare($query);
	return $stmt->execute($bindings);
	}
	catch(Exception $e){
		return $e;
	}
}

function update($query,$bindings){
	try{
		global $conn;
		$stmt=$conn->prepare($query);
		return $stmt->execute($bindings);            //returns bool value
	}
	catch(Exception $e){
		return false;
	}
}

function delete($query,$bindings){
	try{
		global $conn;
		$stmt=$conn->prepare($query);
		return $stmt->execute($bindings);            //returns bool value
	}
	catch(Exception $e){
		return false;
	}
}
function select($query,$bindings){
	try{
		global $conn;
		$stmt = $conn->prepare($query);
		$stmt->execute($bindings);
		return $stmt?$stmt:false;
	}
	catch(Exception $e){
		return $stmt;
	}
}
function selectAll($query){
	try{
		global $conn;
		$stmt = $conn->prepare($query);
		$stmt->execute();
		return $stmt?$stmt:false;
	}
	catch(Exception $e){
		return false;
	}
}
function userExists($email){
	try{
		global $conn;
		$stmt = $conn->prepare("SELECT prid from project_requests where email=:email");
		$stt=$stmt->execute(array('email'=>$email));
		if($stmt->rowCount()){
			return true;
		}
		else{
			return false;
		}
	}catch(Exception $e){
		return false;
	}	
}

function generateRandomString($length = 7) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

function sendMail($to,$subject,$message){
		
		 $header = "From:WebKrushers <mail@webkrushers.com> \r\n";
         $header .= "Cc:mail@webkrushers.com \r\n";
         $header .= "MIME-Version: 1.0\r\n";
         $header .= "Content-type: text/html\r\n";

	mail($to,$subject,$message,$header);
}

    function merge($file,$language){
        $ext = pathinfo($file, PATHINFO_EXTENSION);
        $filename = str_replace(".".$ext, "", $file).$language.".".$ext;
        return ($filename);
    }


?>