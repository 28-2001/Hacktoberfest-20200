<?php include('server.php') ?>
<!DOCTYPE html>
<html>
<head>
	<title>Registration system PHP and MySQL</title>
	
</head>
<body>

	<div class="header">
		<h2>Login</h2>
	</div>
	
	<form method="post" action="login.php">

		<?php include('errors.php'); ?> 

		<div >
			<label>Username</label>
			<input type="text" name="username" >
		</div>
		<div >
			<label>Password</label>
			<input type="password" name="password">
		</div>
		<div >
			<button type="submit" name="login_user">Login</button>
		</div>
		<p>
			Not yet a member? <a href="register.php">Sign up</a>
		</p>
		<div>
			Forgot Password?<a href="forgotpassword.php">Click Here</a>
		</div>
	</form>


</body>
</html>