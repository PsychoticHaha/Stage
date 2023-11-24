<?php session_start(); ?>
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
      <!-- sidebar -->
      <aside class="left">
        <div class="title">
          <h3>Access-Type :</h3>
        </div>
        <div class="public access-type">
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
          <div class="folder-name">
            Website
          </div>
          <!-- <div class="folder-name">
            <div class="arrow"></div>
            Folder 1
          </div>
          <div class="folder-name">
            <div class="arrow"></div>
            Folder 2
          </div> -->
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
    <script src="scripts/js/renderFilesList.js" async></script>
    <script src="scripts/js/contextmenu.js" async></script>
    <script src="scripts/js/createFolder.js" async></script>
    <script src="scripts/js/uploadFiles.js" async></script>
    <script src="scripts/js/common.js" defer></script>
  </body>

</html>