<?php include ('server.php') ?>
<!-- <?php include ('errors.php') ?> -->
<html>
<head>
<title>login</title>
    <link rel="stylesheet" type="text/css" href="style.css">
<body>
    <div class="loginbox">
    <img src="avatar.png" class="avatar">
        <h1>Login Here</h1>
        <div class="errors">
            <?php include ('errors.php') ?>
        </div>
        <form action="login.php" method="post">
            <p>Username</p>
            <input type="text" name="username" placeholder="Enter Username">
            <p>Password</p>
            <input type="password" name="password_1" placeholder="Enter Password">
            <input type="submit" name="login" value="Login">
            <a href="registration.php">Don't have an account?</a>
        </form>

    </div>

</body>
</head>
</html>
