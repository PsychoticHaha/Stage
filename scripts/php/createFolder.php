<?php
if (isset($_POST['$folderName'])) {
  $folderName = $_POST['folderName'];
  $folder = '/files/public/' . $folderName;
  mkdir($folder, 0777);
  echo json_encode('Folder Created');
}
?>