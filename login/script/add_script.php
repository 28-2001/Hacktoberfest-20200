<?php include ('server.php') ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Add Script</title>
  </head>
  <body>
    <div class="container">

      <div class="header">

        <h3>Add Script</h3>
      </div>
      <div >

        <form action="add_script.php" method="post">

          <div >
            <input type="radio" name="buy_sell" value="buy">
            <label for="buy">Buy</label>
            <input type="radio" name="buy_sell" value="sell">
            <label for="sell">Sell</label>
          </div>

          <div>
            <label for="name">Name:</label><br>
            <input type="text" name="name" required>
          </div>

          <div>
            <label for="qty">Quantity:</label><br>
            <input type="number" name="qty" required>
          </div>
          <div>

            <label for="rate">Rate:</label><br>
            <input type="number" name="rate" step="any" required>
          </div>
          <div>

            <label for="date">Date:</label><br>
            <input type="date" name="date" required>
          </div>

          <br>
          <button type="submit" name="add_script">ADD</button>
        </form>
      </div>
    </div>
  </body>
</html>






data
name
qty
rate
buy/sell
