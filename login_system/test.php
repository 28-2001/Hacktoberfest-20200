<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

    <?php
    if (isset($_GET['logout'])) {
      // code...
      echo "Direct";
    }

    ?>
    <button type="submit" name="logout"> <a href="test.php?logout=1"> Logout </a> </button>
  </body>
</html>
