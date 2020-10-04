<?php include ('server.php') ?>
<html>
<head>
<title>Sign up</title>
    <link rel="stylesheet" type="text/css" href="style.css">
<body>
    <div class="signupbox">
    <img src="avatar.png" class="avatar">
        <h1>Sign Up Here</h1>
        <div class="errors">
            <?php include ('errors.php') ?>
        </div>
        <form action="registration.php" method="post">
            <p>First Name</p>
            <input type="text" name="fname" placeholder="Enter First name">
            <p>Last Name</p>
            <input type="text" name="lname" placeholder="Enter Last name">
            <p>Username</p>
            <input type="text" name="username" placeholder="Enter Username">
            <p>Email</p>
            <input type="text" name="email" placeholder="Enter Email">
            <p>Password</p>
            <input type="password" name="password_1" placeholder="Enter Password">
            <p>Confirm Password</p>
            <input type="password" name="password_2" placeholder="Confirm Password">
            <input type="submit" name="signup" value="signup">
            <a href="login.php">Already have an account?</a>
        </form>

    </div>

</body>
</head>
</html>
