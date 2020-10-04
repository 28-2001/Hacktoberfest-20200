<?php

  session_start();

  if(empty($_SESSION['username'])) {
    array_push($errors, "Please Login first");
    header('location: http://localhost/login/login.php');
  }

  //initialising variables

  $username = $_SESSION['username'];

  $errors = array();

  //connect to db
  $server = "localhost";
  $user = "root";
  $pass = "";
  $db = "script_master";

  $con = mysqli_connect($server, $user, $pass, $db) or die("could not connect to database");

  if (isset($_POST['add_script'])) {
    $buy_sell = mysqli_real_escape_string($con, $_POST['buy_sell']);
    $name = mysqli_real_escape_string($con, $_POST['name']);
    $qty = mysqli_real_escape_string($con, $_POST['qty']);
    $rate = mysqli_real_escape_string($con, $_POST['rate']);
    $date = mysqli_real_escape_string($con, $_POST['date']);

    //validation

    if(empty($buy_sell)) {array_push($errors, "Select buy or sell");}
    if(empty($name)) {array_push($errors, "Name is required");}
    if(empty($qty)) {array_push($errors, "Quantity is required");}
    if(empty($rate)) {array_push($errors, "Rate is required");}
    if(empty($date)) {array_push($errors, "Date is required");}




    $amt = $rate * $qty;

    if(count($errors) == 0){
      $query = "INSERT INTO transaction(username, date, name, type, qty, rate, amt) VALUES ('$username', '$date', '$name', '$buy_sell', '$qty', '$rate', '$amt')";

      mysqli_query($con, $query);
      $_SESSION['username'] = $username;
      $_SESSION['name'] = $name;
      $_SESSION['date'] = $date;
      $_SESSION['rate'] = $rate;
      $_SESSION['amt'] = $amt;
      $_SESSION['type'] = $buy_sell;
      $_SESSION['success'] = "Entry saved";

      if(isset($_SESSION['success'])){
        header('location: http://localhost/login/index.php?entry_saved');
      }
    }

  }

  
