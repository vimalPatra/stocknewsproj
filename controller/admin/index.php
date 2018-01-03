<?php

session_start();

// if(isset($_SESSION['adminemail'])){
// 		header('Location:../../#/admin/'); // route index....		
// }


if($_SERVER['REQUEST_METHOD']=='POST')
{
	$email=$_POST['adminemail'];
	$pass=$_POST['adminpass'];
	if($email=='hello@gmail.com' && $pass='world')
	{
		$_SESSION['adminemail']=$email;
		header('Location:../../#/admin'); // route index....		
	}
	else
	{	
		echo "Wrong email or password";
	}
}
?>

 <!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Admin LogIn</title>
</head>
<body>
	<form action="" method="POST">
		<table>
			<tr>
				<td>E-mail ID</td>
				<td>
					<input type="text" name="adminemail" id="email">
				</td>
			</tr>
			<tr>
				<td>Password</td>
				<td>
					<input type="password" name="adminpass" id="pass">
				</td>
			</tr>
			<tr>
				<td><input type="submit" value="Submit"></td>
			</tr>
		</table>
	</form>
</body>
</html>