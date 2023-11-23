<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="stylesheets/common.css">
    <link rel="stylesheet" href="stylesheets/dashboard.css">
    <title>Dashboard | Admin</title>
  </head>

  <body>
    <form id="logout-form" action="" method="post">
      <input type="submit" value="Logout" id="logout">
    </form>
    <div class="title">
      <h2>MANAGE PRIVATE ACCOUNTS</h2>
    </div>
    <div class="container">
      <div class="head">
        <div class="email">
          Email
        </div>
        <div class="date">
          Register Date
        </div>
        <div class="actions">
          Actions
        </div>
      </div>
      <div class="content">
        <?php require('single-account.php'); ?>
        <?php require('single-account.php'); ?>
        <?php require('single-account.php'); ?>
        <?php require('single-account.php'); ?>
        <?php require('single-account.php'); ?>
        <?php require('single-account.php'); ?>
        <?php require('single-account.php'); ?>
        <?php require('single-account.php'); ?>
        <?php require('single-account.php'); ?>
        <?php require('single-account.php'); ?>
        <?php require('single-account.php'); ?>
        <?php require('single-account.php'); ?>
        <?php require('single-account.php'); ?>
      </div>
    </div>
  </body>

</html>