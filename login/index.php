<?php
  session_start();

  if(empty($_SESSION['username'])){
    $_SESSION['msg'] = "You must log in first";
    header("location: login.php");
  }

  if (isset($_GET['logout'])) {

    unset($_SESSION['username']);
    session_destroy();
    //header("location : index.php");
  }
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Home Page</title>
    <style>
      table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
      }
    </style>
  </head>
  <body>

    <!--<h1>This Home Page</h1>-->
    <?php

      if (isset($_SESSION['success'])) : ?>

      <div>
          <h3>
          <?php
          //echo $_SESSION['success'];
          unset($_SESSION['success']);
          ?>
          </h3>
      </div>

    <?php endif ?>

    <?php
      if(isset($_SESSION['username'])) :?>

      <h1>Welcome  <strong><?php echo $_SESSION['fname']; ?> </strong> </h1>

      <br>

      <button type="submit" name="logout"> <a href="index.php?logout=1"> Logout </a> </button>




    <?php else : ?>

      <p> <a href="login.php">Log in</a>  <a href="registration.php">Sign up</a> </p>

    <?php endif ?>


  </body>
</html>
