<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="stylesheets/home.css">
  <title>HOME | Files Manager</title>
</head>

<body>
  <header class="header">
    <div class="logo">
      <div class="logo-img"></div>
      <div class="logo-text">FILES SHARES</div>
    </div>
    <div class="search">
      <div class="container">
        <div class="search-icon"></div>
        <input type="text">
      </div>
    </div>
  </header>
  <main>
    <div class="left">
      <div class="public access-type">
        <div class="icon"></div>
        Public
      </div>
      <div class="private access-type">
        <div class="icon"></div>
        Private
      </div>
    </div>
    <div class="right">
      <div class="navigation">
        <div class="folder-name">
          Website
        </div>
        <div class="folder-name">
          <div class="arrow"></div>
          Folder 1
        </div>
        <div class="folder-name">
          <div class="arrow"></div>
          Folder 2
        </div>
      </div>
      <!-- HEAD - TITLE FOR THE FILES LIST -->
      <div class="body">
        <div class="head">
          <div class="filename">Name</div>
          <div class="add-date">Date d'ajout</div>
          <div class="actions-btns">Actions</div>
        </div>
        <!-- FILES LIST -->
        <div class="content">
          <?php require('singlefile.php'); ?>
          <?php require('singlefile.php'); ?>
          <?php require('singlefile.php'); ?>
          <?php require('singlefile.php'); ?>
          <?php require('singlefile.php'); ?>
          <?php require('singlefile.php'); ?>
          <?php require('singlefile.php'); ?>
          <?php require('singlefile.php'); ?>

        </div>
      </div>
      <div class="actions">
        <div class="icon new-folder"></div>
        <div class="icon download"></div>
        <div class="icon upload"></div>
        <div class="icon delete"></div>
      </div>
    </div>
  </main>
</body>

</html>