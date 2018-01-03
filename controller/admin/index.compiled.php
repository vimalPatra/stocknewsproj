<?php
session_start();
if($_SERVER['REQUEST_METHOD']=='POST')
{
	$email=$_POST['adminemail'];
	$pass=$_POST['adminpass'];
	if($email=='hello' && $pass='world')
	{
		$_SESSION['adminemail']=$email;
		header('Location:panel.php'); // route index....		
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
		<form action="" method="post">
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
