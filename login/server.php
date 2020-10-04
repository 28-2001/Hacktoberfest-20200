<?php

  session_start();

  //initialising variables

  $username = "";
  $email = "";

  $errors = array();

  //connect to db
  $server = "localhost";
  $user = "root";
  $pass = "";
  $db = "registration";

  $con = mysqli_connect($server, $user, $pass, $db) or die("could not connect to database");

  //Register User
if(isset($_POST['signup'])){
  $fname = mysqli_real_escape_string($con, $_POST['fname']);
  $lname = mysqli_real_escape_string($con, $_POST['lname']);
  $username = mysqli_real_escape_string($con, $_POST['username']);
  $email = mysqli_real_escape_string($con, $_POST['email']);
  $password_1 = mysqli_real_escape_string($con, $_POST['password_1']);
  $password_2 = mysqli_real_escape_string($con, $_POST['password_2']);

  //form validation


  if(empty($fname)) {array_push($errors, "First Name is required");}
  if(empty($lname)) {array_push($errors, "Last Name is required");}
  if(empty($username)) {array_push($errors, "Username is required");}
  if(empty($email)) {array_push($errors, "Email is required");}
  if(empty($password_1)) {array_push($errors, "Password is required");}
  if($password_1 != $password_2) {array_push($errors, "Password do not match");}

  //Check db for existing Username

  $user_check_query = "SELECT * FROM user WHERE username = '$username' or email = '$email' LIMIT 1";
  $results = mysqli_query($con, $user_check_query);
  //$user = mysqli_fetch_assoc($resluts);

  if($results != null){
    $user = mysqli_fetch_assoc($resluts);
    if($user['username'] == $username) {array_push($errors, "USername already used");}
    if($user['email'] == $email) {array_push($errors, "This email already has a registered username");}

  }

  //register user if no error

  if(count($errors) == 0){
    $password = md5($password_1); //encrypt the password
    $query = "INSERT INTO user(fname, lname, username, email, password) VALUES ('$fname', '$lname', '$username', '$email', '$password') ";

    mysqli_query($con, $query);
    $_SESSION['username'] = $username;
    $_SESSION['fname'] = $fname;
    $_SESSION['success'] = "You are now logged in";

    header('location: index.php');
  }
}

  //Login User

if(isset($_POST['login'])){

  $username = mysqli_real_escape_string($con, $_POST['username']);
  $password = mysqli_real_escape_string($con, $_POST['password_1']);


  if(empty($username)){

    array_push($errors, "Username is requried");
  }
  if(empty($password)){

    array_push($errors, "Password is requried");
  }

  if(count($errors) == 0){

    $password = md5($password);

    $query = "SELECT * FROM user WHERE username='$username' AND password='$password' ";
    $results = mysqli_query($con, $query);

    if(mysqli_num_rows($results)){

      $_SESSION['fname'] = mysqli_fetch_assoc($results)['fname'];
      $_SESSION['username'] = $username;
      $_SESSION['success'] = "Logged in successfully";
      header('location: index.php');
    }else{
      array_push($errors, "Wrong username/password");
    }
  }

}
