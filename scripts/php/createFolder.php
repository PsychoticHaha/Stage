<?php
if (isset($_POST['folderName'])) {
  $folderName = $_POST['folderName'];
  $folder = '../../files/public/' . $folderName;
  if (!is_dir($folder)) {
    mkdir($folder, 0777);
    header('Content-Type: application/json');
    echo json_encode('Folder Created');
  } else {
    header('Content-Type: application/json');
    echo json_encode('Folder Already exists');
  }
}

?>