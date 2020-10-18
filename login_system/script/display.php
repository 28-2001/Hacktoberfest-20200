<table style="width:100%">
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>B/S</th>
    <th>Quantity</th>
    <th>Rate</th>
    <th>Amount</th>
    <th>Date</th>
  </tr>

  <?php $server = "localhost";
  $user = "root";
  $pass = "";
  $db = "script_master";

  $con = mysqli_connect($server, $user, $pass, $db) or die("could not connect to database");

  $username = $_SESSION['username'];

  $sql = "SELECT * FROM transaction WHERE username = '$username'";

  $result = mysqli_query($con, $sql);
  //$resultcheck = mysqli_num_rows($result);?>

  <?php if (mysqli_num_rows($result)) : ?>

    <?php while ($row = mysqli_fetch_assoc($result)) :?>

      <tr>

        <td> <?php echo $row['id']; ?></td>
        <td> <?php echo $row['name']; ?></td>
        <td> <?php echo $row['type']; ?></td>
        <td> <?php echo $row['qty'] ;?></td>
        <td> <?php echo $row['rate']; ?></td>
        <td> <?php echo $row['amt'] ;?></td>
        <td> <?php echo $row['date']; ?></td>

      </tr>

    <?php endwhile; ?>

  <?php endif; ?>


</table>
