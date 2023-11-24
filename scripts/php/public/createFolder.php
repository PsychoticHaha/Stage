<?php
require_once('../pdo.php');
// Check if it's a valid fileName or folderName using REGEX
function isValidFolderName($str)
{
  return preg_match('/^[a-zA-Z0-9\-\_\s ]+$/', $str);
}

if (isset($_POST['folderName'])) {

  $folderName = $_POST['folderName'];
  $_SESSION['root'] = $_SERVER['DOCUMENT_ROOT'];
  if (isValidFolderName($folderName)) {
    $folder = $_SERVER['DOCUMENT_ROOT'].'/files/public/' . $folderName;
    $folder_path = '/files/public/' . $folderName;
    try {
      if (!is_dir($folder)) {
        $public = 'public';
        $sql = 'SET time_zone = "+03:00";INSERT INTO folders(folder_name, folder_path, access_type) VALUES (:folder_name, :folder_path, :public)';
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':folder_name', $folderName);
        $stmt->bindParam(':folder_path', $folder_path);
        $stmt->bindParam(':public', $public);
        $stmt->execute();
        mkdir($folder, 0777);

        header('Content-Type: application/json');
        echo json_encode('Folder Created');
      } else {
        header('Content-Type: application/json');
        echo json_encode('Folder Already exists');
      }
    } catch (PDOException $e) {
      echo "Error: ". $e->getMessage();
    }
  } else {
    header('Content-Type: application/json');
    echo json_encode("Invalid filename");
  }
}
?>