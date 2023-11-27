<?php require_once('scripts/php/admin/checkSession.php'); ?>
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="stylesheets/common.css">
    <link rel="stylesheet" href="stylesheets/home.css"> <!---->
    <title>HOME | Files Manager</title>
  </head>

  <body>
    <!-- HEADER -->
    <header class="header">
      <div class="logo">
        <div class="logo-img"></div>
        <div class="logo-text">FILES SHARES</div>
      </div>
      <div class="search" title="Search">
        <div class="container">
          <div class="search-icon"></div>
          <input type="text" placeholder="Search a file or a folder here...">
        </div>
      </div>
    </header>

    <!-- CONTENT body -->
    <main>
      <?php 
      // This is for development purpose
      // It delete all the session variables associated to the file
      if (isset($_POST['restartSession'])) {
        session_unset();
        session_destroy();
        header('Location:/test.php');
      } ?>
      <!-- sidebar -->
      <aside class="left">
        <div class="delete-sesssion">
          <form action="" method="post">
            <input type="submit" name="restartSession" value="Restart Session">
          </form>
        </div>
        <div class="title">
          <h3>Access-Type :</h3>
        </div>
        <div class="public access-type" onclick="backToRoot()">
          <div class="icon"></div>
          Public
        </div>
        <div class="private access-type">
          <div class="icon"></div>
          Private
        </div>
      </aside>
      <!-- main content -->
      <div class="right">
        <div class="navigation">
          <!--          <div class="folder-name" id="root" onclick="backToRoot()">
            public /
          </div>
          <div class="folder-name">
            <div class="arrow"></div>
            Folder 1
          </div>
          -->
        </div>
        <!-- HEAD - TITLE FOR THE FILES LIST -->
        <div class="body">
          <div class="head">
            <div class="filename">Name</div>
            <div class="add-date">Date</div>
            <div class="actions-btns">Actions</div>
          </div>

          <!-- FILES LIST -->
          <div class="content">
            <?php require('singlefile.php'); ?>

          </div>
        </div>
        <!-- ACTIONS FOOTER -->
        <footer class="actions">
          <div class="icon new-folder" title="Add New folder"></div>
          <div class="icon download" title="Download Selection"></div>
          <label for="filesInput" class="icon upload" title="Upload new files"></label>
          <div class="icon delete" title="Delete Selection"></div>
        </footer>
      </div>
    </main>
    <!-- RENAME and DELETE MODAL -->
    <div class="modal-container">
      <!-- THE MODAL CONTENT IS FULLY GENERATED VIA JS -->
    </div>
    <!-- FILES Upload MODAL -->
    <div class="modal-upload">
      <form id="uploadForm">
        <input type="file" name="files[]" id="filesInput" multiple style="display:none">
        <h3>Selected files :</h3>
        <div class="selected-files-list">

        </div>
        <div class="btns">
          <button type="button" id="startUpload" onclick="uploadFiles()">Upload</button>
          <div id="cancelUpload" onclick="toggleUploadModal()">Cancel</div>
        </div>
      </form>
    </div>
    <script>

    </script>

    <script src="scripts/js/actualPath.js"></script>
    <script src="scripts/js/Modals.js" defer></script>
    <script src="scripts/js/renderFilesList.js" async></script>
    <script src="scripts/js/openFolder.js" async></script>
    <script src="scripts/js/createFolder.js" defer></script>
    <script src="scripts/js/deleteFolder.js" async></script>
    <script src="scripts/js/uploadFiles.js" async></script>
    <script src="scripts/js/common.js" defer></script>
  </body>

</html>